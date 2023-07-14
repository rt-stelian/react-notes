import Pin from "../UI/Pin"
import styles from "./Note.module.css"
import { useState } from "react"

const Note = ({
  noteItem,
  isSelected,
  onClick,
  noteTitle,
  noteText,
  fullNoteText,
  itemId,
  setPinDate,
  pined,
}) => {
  return (
    <div
      onClick={onClick}
      onMouseOver={onClick}
      className={`${styles.singleNote} ${pined ? styles.pinedNote : ""} ${
        isSelected && fullNoteText.length ? styles.active : ""
      }`}>
      <h2>{noteTitle}</h2>
      <p>{noteText}</p>
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
