import styles from "./NoteForm.module.css"
import { useState } from "react"
import Button from "../UI/Button"

const NoteForm = ({ addNote, setTimeOut, inputClassName }) => {
  const [inputText, setInputText] = useState({ inputTitle: "", inputText: "" })

  function handleInputChange(text, name) {
    setInputText({
      ...inputText,
      [name]: text.target.value,
    })
  }

  const emptyInputs = () => {
    if (
      inputText.inputTitle.trim() !== "" &&
      inputText.inputText.trim() !== ""
    ) {
      return true
    } else {
      return false
    }
  }
  const submitFormHandler = (ev) => {
    ev.preventDefault()
    setInputText({
      inputTitle: inputText.inputTitle,
      inputText: inputText.inputText,
    })
    if (emptyInputs()) {
      addNote(inputText.inputTitle, inputText.inputText)
      setInputText({ inputTitle: "", inputText: "" })
      setTimeOut(true)
    }
  }

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      <label>
        <input
          type='text'
          value={inputText.inputTitle}
          placeholder='add note title'
          onChange={(e) => handleInputChange(e, "inputTitle")}
        />
      </label>
      <label>
        <textarea
          id='textarea'
          className={inputClassName}
          type='text'
          value={inputText.inputText}
          placeholder='add note text'
          onChange={(e) => handleInputChange(e, "inputText")}
        />
      </label>
      <Button className={styles.button} type='submit'>
        add
      </Button>
    </form>
  )
}

export default NoteForm
