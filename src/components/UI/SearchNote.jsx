import { useState } from "react"

const SearchNote = (props) => {
  return (
    <div className={props.className}>
      <input
        type='text'
        placeholder='search a note'
        value={props.searchText}
        onChange={(e) => props.setSearchText(e.target.value)}
      />
    </div>
  )
}

export default SearchNote
