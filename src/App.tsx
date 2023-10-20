import React, { JSX } from "react"
import { useEffect } from "react"
import "./App.css"
import NoteList from "./components/notes/NoteList"
import FormContainer from "./components/modal-form/FormContainer"
import AddNote from "./components/UI/AddNote"
import SingleNoteFull from "./components/notes/SingleNoteFull"
import { useAppSelector } from "./hooks/hooks"

function App(): JSX.Element {
  const fullNoteId = useAppSelector((state) => state.notes.fullNoteId)

  return (
    <div className='App'>
      {<FormContainer />}
      {<NoteList />}
      {<AddNote />}
      {<SingleNoteFull id={fullNoteId} />}
    </div>
  )
}

export default App
