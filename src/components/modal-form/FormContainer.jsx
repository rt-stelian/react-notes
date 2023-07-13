import { TbCirclePlus } from "react-icons/tb"
import styles from "./FormContainer.module.css"
import NoteForm from "../notes/NoteForm"

const FormContainer = ({
  addNote,
  setTimeOut,
  hide,
  clickHandler,
  timeOut,
}) => {
  return (
    <div
      className={`${styles.formContainer}  ${
        timeOut ? styles.hideContainer : ""
      } ${hide ? styles.closeContainer : ""}`}>
      <NoteForm
        inputClassName={styles.inputText}
        addNote={addNote}
        setTimeOut={setTimeOut}
      />
      <TbCirclePlus onClick={clickHandler} className={styles.closeIcon} />
    </div>
  )
}

export default FormContainer
