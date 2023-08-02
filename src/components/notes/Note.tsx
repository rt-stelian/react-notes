import React, { FC, MouseEvent } from "react"
import { useEffect, useState } from "react"
import { RiDeleteBin2Line } from "react-icons/ri"
import Pin from "../UI/Pin"
import styles from "./Note.module.css"
import { NoteInterface } from "../../interfaces/interfaces"
import { PinedCountUpdater } from "../../types/types"

interface NoteProps {
  isSelected: string | boolean
  sendContent: (
    ev: MouseEvent<HTMLDivElement>,
    noteTitle: string,
    noteText: string,
    createdDate: string,
    id: string
  ) => void
  noteTitle: string
  noteText: string
  fullNoteText: string
  itemId: string
  deleteNoteHandler: (id: string, createdAt: string) => void
  order: NoteInterface["order"]
  listLength: number
  setOrder: (id: string, orderNumber: number) => void
  createdAt: string
  pineOrderNumber: number
  pinedCount: number
  setPinedCount: (pinedCountUpdater: PinedCountUpdater) => void
}

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
