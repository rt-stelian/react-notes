import { TbCirclePlus } from "react-icons/tb"
import styles from "./FormContainer.module.css"
import NoteForm from "../notes/NoteForm"

const FormContainer = ({
  addNote,
  setTimeOut,
  hide,
  clickHandler,
  timeOut,
  editText,
  setEditText,
}) => {
  return (
    <div
      className={`${styles.formContainer} ${
        editText.startEdit ? styles.editing : ""
      }  ${timeOut ? styles.hideContainer : ""} ${
        hide ? styles.closeContainer : ""
      }`}>
      <NoteForm
        setEditText={setEditText}
        editText={editText}
        inputClassName={styles.inputText}
        addNote={addNote}
        setTimeOut={setTimeOut}
      />
      <TbCirclePlus onClick={clickHandler} className={styles.closeIcon} />
    </div>
  )
}

export default FormContainer
