import styles from "./NoteForm.module.css"
import { useState, useEffect } from "react"
import Button from "../UI/Button"

const NoteForm = ({ addNote, inputClassName, editText, setFormClosing }) => {
  const [inputText, setInputText] = useState({ inputTitle: "", inputText: "" })

  useEffect(() => {
    if (editText.startEdit) {
      setInputText({
        inputTitle: editText.title,
        inputText: editText.text,
      })
    } else {
      setInputText({
        inputTitle: "",
        inputText: "",
      })
    }
  }, [editText])

  function handleInputChange(text, name) {
    setInputText({
      ...inputText,
      [name]: text.target.value,
    })
  }

  const emptyInputs = () => {
    return (
      inputText.inputTitle.trim() !== "" && inputText.inputText.trim() !== ""
    )
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
      setFormClosing(true)
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
      <Button
        className={`${styles.button} ${
          editText.startEdit ? styles.buttonEditing : ""
        }`}
        type='submit'>
        {editText.startEdit ? "edit note" : "add note"}
      </Button>
    </form>
  )
}

export default NoteForm
