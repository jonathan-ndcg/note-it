import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function NoteModal(props) {

    const token = localStorage.getItem("token")
    const headers = { 'auth_key': token }

    useEffect(() => {
        props.modalRef.current.style.display = "block"
        noteBodyChangeHandler()
        props.modalRef.current.style.display = "none"
    }, [props.modalChanged]);

    const noteBodyRef = useRef()

    const minRows = 2
    const maxRows = 10
    const [rows, setRows] = useState(minRows)

    const noteTitleChangeHandler = (e) => {
        const newState = { ...props.note, "title": e.target.value }
        props.setNote(newState)
    }

    const noteBodyChangeHandler = (e) => {
        const newState = { ...props.note, "body": noteBodyRef.current.value }
        props.setNote(newState)

        // Autogrow
        const textareaLineHeight = 24;

        const previousRows = noteBodyRef.current.rows
        noteBodyRef.current.rows = minRows

        const currentRows = Math.floor(noteBodyRef.current.scrollHeight / textareaLineHeight)

        if (currentRows === previousRows) {
            noteBodyRef.current.rows = currentRows
        }

        if (currentRows >= maxRows) {
            noteBodyRef.current.rows = maxRows;
            noteBodyRef.current.scrollTop = noteBodyRef.current.scrollHeight;
        }

        setRows(Math.min(currentRows, maxRows))
    }

    const editNote = () => {
        axios.put("http://localhost:4000/notes/", props.note, { headers })
            .then(res => {
                props.setNotes(prev => prev.map(
                    note => note._id === props.note._id ? props.note : note
                ))
            })
    }

    return (
        <div className="modal fade" id="noteModal" tabIndex="-1" aria-labelledby="noteModalLabel" aria-hidden="true" ref={props.modalRef}>
            <div className="modal-dialog">
                <div className="modal-content bg-dark text-light">
                    <div className="m-3">
                        <input type="text" className="form-control border-0 bg-dark text-light mb-1" id="noteTitle" placeholder="Title" value={props.note.title} onChange={noteTitleChangeHandler} autoComplete="off" />
                        <textarea rows={rows} className="form-control editNoteBody border-0 bg-dark text-light mb-2" id="noteBody" placeholder="Body" value={props.note.body} onChange={noteBodyChangeHandler} ref={noteBodyRef} />
                        <button type="button" className="btn btn-primary" onClick={editNote}>OK</button>
                        <button type="button" className="btn btn-secondary ms-2" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteModal