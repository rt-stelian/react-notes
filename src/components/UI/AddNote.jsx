import { TbDeviceIpadPlus } from "react-icons/tb"
const AddNote = ({ onClick }) => {
  return (
    <div className='add-note' onClick={onClick}>
      <TbDeviceIpadPlus className='add-note-icon' />
      <span>new note</span>
    </div>
  )
}

export default AddNote
