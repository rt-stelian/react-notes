import { TbPin, TbPinFilled } from "react-icons/tb"
import styles from "./Note.module.css"
import { useState } from "react"

const Note = ({ isSelected, onClick, noteTitle, noteText, fullNoteText }) => {
  const [pin, setPin] = useState(false)

  const pinHandler = () => (!pin ? setPin(true) : setPin(false))

  return (
    <div
      onClick={onClick}
      onMouseOver={onClick}
      className={`${styles.singleNote} ${
        isSelected && fullNoteText.length ? styles.active : ""
      }`}>
      <h2>{noteTitle}</h2>
      <p>{noteText}</p>
      <TbPin
        onClick={pinHandler}
        title='pine note'
        className={`${styles.pin} ${pin ? styles.hide : ""}`}
      />
      <TbPinFilled
        onClick={pinHandler}
        title='unpin note'
        className={`${styles.pined} ${!pin ? styles.hide : ""}`}
      />
    </div>
  )
}

export default Note
