import React, { FC } from "react"
import { TbDeviceIpadPlus } from "react-icons/tb"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { setEditText, setFormClosing } from "../../store/noteSlice"

const AddNote: FC = () => {
  const dispatch = useAppDispatch()
  const sendedText = useAppSelector((state) => state.notes.sendedText)
  const noteListLength = useAppSelector((state) => state.notes.noteList.length)
  const openFormHandler = () => {
    dispatch(setFormClosing(false))
    dispatch(setEditText(false))
  }
  return (
    <div
      onClick={() => openFormHandler()}
      className={`${
        noteListLength && sendedText !== ""
          ? "add-note" + " add-bottom"
          : "add-note" + " add-center"
      }`}>
      <TbDeviceIpadPlus className='add-note-icon' />
      <span>add new note</span>
    </div>
  )
}

export default AddNote
