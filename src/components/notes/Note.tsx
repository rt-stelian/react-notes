import React from "react"
import { useEffect, useState } from "react"
import { RiDeleteBin2Line } from "react-icons/ri"
import Pin from "../UI/Pin"
import styles from "./Note.module.css"

const Note = ({
  isSelected,
  sendContent,
  noteTitle,
  noteText,
  fullNoteText,
  itemId,
  pinedOrder,
  deleteNoteHandler,
  order,
  listLength,
  setOrder,
  createdAt,
  noteList,
  pineOrderNumber,
  pinedCount,
  setPinedCount,
}) => {
  const [isPinned, setIsPined] = useState(false)
  useEffect(() => setIsPined(pineOrderNumber ? true : false), [])

  return (
    <div
      data='single-note'
      style={
        pineOrderNumber ? { order: pineOrderNumber + 1 } : { order: order }
      }
      onClick={(ev) =>
        sendContent(ev, noteTitle, noteText, createdAt, createdAt)
      }
      className={`${"single-note"}  ${styles.singleNote} ${
        pineOrderNumber ? styles.pinedNote : ""
      } ${isSelected && fullNoteText.length ? styles.active : ""}`}>
      <h2>{noteTitle}</h2>
      <p>{noteText}</p>
      <RiDeleteBin2Line
        id={itemId}
        className={styles.deleteNote}
        title='delete note'
        onClick={() => deleteNoteHandler(itemId, createdAt, pinedOrder)}
      />
      <Pin
        pinedCount={pinedCount}
        setPinedCount={setPinedCount}
        pineOrderNumber={pineOrderNumber}
        isPinned={isPinned}
        setIsPined={setIsPined}
        noteList={noteList}
        listLength={listLength}
        setOrder={setOrder}
        itemId={itemId}
      />
    </div>
  )
}

export default Note
