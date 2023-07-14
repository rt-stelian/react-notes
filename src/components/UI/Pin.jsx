import { useState } from "react"
import { TbPin, TbPinFilled } from "react-icons/tb"
import styles from "../notes/Note.module.css"
const Pin = ({ id, setPinDate, itemId, noteItem }) => {
  const [pin, setPin] = useState(false)

  const pinHandler = () => {
    if (!pin) {
      setPin(true)
    } else {
      setPin(false)
    }
  }

  const pinNoteHandler = () => {
    !pin ? setPinDate(itemId, new Date().getTime()) : setPinDate(itemId, null)
  }

  return (
    <div onClick={pinNoteHandler} className={styles.pin}>
      <TbPin
        title='pine note'
        onClick={pinHandler}
        className={`${styles.pinItem} ${pin ? styles.hide : ""}`}
      />
      <TbPinFilled
        title='unpin note'
        onClick={pinHandler}
        className={`${styles.pinedItem} ${!pin ? styles.hide : ""}`}
      />
    </div>
  )
}

export default Pin
