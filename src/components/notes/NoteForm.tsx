import React, { FC, ChangeEvent, FormEvent } from "react"
import styles from "./NoteForm.module.css"
import { useState, useEffect } from "react"
import Button from "../UI/Button"
import { NoteFormProps, InputTextState } from "../../interfaces/PropsInterfaces" 




const NoteForm: FC<NoteFormProps> = ({
  addNote,
  inputClassName,
  editText,
  setFormClosing,
}) => {
  const [inputText, setInputText] = useState<InputTextState>({
    inputTitle: "",
    inputText: "",
  })

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

  function handleInputChange(
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) {
    setInputText({
      ...inputText,
      [name]: ev.target.value,
    })
  }

  const emptyInputs = (): boolean => {
    return (
      inputText.inputTitle.trim() !== "" && inputText.inputText.trim() !== ""
    )
  }

  const submitFormHandler = (ev: FormEvent<HTMLFormElement>) => {
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
          className={inputClassName}
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
