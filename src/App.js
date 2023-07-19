import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import "./App.css"
import NoteList from "./components/notes/NoteList"
import FormContainer from "./components/modal-form/FormContainer"
import AddNote from "./components/UI/AddNote"
import SingleNoteFull from "./components/notes/SingleNoteFull"

function App() {
  const [noteList, setNoteList] = useState([])
  const [hide, setHide] = useState(false)
  const [timeOut, setTimeOut] = useState(false)
  const [sendedText, setSendedText] = useState("")
  const [sendedTitle, setSendedTitle] = useState("")
  const [sendedId, setSendedId] = useState("")
  const [singleNoteClass, setSingleNoteClass] = useState("")
  const [editText, setEditText] = useState({
    title: "",
    text: "",
    startEdit: false,
    editId: "",
  })

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes")
    if (storedNotes) {
      setNoteList(JSON.parse(storedNotes))
    }
  }, [])

  const editTextHandler = (title, text, editId) => {
    setEditText({ text: text, title: title, startEdit: true, editId: editId })
    openFormHandler()
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
      }
      const updatedList = [...noteList, newNote]
      setNoteList(updatedList)
      saveNoteToLocalStorage(updatedList)
    }
  }

  const deleteNoteHandler = (id, createdAt) => {
    const updatedList = noteList.filter((note) => note.id !== id)
    setNoteList(updatedList)
    saveNoteToLocalStorage(updatedList)
    if (sendedId === createdAt) {
      closeSingleNote()
    }
  }

  const openFormHandler = () => {
    setHide(false)
  }

  const sendContent = (createdDate, noteTitle, noteText, id, ev) => {
    if (ev.target.classList.contains("single-note")) {
      setSendedText(noteText)
      setSendedTitle(noteTitle)
      setSendedId(id)
      setSingleNoteClass(createdDate)
    }
  }

  const closeSingleNote = () => {
    setSendedText("")
    setSendedTitle("")
    setSendedId("")
  }

  useEffect(() => {
    if (!hide) {
      const timer = setTimeout(() => {
        setTimeOut(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [timeOut])

  const clickHandler = () => {
    setTimeOut(true)
    setEditText({ title: "", text: "", startEdit: false, editId: "" })
  }

  useEffect(() => {
    if (timeOut) {
      const timer = setTimeout(() => {
        setHide(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [timeOut])

  return (
    <div className='App'>
      <FormContainer
        setEditText={setEditText}
        editText={editText}
        hide={hide}
        setTimeOut={setTimeOut}
        addNote={addNoteHandler}
        clickHandler={clickHandler}
        timeOut={timeOut}
      />
      <NoteList
        closeSingleNote={closeSingleNote}
        deleteNoteHandler={deleteNoteHandler}
        noteText={sendedText}
        sendContent={sendContent}
        noteList={noteList}
        isSelected={singleNoteClass}
        setNoteList={setNoteList}
      />
      <AddNote
        sendedText={sendedText}
        noteList={noteList}
        onClick={openFormHandler}
        className='add-note'
      />
      <SingleNoteFull
        editTextHandler={editTextHandler}
        editText={editText}
        sendedId={sendedId}
        iconTitle={"close this note"}
        onClick={closeSingleNote}
        noteText={sendedText}
        noteTitle={sendedTitle}
        className='singleNoteFull'
        closeIconClass={"close-icon"}
      />
    </div>
  )
}

export default App
