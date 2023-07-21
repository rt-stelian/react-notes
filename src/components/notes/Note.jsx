import { RiDeleteBin2Line } from "react-icons/ri"
import Pin from "../UI/Pin"
import styles from "./Note.module.css"


const Note = ({
  isSelected,
  sendContent,
  noteTitle,
  noteText,
  fullNoteText,
  itemId,
  pinedOrder,
  deleteNoteHandler,
  order,
  pinnedCount,
  setPinnedCount,
  listLength,
  setOrder,
  updatePinOrder,
  itemPinedOrder,
  createdAt,
  noteList,
  saveNoteToLocalStorage,
}) => {
  return (
    <div
      data='single-note'
      style={pinedOrder ? { order: pinedOrder + 1 } : { order: order }}
      onClick={(ev) =>
        sendContent(noteTitle, noteText, ev, createdAt, createdAt)
      }
      className={`${"single-note"}  ${styles.singleNote} ${
        pinedOrder ? styles.pinedNote : ""
      } ${isSelected && fullNoteText.length ? styles.active : ""}`}>
      <h2>{noteTitle}</h2>
      <p>{noteText}</p>
      <RiDeleteBin2Line
        id={itemId}
        className={styles.deleteNote}
        title='delete note'
        onClick={() => deleteNoteHandler(itemId, createdAt)}
      />
      <Pin
        saveNoteToLocalStorage={saveNoteToLocalStorage}
        noteList={noteList}
        updatePinOrder={updatePinOrder}
        listLength={listLength}
        pinnedCount={pinnedCount}
        setPinnedCount={setPinnedCount}
        setOrder={setOrder}
        itemId={itemId}
        itemPinedOrder={itemPinedOrder}
      />
    </div>
  )
}

export default Note
