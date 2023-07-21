import { TbDeviceIpadPlus } from "react-icons/tb"
const AddNote = ({ noteList, setFormClosing, className, sendedText }) => {
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
