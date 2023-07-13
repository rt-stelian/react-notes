import { TbCirclePlus } from "react-icons/tb"

const SingleNoteFull = ({
  iconTitle,
  onClick,
  closeIconClass,
  noteTitle,
  noteText,
  className,
}) => {
  return (
    <div className={`${className}  ${!noteText.length ? "hide" : "content"}`}>
      <h2>{noteTitle}</h2>
      <p>{noteText}</p>
      <TbCirclePlus
        onClick={onClick}
        title={iconTitle}
        className={closeIconClass}
      />
    </div>
  )
}

export default SingleNoteFull
