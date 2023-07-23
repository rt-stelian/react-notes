import Note from "./Note"
import styles from "./NoteList.module.css"

const NoteList = ({
  deleteNoteHandler,
  noteText,
  sendContent,
  noteList,
  isSelected,
  saveNoteToLocalStorage,
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
            saveNoteToLocalStorage={saveNoteToLocalStorage}
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
