import { useState, useEffect } from "react"
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
  const [editText, setEditText] = useState({
    title: "",
    text: "",
    startEdit: false,
    editId: "",
  })

  const listLength = noteList.length

  const [pinnedCount, setPinnedCount] = useState(0)

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes")
    if (storedNotes) {
      setNoteList(JSON.parse(storedNotes))
    }
  }, [])

  const editTextHandler = (title, text, editId) => {
    setEditText({ text: text, title: title, startEdit: true, editId: editId })
    setFormClosing(false)
  }

  const saveNoteToLocalStorage = (noteData) => {
    localStorage.setItem("notes", JSON.stringify(noteData))
  }

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
      saveNoteToLocalStorage(noteList)
    } else {
      const newNote = {
        title: noteTitle,
        text: noteText,
        id: uuidv4(),
        createDate: new Date().getTime(),
        order: noteList.length,
      }
      const updatedList = [...noteList, newNote]
      setNoteList(updatedList)
      saveNoteToLocalStorage(updatedList)
    }
  }
  const closeSingleNote = () => {
    setSendedText("")
    setSendedTitle("")
    setSendedId("")
  }

  const deleteNoteHandler = (id, createdAt) => {
    const updatedList = noteList.filter((note) => note.id !== id)
    setNoteList(updatedList)
    saveNoteToLocalStorage(updatedList)
    if (sendedId === createdAt) {
      closeSingleNote()
    }
  }

  const setOrder = (id, pinedOrder) => {
    setNoteList((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinedOrder: pinedOrder } : note
      )
    )
  }
  const updatePinOrder = (pinedOrder) => {
    setNoteList((prevNotes) =>
      prevNotes.map((note) => {
        if (note.pinedOrder === pinedOrder) {
          return { ...note, pinedOrder }
        } else {
          const newOrder =
            note.pinedOrder > pinedOrder ? note.pinedOrder - 1 : note.pinedOrder
          return { ...note, pinedOrder: newOrder }
        }
      })
    )
  }

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
        editText={editText}
        formClosing={formClosing}
        setFormClosing={setFormClosing}
        addNote={addNoteHandler}
        closeFormHandler={closeFormHandler}
      />
      <NoteList
        updatePinOrder={updatePinOrder}
        setOrder={setOrder}
        setPinnedCount={setPinnedCount}
        pinnedCount={pinnedCount}
        listLength={listLength}
        deleteNoteHandler={deleteNoteHandler}
        noteText={sendedText}
        sendContent={sendContent}
        noteList={noteList}
        isSelected={isSelected}
        setNoteList={setNoteList}
        saveNoteToLocalStorage={saveNoteToLocalStorage}
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
