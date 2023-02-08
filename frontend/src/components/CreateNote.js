import React, { useState } from 'react'
import axios from 'axios'
import './Note.css';

function CreateNote(props) {

    const token = localStorage.getItem("token")
    const headers = { 'auth_key': token }

    const minRows = 2
    const maxRows = 10
    const [noteTitle, setNoteTitle] = useState("")
    const [noteBody, setNoteBody] = useState("")
    const [rows, setRows] = useState(minRows)

    const noteTitleChangeHandler = (e) => {
        setNoteTitle(e.target.value)
    }

    const noteBodyChangeHandler = (e) => {
        setNoteBody(e.target.value)

        // Autogrow
        const textareaLineHeight = 24;

        const previousRows = e.target.rows
        e.target.rows = minRows

        const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight)

        if (currentRows === previousRows) {
            e.target.rows = currentRows
        }

        if (currentRows >= maxRows) {
            e.target.rows = maxRows;
            e.target.scrollTop = e.target.scrollHeight;
        }

        setRows(Math.min(currentRows, maxRows))
    }

    const addNote = () => {
        const newNote = {
            title: noteTitle,
            body: noteBody
        }

        axios.post("http://localhost:4000/notes", newNote, { headers })
            .then(res =>
                props.setNotes(prev => [...prev, res.data])
            )

        setNoteTitle("")
        setNoteBody("")
        setRows(minRows)
    }

    return (
        <div>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className="card mb-3 bg-dark text-light">
                        <div className="card-header text-center">
                            Take a note
                        </div>
                        <div className="card-body">
                            <input type="text" className="form-control border-0 bg-dark text-light mb-1" id="noteTitle" placeholder="Title" value={noteTitle} onChange={noteTitleChangeHandler} autoComplete="off" />
                            <textarea rows={rows} className="form-control editNoteBody border-0 bg-dark text-light mb-2" id="noteBody" placeholder="Body" value={noteBody} onChange={noteBodyChangeHandler} />
                            <div className='text-center'>
                                <button type="submit" className="btn btn-primary" onClick={addNote}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNote