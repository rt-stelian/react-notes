import { TbDeviceIpadPlus } from "react-icons/tb"
const AddNote = ({ noteList, onClick, className, sendedText }) => {
  return (
    <div
      onClick={onClick}
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
