import React from 'react'

function NoteCard(props) {
  return (
    <div className='col-md-6'>
      <div className="card bg-dark text-light">
        <div className="card-body" onClick={() => props.showModal(props.note)}>
          <h5 className="card-title viewNoteTitle text-truncate">{props.note.title}</h5>
          <p className="card-text viewNoteBody">{props.note.body}</p>
        </div>
        <div className="card-footer">
          <i className='bi bi-trash3' onClick={() => props.delete(props.note._id)}></i>
        </div>
      </div>
    </div>
  )
}

export default NoteCard