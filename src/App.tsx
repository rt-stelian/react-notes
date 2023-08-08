import React, { JSX, MouseEvent } from "react"
import { useEffect, useRef, useState } from "react"
import "./App.css"
import NoteList from "./components/notes/NoteList"
import FormContainer from "./components/modal-form/FormContainer"
import AddNote from "./components/UI/AddNote"
import SingleNoteFull from "./components/notes/SingleNoteFull"
import { useAppSelector, useAppDispatch } from "./hooks/hooks"
import {
  listFromLocalSt,
  setFormClosing,
  setFullNoteId,
  setPinedCount,
  updateList,
  updatepineOrderNumber,
} from "./store/noteSlice"

function App(): JSX.Element {
  const dispatch = useAppDispatch()
  const noteList = useAppSelector((state) => state.notes.noteList)
  const pinedCount = useAppSelector((state) => state.notes.pinedCount)
  const refListLength = useRef<number>(noteList.length)
  const fullNoteId = useAppSelector((state) => state.notes.fullNoteId)
  useEffect(() => {
    dispatch(setFullNoteId(fullNoteId))
  }, [fullNoteId, noteList])

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes")
    const storedCount = localStorage.getItem("pinedCount")
    if (storedNotes) {
      dispatch(setFormClosing(true))
      dispatch(listFromLocalSt(JSON.parse(storedNotes)))
    }
    if (storedCount) {
      dispatch(setPinedCount(JSON.parse(storedCount)))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteList))
    localStorage.setItem("pinedCount", JSON.stringify(pinedCount))

    if (noteList.length <= 0) {
      localStorage.clear()
    }
  }, [pinedCount, noteList])

  useEffect(() => {
    const prevNoteListLength: number = refListLength.current
    const currentNoteListLength: number = noteList.length
    refListLength.current = currentNoteListLength

    updatepineOrderNumber(noteList, currentNoteListLength, prevNoteListLength)
    updateList(noteList)
  }, [noteList.length])
  return (
    <div className='App'>
      <FormContainer />
      <NoteList />
      <AddNote />
      <SingleNoteFull id={fullNoteId} />
    </div>
  )
}

export default App
