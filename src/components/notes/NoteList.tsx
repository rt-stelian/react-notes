import React, { FC } from "react"
import Note from "./Note"
import styles from "./NoteList.module.css"
import { NoteListProps } from "../../interfaces/PropsInterfaces"

const NoteList: FC<NoteListProps> = ({
  deleteNoteHandler,
  noteText,
  sendContent,
  noteList,
  isSelected,
  setOrder,
  listLength,
  pinedCount,
  setPinedCount,
}) => {
  return (
    <div className={styles.noteList}>
      {noteList.map(
        ({ id, text, title, createDate, order, pineOrderNumber }) => (
          <Note
            pinedCount={pinedCount}
            setPinedCount={setPinedCount}
            listLength={listLength}
            deleteNoteHandler={deleteNoteHandler}
            fullNoteText={noteText}
            isSelected={isSelected === createDate}
            sendContent={sendContent}
            key={id}
            itemId={id}
            noteText={text}
            noteTitle={title}
            order={order}
            createdAt={createDate}
            setOrder={setOrder}
            pineOrderNumber={pineOrderNumber}
          />
        )
      )}
    </div>
  )
}

export default NoteList
