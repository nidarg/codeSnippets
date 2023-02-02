import React, {FormEvent, useState} from 'react'
import {Modal,Form,Button,Alert} from 'react-bootstrap'
import {Note} from '../models/note'
// import { useForm, SubmitHandler } from "react-hook-form"
import * as NoteApi from '../actions/notes.api'
// import {NoteInput} from '../actions/notes.api'


interface AddNoteDialogProps {
  onDismiss:()=>void,
  noteToEdit?:Note
}


const AddNoteDialog = ({onDismiss,noteToEdit}:AddNoteDialogProps) => {

  
  const[title,setTitle] = useState<string >('') 
  const[text,setText] = useState<string>('')
  const[showAlert,setShowAlert] = useState(false)

  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    try {
      if(!title){
        setShowAlert(true)
      }
      await NoteApi.createNote({title,text})
      setTitle('')
      setText('')
    window.location.href="/"
    } catch (error) {
      console.error(error)
    }
    
  }


  return (
    <Modal onHide={onDismiss} show>
        <Modal.Header closeButton>
            <Modal.Title>
                Add Note
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addNoteForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                Title
              </Form.Label>
              <Form.Control name="title"
                type="text"
                placeholder="Title" 
                defaultValue = {title}
                onChange={(e)=>setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Text
              </Form.Label>
              <Form.Control 
              value={text} 
                as="textarea"
                rows={5}
                placeholder="Text"
                onChange={(e)=>setText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {
            showAlert && (<Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
             The title is required
            </p>
          </Alert>
            )
          }
          <Button type="submit" form="addNoteForm">
            Save
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default AddNoteDialog