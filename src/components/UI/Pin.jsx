import { useState, useEffect } from "react"
import { TbPin, TbPinFilled } from "react-icons/tb"
import styles from "../notes/Note.module.css"
const Pin = ({
  itemId,
  setOrder,
  listLength,
  saveNoteToLocalStorage,
  setIsPined,
  isPinned,
  noteList,
  pinedCount,
  setPinedCount,
}) => {
  const pinNoteHandler = () => {
    if (!isPinned) {
      setPinedCount((prevElem) => prevElem + 1)
      setOrder(itemId, listLength + pinedCount)
    } else {
      setOrder(itemId, null)
    }
  }
  saveNoteToLocalStorage(noteList)
  localStorage.setItem("pinedCount", JSON.stringify(pinedCount))
  return (
    <div onClick={pinNoteHandler} className={styles.pin}>
      <TbPin
        title='pine note'
        onClick={() => setIsPined(!isPinned)}
        className={`${styles.pinItem} ${isPinned ? styles.hide : ""}`}
      />
      <TbPinFilled
        title='unpin note'
        onClick={() => setIsPined(!isPinned)}
        className={`${styles.pinedItem} ${!isPinned ? styles.hide : ""}`}
      />
    </div>
  )
}

export default Pin
