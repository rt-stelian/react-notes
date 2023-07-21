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
  updatePinOrder,
  listLength,
  pinnedCount,
  setPinnedCount,
}) => {
  return (
    <div className={styles.noteList}>
      {noteList.map(({ id, text, title, createDate, order, pinedOrder }) => (
        <Note
          saveNoteToLocalStorage={saveNoteToLocalStorage}
          noteList={noteList}
          listLength={listLength}
          updatePinOrder={updatePinOrder}
          setPinnedCount={setPinnedCount}
          pinnedCount={pinnedCount}
          deleteNoteHandler={deleteNoteHandler}
          fullNoteText={noteText}
          isSelected={isSelected === createDate}
          sendContent={sendContent}
          key={id}
          itemId={id}
          itemPinedOrder={pinedOrder}
          noteText={text}
          noteTitle={title}
          order={order}
          createdAt={createDate}
          setOrder={setOrder}
          pinedOrder={pinedOrder ? pinedOrder : null}
        />
      ))}
    </div>
  )
}

export default NoteList
