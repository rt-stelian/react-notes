import React, { FC } from "react"
import { TbDeviceIpadPlus } from "react-icons/tb"
import { AddNoteProps } from "../../interfaces/PropsInterfaces"

const AddNote: FC<AddNoteProps> = ({
  noteList,
  setFormClosing,
  className,
  sendedText,
}) => {
  return (
    <div
      onClick={() => setFormClosing(false)}
      className={`${
        noteList.length && sendedText !== ""
          ? className + " add-bottom"
          : className + " add-center"
      }`}>
      <TbDeviceIpadPlus className='add-note-icon' />
      <span>add new note</span>
    </div>
  )
}

export default AddNote
