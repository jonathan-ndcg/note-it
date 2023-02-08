import React from "react"
import NoteCard from "./NoteCard"

function NoteList(props) {

  return (
    <div className="row g-2">
      {
        props.notes.map((note) =>
          <NoteCard key={note._id} note={note} delete={props.delete} showModal={props.showModal}/>
        )
      }
    </div>
  )
}

export default NoteList