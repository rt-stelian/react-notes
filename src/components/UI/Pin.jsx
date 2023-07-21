import { useState } from "react"
import { TbPin, TbPinFilled } from "react-icons/tb"
import styles from "../notes/Note.module.css"
const Pin = ({
  itemId,
  setOrder,
  listLength,
  pinnedCount,
  setPinnedCount,
  updatePinOrder,
  itemPinedOrder,
  noteList,
  saveNoteToLocalStorage,
}) => {
  const [isPinned, setIsPined] = useState(false)

  const pinNoteHandler = () => {
    if (!isPinned) {
      setOrder(itemId, listLength + pinnedCount)
      setPinnedCount((prevElem) => prevElem + 1)
    } else {
      setOrder(itemId, null)
      setPinnedCount((prevElem) => prevElem - 1)
      updatePinOrder(itemPinedOrder)
    }
  }
  saveNoteToLocalStorage(noteList)
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



