import Note from "./Note"
import styles from "./NoteList.module.css"

const NoteList = (props) => {
  const setPinDate = (id, date) => {
    props.setNoteList((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinedAt: date } : note
      )
    )
  }

  const compareItems = (a, b) => {
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

  const sortedNoteList = [...props.noteList].sort(compareItems)

  return (
    <div className={styles.noteList}>
      {sortedNoteList.map(({ id, text, title, createDate, pinedAt }) => (
        <Note
          closeSingleNote={props.closeSingleNote}
          deleteNoteHandler={props.deleteNoteHandler}
          fullNoteText={props.noteText}
          isSelected={props.isSelected === createDate}
          sendContent={props.sendContent}
          key={id}
          itemId={id}
          noteText={text}
          noteTitle={title}
          createdAt={createDate}
          noteItem={{ id, text, title, createDate, pinedAt }}
          setPinDate={setPinDate}
          pined={pinedAt ? pinedAt : null}
        />
      ))}
    </div>
  )
}

export default NoteList
