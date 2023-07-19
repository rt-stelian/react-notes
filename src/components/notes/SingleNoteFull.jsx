import { RiEditLine } from "react-icons/ri"
import { TbCirclePlus } from "react-icons/tb"
import styles from "./singleNoteFull.module.css"

const SingleNoteFull = (props) => {
  return (
    <div
      className={`${styles.singleNoteFull}  ${
        !props.noteText.length ? styles.hide : styles.content
      }`}>
      <h2>{props.noteTitle}</h2>
      <p>{props.noteText}</p>
      <RiEditLine
        className={styles.editIcon}
        title='edit note'
        onClick={() =>
          props.editTextHandler(props.noteTitle, props.noteText, props.sendedId)
        }
      />
      <TbCirclePlus
        onClick={props.onClick}
        title={props.iconTitle}
        className={styles.closeIcon}
      />
    </div>
  )
}

export default SingleNoteFull
