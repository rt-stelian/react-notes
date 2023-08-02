import React, { FC } from "react"
import { useEffect, useState } from "react"
import { RiDeleteBin2Line } from "react-icons/ri"
import Pin from "../UI/Pin"
import styles from "./Note.module.css"
import { NoteProps } from "../../interfaces/PropsInterfaces"

const Note: FC<NoteProps> = ({
  isSelected,
  sendContent,
  noteTitle,
  noteText,
  fullNoteText,
  itemId,
  deleteNoteHandler,
  order,
  listLength,
  setOrder,
  createdAt,
  pineOrderNumber,
  pinedCount,
  setPinedCount,
}) => {
  const [isPined, setIsPined] = useState(false)
  useEffect(() => setIsPined(pineOrderNumber > 0 ? true : false), [])
  console.log(typeof order)
  return (
    <div
      data-id='single-note'
      style={
        pineOrderNumber > 0 ? { order: pineOrderNumber + 1 } : { order: order }
      }
      onClick={(ev) =>
        sendContent(ev, noteTitle, noteText, createdAt, createdAt)
      }
      className={`${"single-note"}  ${styles.singleNote} ${
        pineOrderNumber > 0 ? styles.pinedNote : ""
      } ${isSelected && fullNoteText.length ? styles.active : ""}`}>
      <h2>{noteTitle}</h2>
      <p>{noteText}</p>
      <RiDeleteBin2Line
        id={itemId}
        className={styles.deleteNote}
        title='delete note'
        onClick={() => deleteNoteHandler(itemId, createdAt)}
      />
      <Pin
        pinedCount={pinedCount}
        setPinedCount={setPinedCount}
        isPined={isPined}
        setIsPined={setIsPined}
        listLength={listLength}
        setOrder={setOrder}
        itemId={itemId}
      />
    </div>
  )
}

export default Note
