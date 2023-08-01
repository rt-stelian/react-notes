import React, { FC, MouseEvent } from "react"
import Note from "./Note"
import styles from "./NoteList.module.css"
import { NoteInterface } from "../../interfaces/interfaces"

interface NoteListProps {
  deleteNoteHandler: (id: string, createdAt: string) => void
  noteText: string
  sendContent: (
    ev: MouseEvent<HTMLDivElement>,
    noteTitle: string,
    noteText: string,
    createdDate: string,
    id: string
  ) => void
  noteList: NoteInterface[]
  isSelected: string | boolean
  setOrder: (id: string, orderNumber: number | null) => void
  listLength: number
  pinedCount: number | null
  setPinedCount: (pinedCount: number | null) => void
}

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
            noteList={noteList}
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
