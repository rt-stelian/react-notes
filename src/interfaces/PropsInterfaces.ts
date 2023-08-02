import { MouseEvent } from "react"
import { EditText } from "./interfaces"
import { NoteInterface } from "./interfaces"
import { PinedCountUpdater } from "../types/types"

export interface FormContainerProps {
  addNote: (noteTitle: string, noteText: string) => void
  formClosing: boolean
  closeFormHandler: () => void
  editText: EditText
  setFormClosing: (formClosing: boolean) => void
}

export interface NoteProps {
  isSelected: string | boolean
  sendContent: (
    ev: MouseEvent<HTMLDivElement>,
    noteTitle: string,
    noteText: string,
    createdDate: string,
    id: string
  ) => void
  noteTitle: string
  noteText: string
  fullNoteText: string
  itemId: string
  deleteNoteHandler: (id: string, createdAt: string) => void
  order: NoteInterface["order"]
  listLength: number
  setOrder: (id: string, orderNumber: number) => void
  createdAt: string
  pineOrderNumber: number
  pinedCount: number
  setPinedCount: (pinedCountUpdater: PinedCountUpdater) => void
}

export interface NoteFormProps {
  addNote: (noteTitle: string, noteText: string) => void
  inputClassName: string
  editText: EditText
  setFormClosing: (formClosing: boolean) => void
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
  noteList: NoteInterface[]
  isSelected: string | boolean
  setOrder: (id: string, orderNumber: number) => void
  listLength: number
  pinedCount: number
  setPinedCount: (pinedCountUpdater: PinedCountUpdater) => void
}

export interface SingleNoteFullProps {
  editTextHandler: (title: string, text: string, editId: string) => void
  sendedId: string
  closeSingleNote: () => void
  sendedText: string
  sendedTitle: string
}

export interface AddNoteProps {
  noteList: NoteInterface[]
  setFormClosing: (formClosing: boolean) => void
  className: string
  sendedText: string
}

export interface PinProps {
  itemId: string
  setOrder: (id: string, orderNumber: number) => void
  listLength: number
  setIsPined: (isPined: boolean) => void
  isPined: boolean
  pinedCount: number
  setPinedCount: (pinedCountUpdater: PinedCountUpdater) => void
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
