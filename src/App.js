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
  const [singleNoteClass, setSingleNoteClass] = useState("")

  const addNoteHandler = (noteTitle, noteText) => {
    const newNote = {
      title: noteTitle,
      text: noteText,
      id: uuidv4(),
      createDate: new Date().getTime(),
    }
    setNoteList([...noteList, newNote])
  }
  const openFormHandler = () => {
    setHide(false)
  }

  const sendContent = (noteTitle, noteText) => {
    setSendedText(noteText)
    setSendedTitle(noteTitle)
    setSingleNoteClass(noteTitle)
  }

  const closeSingleNote = () => {
    setSendedText("")
    setSendedTitle("")
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
        hide={hide}
        setTimeOut={setTimeOut}
        addNote={addNoteHandler}
        clickHandler={clickHandler}
        timeOut={timeOut}
      />
      <NoteList
        noteText={sendedText}
        sendContent={sendContent}
        noteList={noteList}
        isSelected={singleNoteClass}
        setNoteList={setNoteList}
      />
      <AddNote onClick={openFormHandler} />
      <SingleNoteFull
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
