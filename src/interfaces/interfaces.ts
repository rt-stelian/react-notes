export interface NoteInterface {
  title: string
  text: string
  id: string
  createDate: string
  pineOrderNumber: number
  order?: number
}

export interface EditText {
  title: string
  text: string
  startEdit: boolean
  editId: string
}
