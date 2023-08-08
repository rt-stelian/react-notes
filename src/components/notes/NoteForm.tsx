import React, { FC, ChangeEvent, FormEvent } from "react"
import { v4 as uuidv4 } from "uuid"
import styles from "./NoteForm.module.css"
import { useState, useEffect } from "react"
import Button from "../UI/Button"
import { NoteFormProps, InputTextState } from "../../interfaces/PropsInterfaces"
import { NoteInterface } from "../../interfaces/interfaces"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { addNoteHandler, setFormClosing } from "../../store/noteSlice"

const NoteForm: FC<NoteFormProps> = ({ inputClassName }) => {
  const editText = useAppSelector((state) => state.notes.editText)
  const dispatch = useAppDispatch()
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
      const newNote: NoteInterface = {
        title: inputText.inputTitle,
        text: inputText.inputText,
        id: uuidv4() as string,
        createDate: new Date().getTime().toString(),
        pineOrderNumber: 0,
      }
      dispatch(addNoteHandler(newNote))
      setInputText({ inputTitle: "", inputText: "" })
      dispatch(setFormClosing(true))
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
