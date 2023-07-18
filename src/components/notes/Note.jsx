import { RiDeleteBin2Line } from "react-icons/ri"
import Pin from "../UI/Pin"
import styles from "./Note.module.css"
import { useState } from "react"

const Note = ({
  noteItem,
  isSelected,
  sendContent,
  noteTitle,
  noteText,
  fullNoteText,
  itemId,
  setPinDate,
  pined,
  deleteNoteHandler,
  createdAt,
}) => {
  const [mouseOver, setMouseOver] = useState(false)

  return (
    <div
      onClick={(ev) =>
        sendContent(createdAt, noteTitle, noteText, createdAt, ev)
      }
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className={`${"single-note"}  ${styles.singleNote} ${
        mouseOver ? styles.mouseOver : ""
      } ${pined ? styles.pinedNote : ""} ${
        isSelected && fullNoteText.length ? styles.active : ""
      }`}>
      <h2>{noteTitle}</h2>
      <p>{noteText}</p>
      <RiDeleteBin2Line
        id={itemId}
        className={styles.deleteNote}
        title='delete note'
        onClick={() => deleteNoteHandler(itemId, createdAt)}
      />
      <Pin
        setPinDate={setPinDate}
        noteItem={noteItem}
        itemId={itemId}
        id={itemId}
      />
    </div>
  )
}

export default Note
