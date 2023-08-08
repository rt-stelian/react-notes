import React, { FC, useEffect } from "react"
import { TbCirclePlus } from "react-icons/tb"
import styles from "./FormContainer.module.css"
import NoteForm from "../notes/NoteForm"
import { useAppSelector, useAppDispatch } from "../../hooks/hooks"
import { closeFormHandler, setFormClosing } from "../../store/noteSlice"

const FormContainer: FC = () => {
  const dispatch = useAppDispatch()
  const editText = useAppSelector((state) => state.notes.editText)
  const formClosing = useAppSelector((state) => state.notes.formClosing)
  const noteListLength = useAppSelector((state) => state.notes.noteList.length)

  useEffect(() => {
    ;(() => {
      if (noteListLength === 0) {
        dispatch(setFormClosing(false))
      }
    })()
  }, [noteListLength])

  return (
    <div
      className={`${styles.formContainer} ${
        editText.startEdit ? styles.editing : ""
      }  ${formClosing ? styles.hideContainer : ""} `}>
      <NoteForm inputClassName={styles.inputText} />
      <TbCirclePlus
        onClick={() => dispatch(closeFormHandler())}
        className={styles.closeIcon}
      />
    </div>
  )
}

export default FormContainer
