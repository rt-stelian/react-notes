import React, { FC } from "react"
import { useEffect, useState } from "react"
import { RiDeleteBin2Line } from "react-icons/ri"
import { MouseEvent } from "react"
import Pin from "../UI/Pin"
import styles from "./Note.module.css"
import { NoteProps } from "../../interfaces/PropsInterfaces"
import { useAppSelector, useAppDispatch } from "../../hooks/hooks"
import {
  closeSingleNote,
  deleteNoteHandler,
  sendContent,
  setIsSelected,
  setFullNoteId,
} from "../../store/noteSlice"

const Note: FC<NoteProps> = ({
  noteTitle,
  noteText,
  itemId,
  order,
  createDate,
  pineOrderNumber,
  isSelected,
}) => {
  const dispatch = useAppDispatch()
  const fullNoteId = useAppSelector((state) => state.notes.fullNoteId)
  const [isPined, setIsPined] = useState(false)
  useEffect(() => setIsPined(pineOrderNumber > 0 ? true : false), [])

  return (
    <div
      data-id='single-note'
      style={
        pineOrderNumber > 0 ? { order: pineOrderNumber + 1 } : { order: order }
      }
      onClick={(e) => {
        e.stopPropagation()
        dispatch(
          sendContent({
            noteTitle,
            noteText,
            createDate,
            itemId,
          })
        )
      }}
      className={`${"single-note"}  ${styles.singleNote} ${
        pineOrderNumber > 0 ? styles.pinedNote : ""
      } ${isSelected === itemId && fullNoteId.length ? styles.active : ""}`}>
      <h2>{noteTitle}</h2>
      <p>{noteText}</p>
      <RiDeleteBin2Line
        id={itemId}
        className={styles.deleteNote}
        title='delete note'
        onClick={(e) => {
          e.stopPropagation()
          dispatch(
            deleteNoteHandler({
              itemId,
            })
          )
        }}
      />
      <Pin isPined={isPined} setIsPined={setIsPined} itemId={itemId} />
    </div>
  )
}

export default Note
