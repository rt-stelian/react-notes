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
    // console.log(editText)
  }, [editText])

  const editTextHandler = (title, text, editId) => {
    setEditText({ text: text, title: title, startEdit: true, editId: editId })
    openFormHandler()
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
    } else {
      const newNote = {
        title: noteTitle,
        text: noteText,
        id: uuidv4(),
        createDate: new Date().getTime(),
      }
      setNoteList([...noteList, newNote])
    }
  }

  const deleteNoteHandler = (id, createdAt) => {
    setNoteList(noteList.filter((note) => note.id !== id))
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
    console.log(editText)
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
      <AddNote onClick={openFormHandler} />
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
