import { RiEditLine } from "react-icons/ri"
import { TbCirclePlus } from "react-icons/tb"
import styles from "./singleNoteFull.module.css"

const SingleNoteFull = ({ iconTitle, onClick, noteTitle, noteText }) => {
  return (
    <div
      className={`${styles.singleNoteFull}  ${
        !noteText.length ? styles.hide : styles.content
      }`}>
      <h2>{noteTitle}</h2>
      <p>{noteText}</p>
      <RiEditLine className={styles.editIcon} title='edit note' />
      <TbCirclePlus
        onClick={onClick}
        title={iconTitle}
        className={styles.closeIcon}
      />
    </div>
  )
}

export default SingleNoteFull
