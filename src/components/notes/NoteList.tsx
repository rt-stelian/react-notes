import React, { FC } from "react"
import Note from "./Note"
import styles from "./NoteList.module.css"
import { useAppSelector } from "../../hooks/hooks"
const NoteList: FC = () => {
  const noteList = useAppSelector((state) => state.notes.noteList)
  const isSelected = useAppSelector((state) => state.notes.isSelected)
  return (
    <div className={styles.noteList}>
      {noteList.map(
        ({ id, text, title, createDate, pineOrderNumber }, index) => (
          <Note
            isSelected={isSelected}
            key={id}
            itemId={id}
            noteText={text}
            noteTitle={title}
            createDate={createDate}
            pineOrderNumber={pineOrderNumber}
            order={index}
          />
        )
      )}
    </div>
  )
}

export default NoteList
