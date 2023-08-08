import { FC } from "react"
import React, { RiEditLine } from "react-icons/ri"
import { TbCirclePlus } from "react-icons/tb"
import styles from "./SingleNoteFull.module.css"
import { SingleNoteFullProps } from "../../interfaces/PropsInterfaces"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { closeSingleNote, editTextHandler } from "../../store/noteSlice"

const SingleNoteFull: FC<SingleNoteFullProps> = () => {
  const text = useAppSelector((state) => state.notes.sendedText)
  const title = useAppSelector((state) => state.notes.sendedTitle)
  const fullNoteId = useAppSelector((state) => state.notes.fullNoteId)
  const dispatch = useAppDispatch()

  return (
    <div
      className={`${styles.singleNoteFull}  ${
        !text.length ? styles.hide : styles.content
      }`}>
      <h2>{title}</h2>
      <p>{text}</p>
      <RiEditLine
        className={styles.editIcon}
        title='edit note'
        onClick={() => dispatch(editTextHandler({ title, text, fullNoteId }))}
      />
      <TbCirclePlus
        onClick={() => dispatch(closeSingleNote())}
        title='close this note'
        className={styles.closeIcon}
      />
    </div>
  )
}

export default SingleNoteFull
