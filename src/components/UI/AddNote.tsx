import React, { FC } from "react"
import { TbDeviceIpadPlus } from "react-icons/tb"
import { NoteInterface } from "../../interfaces/interfaces"

interface AddNoteProps {
  noteList: NoteInterface[]
  setFormClosing: (formClosing: boolean) => void
  className: string
  sendedText: string
}
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
