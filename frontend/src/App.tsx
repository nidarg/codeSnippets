import React ,{useEffect, useState} from 'react';
import {Container,Row,Col,Button} from 'react-bootstrap'
import {Note as NoteModel} from'./models/note'
import Note from './components/Note';
import styles from './styles/NotesPage.module.css'
import * as NotesApi from './actions/notes.api'
import AddNoteDialog from './components/AddNoteDialog';
import styleUtils from './styles/utils.module.css'
import {FaPlus} from 'react-icons/fa'

function App() {

  const [notes,setNotes] = useState<NoteModel[]>([])

  const [showAddNoteDialog,setShowAddNoteDialog] = useState(false)

useEffect( ()=>{

  const loadNotes = async()=>{
    try {
      setNotes(await NotesApi.fetchNotes())
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  loadNotes()
},[])

  async function deleteNote(note:NoteModel){
    try {
      await NotesApi.deleteNote(note._id)
      setNotes(notes.filter(existingNote=> existingNote._id !== note._id))
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Container>
      <Button className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}onClick={()=>setShowAddNoteDialog(true)}><FaPlus/>Add New Note</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
      {notes.map(note=>
      <Col key={note._id}>
        <Note 
        note = {note}
        className={styles.note}
         onDeleteClick={deleteNote}
         />
        </Col>
      )}

      
      </Row>
      {
        showAddNoteDialog && <AddNoteDialog onDismiss={()=>setShowAddNoteDialog(false)}/>
      }
    </Container>
  );
}

export default App;
