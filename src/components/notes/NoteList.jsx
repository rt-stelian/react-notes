import Note from "./Note"
import styles from "./NoteList.module.css"
const NoteList = ({
  sendContent,
  noteList,
  singleNoteClass,
  isSelected,
  noteText,
}) => {
  return (
    <div className={styles.noteList}>
      {noteList.map((noteItem, index) => (
        <Note
          fullNoteText={noteText}
          isSelected={isSelected === noteItem.title}
          singleNoteClass={singleNoteClass}
          onClick={() => sendContent(noteItem.title, noteItem.text)}
          key={index}
          noteText={noteItem.text}
          noteTitle={noteItem.title}
        />
      ))}
    </div>
  )
}

export default NoteList
