import React, { JSX, MouseEvent } from "react"
import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import "./App.css"
import NoteList from "./components/notes/NoteList"
import FormContainer from "./components/modal-form/FormContainer"
import AddNote from "./components/UI/AddNote"
import SingleNoteFull from "./components/notes/SingleNoteFull"
import { EditText, NoteInterface } from "./interfaces/interfaces"

function App(): JSX.Element {
  const [noteList, setNoteList] = useState<NoteInterface[]>([])
  const [formClosing, setFormClosing] = useState<boolean>(false)
  const [sendedText, setSendedText] = useState<string>("")
  const [sendedTitle, setSendedTitle] = useState<string>("")
  const [sendedId, setSendedId] = useState<string>("")
  const [isSelected, setIsSelected] = useState<boolean | string>(false)
  const [pinedCount, setPinedCount] = useState<number | null>(null)
  const [editText, setEditText] = useState<EditText>({
    title: "",
    text: "",
    startEdit: false,
    editId: "",
  })

  const listLength: number = noteList.length
  const refListLength = useRef<number>(noteList.length)

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes")
    const storedCount = localStorage.getItem("pinedCount")
    if (storedNotes) {
      setFormClosing(true)
      setNoteList(JSON.parse(storedNotes))
    }
    if (storedCount) {
      setPinedCount(JSON.parse(storedCount))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteList))
    localStorage.setItem("pinedCount", JSON.stringify(pinedCount))

    if (noteList.length <= 0) {
      localStorage.clear()
    }
  }, [pinedCount, noteList])

  const editTextHandler = (
    title: string,
    text: string,
    editId: string
  ): void => {
    setEditText({ text: text, title: title, startEdit: true, editId: editId })
    setFormClosing(false)
  }

  const updateList = (list: NoteInterface[]): NoteInterface[] =>
    list.map((note: NoteInterface, index: number) => ({
      ...note,
      order: index,
    }))

  const addNoteHandler = (noteTitle: string, noteText: string): void => {
    const existingNote = noteList.find(
      (note) => note.createDate == editText.editId
    )
    if (existingNote) {
      existingNote.title = noteTitle
      existingNote.text = noteText
      setSendedTitle(noteTitle)
      setSendedText(noteText)
      setEditText({ ...editText, startEdit: false })
    } else {
      const newNote: NoteInterface = {
        title: noteTitle,
        text: noteText,
        id: uuidv4() as string,
        createDate: new Date().getTime().toString(),
        pineOrderNumber: null,
      }
      const updatedList = [...noteList, newNote]

      setNoteList(() => updateList(updatedList))
    }
  }

  const closeSingleNote = (): void => {
    setSendedText("")
    setSendedTitle("")
    setSendedId("")
  }

  const deleteNoteHandler = (id: string, createdAt: string): void => {
    const updatedList = noteList.filter((note) => note.id !== id)
    setNoteList(() => updateList(updatedList))
    if (sendedId === createdAt) {
      closeSingleNote()
    }
  }

  const setOrder = (id: string, orderNumber: number | null): void => {
    setNoteList((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, pineOrderNumber: orderNumber }
        }
        return note
      })
    )
  }

  useEffect(() => {
    const prevNoteListLength: number = refListLength.current
    const currentNoteListLength: number = noteList.length
    refListLength.current = currentNoteListLength

    const updatepineOrderNumber = (): void => {
      setNoteList((prevNotes: NoteInterface[]) =>
        prevNotes.map((note: NoteInterface) => {
          if (note.pineOrderNumber) {
            if (currentNoteListLength > prevNoteListLength) {
              return { ...note, pineOrderNumber: note.pineOrderNumber + 1 }
            } else if (currentNoteListLength < prevNoteListLength) {
              return { ...note, pineOrderNumber: note.pineOrderNumber - 1 }
            }
          }
          return note
        })
      )
    }
    updatepineOrderNumber()
  }, [noteList.length])

  const sendContent = (
    ev: MouseEvent<HTMLDivElement>,
    noteTitle: string,
    noteText: string,
    createdDate: string,
    id: string
  ): void => {
    const targetElement = ev.target as HTMLDivElement
    if (
      targetElement.hasAttribute("data") &&
      targetElement.getAttribute("data") === "single-note"
    ) {
      setSendedText(noteText)
      setSendedTitle(noteTitle)
      setSendedId(id)
      setIsSelected(createdDate)
    }
  }

  const closeFormHandler = (): void => {
    setEditText({ title: "", text: "", startEdit: false, editId: "" })
    setFormClosing(true)
  }

  return (
    <div className='App'>
      <FormContainer
        editText={editText}
        formClosing={formClosing}
        setFormClosing={setFormClosing}
        addNote={addNoteHandler}
        closeFormHandler={closeFormHandler}
      />
      <NoteList
        pinedCount={pinedCount}
        setPinedCount={setPinedCount}
        setOrder={setOrder}
        listLength={listLength}
        deleteNoteHandler={deleteNoteHandler}
        noteText={sendedText}
        sendContent={sendContent}
        noteList={noteList}
        isSelected={isSelected}
      />
      <AddNote
        sendedText={sendedText}
        noteList={noteList}
        setFormClosing={setFormClosing}
        className='add-note'
      />
      <SingleNoteFull
        editTextHandler={editTextHandler}
        sendedId={sendedId}
        closeSingleNote={closeSingleNote}
        sendedText={sendedText}
        sendedTitle={sendedTitle}
      />
    </div>
  )
}

export default App
