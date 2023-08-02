import React, { FC } from "react"
import { TbPin, TbPinFilled } from "react-icons/tb"
import styles from "../notes/Note.module.css"
import { PinedCountUpdater } from "../../types/types"

interface PinProps {
  itemId: string
  setOrder: (id: string, orderNumber: number) => void
  listLength: number
  setIsPined: (isPined: boolean) => void
  isPined: boolean
  pinedCount: number
  setPinedCount: (pinedCountUpdater: PinedCountUpdater) => void
}

const Pin: FC<PinProps> = ({
  itemId,
  setOrder,
  listLength,
  setIsPined,
  isPined,
  pinedCount,
  setPinedCount,
}) => {
  const pinNoteHandler = () => {
    if (!isPined) {
      setPinedCount((prevElem): number => prevElem + 1)
      setOrder(itemId, listLength + pinedCount)
    } else {
      setOrder(itemId, 0)
    }
  }
  return (
    <div onClick={pinNoteHandler} className={styles.pin}>
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
