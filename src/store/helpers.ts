import { NoteInterface } from "../interfaces/interfaces"

const updateList = (list: NoteInterface[]): NoteInterface[] =>
  list.map((note: NoteInterface, index: number) => ({
    ...note,
    order: index,
  }))
