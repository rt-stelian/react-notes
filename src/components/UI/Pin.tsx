import React, { FC, MouseEvent } from "react"
import { TbPin, TbPinFilled } from "react-icons/tb"
import styles from "../notes/Note.module.css"
import { PinProps } from "../../interfaces/PropsInterfaces"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import {
  setPinedCount,
  setOrder,
  updateList,
  saveToLocalStorageThunk,
} from "../../store/noteSlice"

const Pin: FC<PinProps> = ({ itemId, setIsPined, isPined }) => {
  const dispatch = useAppDispatch()
  const pinedCount = useAppSelector((state) => state.notes.pinedCount)
  const listLength = useAppSelector((state) => state.notes.noteList.length)

  const pinNoteHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!isPined) {
      dispatch(setPinedCount(pinedCount + 1))
      let order = listLength + pinedCount
      dispatch(setOrder({ itemId, order }))
      dispatch(saveToLocalStorageThunk())
      updateList()
    } else {
      let order = 0
      dispatch(setOrder({ itemId, order }))

      dispatch(saveToLocalStorageThunk())
      updateList()
    }
  }
  return (
    <div onClick={(e) => pinNoteHandler(e)} className={styles.pin}>
      <TbPin
        title='pine note'
        onClick={() => setIsPined(!isPined)}
        className={`${styles.pinItem} ${isPined ? styles.hide : ""}`}
      />
      <TbPinFilled
        title='unpin note'
        onClick={() => setIsPined(!isPined)}
        className={`${styles.pinedItem} ${!isPined ? styles.hide : ""}`}
      />
    </div>
  )
}

export default Pin
