import React, { FC, useCallback, useEffect, useRef } from "react"
import Note from "./Note"
import styles from "./NoteList.module.css"
import { useAppSelector, useAppDispatch } from "../../hooks/hooks"
import {
  listFromLocalSt,
  saveToLocalStorageThunk,
  setFormClosing,
  setPinedCount,
  updateList,
  updatepineOrderNumber,
} from "../../store/noteSlice"
const NoteList: FC = () => {
  const noteList = useAppSelector((state) => state.notes.noteList)
  const isSelected = useAppSelector((state) => state.notes.isSelected)
  const pinedCount = useAppSelector((state) => state.notes.pinedCount)
  const refListLength = useRef<number>(noteList.length)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes")
    const storedCount = localStorage.getItem("pinedCount")
    if (storedNotes) {
      dispatch(listFromLocalSt(JSON.parse(storedNotes)))
      dispatch(setFormClosing(true))
    }
    if (storedCount) {
      dispatch(setPinedCount(JSON.parse(storedCount)))
    }
  }, [])

  useEffect(() => {
    updateList()
    dispatch(saveToLocalStorageThunk())
  }, [noteList.length, pinedCount])

  useEffect(() => {
    if (noteList && noteList.length > 0) {
      const prevNoteListLength: number = refListLength.current
      const currentNoteListLength: number = noteList.length
      refListLength.current = currentNoteListLength
      dispatch(
        updatepineOrderNumber({
          noteList,
          currentNoteListLength,
          prevNoteListLength,
        })
      )
    }
  }, [noteList.length])

  return (
    <div className={styles.noteList}>
      {noteList.map(
        ({ id, text, title, createDate, pineOrderNumber }, index) => (
          <Note
            isSelected={isSelected}
            key={id}
            itemId={id}
            noteText={text}
            noteTitle={title}
            createDate={createDate}
            pineOrderNumber={pineOrderNumber}
            order={index}
          />
        )
      )}
    </div>
  )
}

export default NoteList
