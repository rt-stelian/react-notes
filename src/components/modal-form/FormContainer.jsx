import { TbCirclePlus } from "react-icons/tb"
import styles from "./FormContainer.module.css"
import NoteForm from "../notes/NoteForm"

const FormContainer = ({
  addNote,
  formClosing,
  closeFormHandler,
  editText,
  setFormClosing,
}) => {
  return (
    <div
      className={`${styles.formContainer} ${
        editText.startEdit ? styles.editing : ""
      }  ${formClosing ? styles.hideContainer : ""}`}>
      <NoteForm
        editText={editText}
        inputClassName={styles.inputText}
        addNote={addNote}
        setFormClosing={setFormClosing}
      />
      <TbCirclePlus onClick={closeFormHandler} className={styles.closeIcon} />
    </div>
  )
}

export default FormContainer
