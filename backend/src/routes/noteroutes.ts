import express from 'express'
import * as NotesController from '../controllers/notecontrollers'

const router = express.Router()

router.route('/').get(NotesController.getAllNotes).post(NotesController.createNote)

router.route('/:id').get(NotesController.getSingleNote).patch(NotesController.updateNote).delete(NotesController.deleteNote)

export default router