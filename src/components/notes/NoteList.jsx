import { useState } from "react"
import Note from "./Note"
import styles from "./NoteList.module.css"
const NoteList = ({
  sendContent,
  noteList,
  isSelected,
  setNoteList,
  noteText,
}) => {
  const setPinDate = (id, date) => {
    setNoteList((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinedAt: date } : note
      )
    )
  }

  function compareItems(a, b) {
    if (a.pinedAt && b.pinedAt) {
      return b.pinedAt - a.pinedAt
    }
    if (a.pinedAt) {
      return -1
    }
    if (b.pinedAt) {
      return 1
    }
    return b.createDate - a.createDate
  }
  const sortedNoteList = [...noteList].sort(compareItems)
  return (
    <div className={styles.noteList}>
      {sortedNoteList.map((noteItem, index) => (
        <Note
          fullNoteText={noteText}
          isSelected={isSelected === noteItem.title}
          onClick={() => sendContent(noteItem.title, noteItem.text)}
          key={noteItem.id}
          itemId={noteItem.id}
          noteText={noteItem.text}
          noteTitle={noteItem.title}
          createdAt={noteItem.createDate}
          noteItem={noteItem}
          setPinDate={setPinDate}
          pined={noteItem.pinedAt ? noteItem.pinedAt : null}
        />
      ))}
    </div>
  )
}

export default NoteList
