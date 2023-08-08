import { MouseEvent } from "react"
import { EditText } from "./interfaces"
import { NoteInterface } from "./interfaces"
import { PinedCountUpdater } from "../types/types"

export interface FormContainerProps {
  formClosing: boolean
  closeFormHandler: () => void
  editText: EditText
  setFormClosing: (formClosing: boolean) => void
}

export interface NoteProps {
  isSelected: string | boolean
  createDate: string
  noteTitle: string
  noteText: string
  itemId: string
  order: NoteInterface["order"]
  pineOrderNumber: number
}

export interface NoteFormProps {
  inputClassName: string
}

export interface InputTextState {
  inputTitle: string
  inputText: string
}

export interface NoteListProps {
  deleteNoteHandler: (id: string, createdAt: string) => void
  noteText: string
  sendContent: (
    ev: MouseEvent<HTMLDivElement>,
    noteTitle: string,
    noteText: string,
    createdDate: string,
    id: string
  ) => void
  isSelected: string | boolean
  setOrder: (id: string, orderNumber: number) => void
  listLength: number
  pinedCount: number
  setPinedCount: (pinedCountUpdater: PinedCountUpdater) => void
}

export interface SingleNoteFullProps {
  id: string
}

export interface PinProps {
  itemId: string
  setIsPined: (isPined: boolean) => void
  isPined: boolean
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
