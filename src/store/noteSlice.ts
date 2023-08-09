import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EditText, NoteInterface } from "../interfaces/interfaces"

type NoteState = {
  noteList: NoteInterface[]
  formClosing: boolean
  sendedText: string
  sendedTitle: string
  fullNoteId: string
  isSelected: boolean | string
  pinedCount: number
  editText: EditText
}

const initialState: NoteState = {
  noteList: [],
  formClosing: false,
  sendedText: "",
  sendedTitle: "",
  fullNoteId: "",
  isSelected: false,
  pinedCount: 0,
  editText: {
    title: "",
    text: "",
    startEdit: false,
    editId: "",
  },
}

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNoteHandler(state, action: PayloadAction<NoteInterface>) {
      const existingNote = state.noteList.find(
        (note) => note.id === state.fullNoteId
      )

      if (existingNote && state.editText.startEdit === true) {
        existingNote.title = action.payload.title
        existingNote.text = action.payload.text
        state.sendedTitle = action.payload.title
        state.sendedText = action.payload.text
      } else {
        state.noteList.push(action.payload)
      }
    },
    setNoteList(state, action: PayloadAction<NoteInterface[]>) {
      state.noteList = action.payload
    },
    listFromLocalSt(state, action: PayloadAction<NoteInterface[]>) {
      state.noteList = action.payload.map((note) => ({
        ...note,
      }))
    },
    setFormClosing(state, action: PayloadAction<boolean>) {
      state.formClosing = action.payload
    },
    setSendedText(state, action: PayloadAction<string>) {
      state.sendedText = action.payload
    },
    setSendedTitle(state, action: PayloadAction<string>) {
      state.sendedTitle = action.payload
    },
    setFullNoteId(state, action: PayloadAction<string>) {
      state.fullNoteId = action.payload
    },
    setIsSelected(state, action: PayloadAction<boolean | string>) {
      state.isSelected = action.payload
    },
    setPinedCount(state, action: PayloadAction<number>) {
      state.pinedCount = action.payload
    },
    setEditText(state, action: PayloadAction<boolean>) {
      state.editText.startEdit = action.payload
    },
    updateList(state) {
      state.noteList.map((note: NoteInterface, index: number) => ({
        ...note,
        order: index,
      }))
    },

    closeSingleNote(state) {
      state.sendedText = ""
      state.sendedTitle = ""
      state.fullNoteId = ""
    },
    setOrder(state, action: PayloadAction<{ itemId: string; order: number }>) {
      const { itemId, order } = action.payload

      state.noteList = state.noteList.map((note) => {
        if (note.id === itemId) {
          return { ...note, pineOrderNumber: order }
        }
        return note
      })
    },
    sendContent(
      state,
      action: PayloadAction<{
        noteTitle: string
        noteText: string
        createDate: string
        itemId: string
      }>
    ) {
      const { noteTitle, noteText, itemId } = action.payload
      state.sendedText = noteText
      state.sendedTitle = noteTitle
      state.fullNoteId = itemId
      state.isSelected = itemId
    },
    deleteNoteHandler(
      state,
      action: PayloadAction<{
        itemId: string
      }>
    ) {
      const { itemId } = action.payload
      if (state.fullNoteId === itemId) {
        state.sendedText = ""
        state.sendedTitle = ""
        state.fullNoteId = ""
      }
      // console.log(`fullNoteId=>>${state.fullNoteId},  itemId=>>${itemId}`)
      state.noteList = state.noteList.filter((note) => note.id !== itemId)
    },
    closeFormHandler(state) {
      state.editText = { title: "", text: "", startEdit: false, editId: "" }
      state.formClosing = true
    },
    updatepineOrderNumber(
      state,
      action: PayloadAction<{
        noteList: NoteInterface[]
        currentNoteListLength: number
        prevNoteListLength: number
      }>
    ) {
      const { currentNoteListLength, prevNoteListLength, noteList } =
        action.payload
      state.noteList = noteList.map((note) => {
        if (note.pineOrderNumber && note.pineOrderNumber !== 0) {
          console.log(note.pineOrderNumber)
          if (currentNoteListLength > prevNoteListLength) {
            return { ...note, pineOrderNumber: note.pineOrderNumber + 1 }
          } else if (currentNoteListLength < prevNoteListLength) {
            return { ...note, pineOrderNumber: note.pineOrderNumber - 1 }
          }
        }
        return note
      })
    },
    editTextHandler(
      state,
      action: PayloadAction<{ title: string; text: string; fullNoteId: string }>
    ) {
      const { title, text, fullNoteId } = action.payload
      state.editText = {
        text: text,
        title: title,
        startEdit: true,
        editId: fullNoteId,
      }
      state.formClosing = false
    },
  },
})

export const {
  addNoteHandler,
  listFromLocalSt,
  setFormClosing,
  setSendedText,
  setEditText,
  setIsSelected,
  setPinedCount,
  setSendedTitle,
  deleteNoteHandler,
  editTextHandler,
  updatepineOrderNumber,
  closeFormHandler,
  sendContent,
  setOrder,
  closeSingleNote,
  updateList,
  setNoteList,
  setFullNoteId,
} = noteSlice.actions
export default noteSlice.reducer
