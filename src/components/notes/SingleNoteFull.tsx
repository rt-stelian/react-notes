import { FC } from "react"
import React, { RiEditLine } from "react-icons/ri"
import { TbCirclePlus } from "react-icons/tb"
import styles from "./SingleNoteFull.module.css"
import { SingleNoteFullProps } from "../../interfaces/PropsInterfaces"


const SingleNoteFull: FC<SingleNoteFullProps> = ({
  editTextHandler,
  sendedId,
  closeSingleNote,
  sendedText,
  sendedTitle,
}) => {
  return (
    <div
      className={`${styles.singleNoteFull}  ${
        !sendedText.length ? styles.hide : styles.content
      }`}>
      <h2>{sendedTitle}</h2>
      <p>{sendedText}</p>
      <RiEditLine
        className={styles.editIcon}
        title='edit note'
        onClick={() => editTextHandler(sendedTitle, sendedText, sendedId)}
      />
      <TbCirclePlus
        onClick={closeSingleNote}
        title='close this note'
        className={styles.closeIcon}
      />
    </div>
  )
}

export default SingleNoteFull
