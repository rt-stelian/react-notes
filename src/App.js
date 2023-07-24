import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import "./App.css"
import NoteList from "./components/notes/NoteList"
import FormContainer from "./components/modal-form/FormContainer"
import AddNote from "./components/UI/AddNote"
import SingleNoteFull from "./components/notes/SingleNoteFull"

function App() {
  const [noteList, setNoteList] = useState([])
  const [formClosing, setFormClosing] = useState(false)
  const [sendedText, setSendedText] = useState("")
  const [sendedTitle, setSendedTitle] = useState("")
  const [sendedId, setSendedId] = useState("")
  const [isSelected, setIsSelected] = useState("")
  const [pinedCount, setPinedCount] = useState(null)
  const [editText, setEditText] = useState({
    title: "",
    text: "",
    startEdit: false,
    editId: "",
  })

  const listLength = noteList.length
  const refListLength = useRef(noteList.length)

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

  const editTextHandler = (title, text, editId) => {
    setEditText({ text: text, title: title, startEdit: true, editId: editId })
    setFormClosing(false)
  }

  const updateList = (list) =>
    list.map((note, index) => ({
      ...note,
      order: index,
    }))

  const addNoteHandler = (noteTitle, noteText) => {
    const existingNote = noteList.find(
      (note) => note.createDate === editText.editId
    )
    if (existingNote) {
      existingNote.title = noteTitle
      existingNote.text = noteText
      setSendedTitle(noteTitle)
      setSendedText(noteText)
      setEditText({ startEdit: false })
    } else {
      const newNote = {
        title: noteTitle,
        text: noteText,
        id: uuidv4(),
        createDate: new Date().getTime(),
        pineOrderNumber: "",
      }
      const updatedList = [...noteList, newNote]

      setNoteList(() => updateList(updatedList))
    }
  }

  const closeSingleNote = () => {
    setSendedText("")
    setSendedTitle("")
    setSendedId("")
  }

  const deleteNoteHandler = (id, createdAt) => {
    const updatedList = noteList.filter((note) => note.id !== id)
    setNoteList(() => updateList(updatedList))
    if (sendedId === createdAt) {
      closeSingleNote()
    }
  }

  const setOrder = (id, orderNumber) => {
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
    const prevNoteListLength = refListLength.current
    const currentNoteListLength = noteList.length
    refListLength.current = currentNoteListLength

    const updatepineOrderNumber = () => {
      setNoteList((prevNotes) =>
        prevNotes.map((note) => {
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

  const sendContent = (noteTitle, noteText, ev, createdDate, id) => {
    if (
      ev.target.hasAttribute("data") &&
      ev.target.getAttribute("data") === "single-note"
    ) {
      setSendedText(noteText)
      setSendedTitle(noteTitle)
      setSendedId(id)
      setIsSelected(createdDate)
    }
  }

  const closeFormHandler = () => {
    setEditText({ title: "", text: "", startEdit: false, editId: "" })
    setFormClosing(true)
  }

  return (
    <div className='App'>
      <FormContainer
        listLength={listLength}
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
