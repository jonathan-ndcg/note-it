import React, { useEffect, useState, useRef } from 'react'
import { Modal } from 'bootstrap'
import CreateNote from './CreateNote'
import NavBar from './NavBar'
import NoteList from './NoteList'
import axios from "axios"
import NoteModal from './NoteModal'

function NoteApp() {

  const token = localStorage.getItem("token")
  const headers = { 'auth_key': token }

  useEffect(() => {
    getAllNotes();
  }, []);

  const [notes, setNotes] = useState([]);

  const getAllNotes = () => {
    axios.get("http://localhost:4000/notes", { headers })
      .then((response) => {
        setNotes(response.data);
      });
  };

  const deleteNote = (noteId) => {
    setNotes(prev =>
      prev.filter(prev => prev._id !== noteId)
    )
    axios.delete("http://localhost:4000/notes", { data: { _id: noteId }, headers: headers })
  };

  const modalRef = useRef()
  const [modalNote, setModalNote] = useState({ title: "", body: "" });
  const [modalChanged, setModalChanged] = useState(false)

  const showModal = (note) => {
    setModalNote(note)
    const modalEle = modalRef.current
    const bsModal = new Modal(modalEle)
    bsModal.show()
    setModalChanged(prev => !prev)
  }

  return (
    <div>
      <NoteModal modalRef={modalRef} note={modalNote} setNote={setModalNote} setNotes={setNotes} modalChanged={modalChanged} />
      <NavBar />
      <main className='m-3'>
        <CreateNote setNotes={setNotes} />
        <NoteList notes={notes} delete={deleteNote} showModal={showModal} />
      </main>
    </div>
  )
}

export default NoteApp