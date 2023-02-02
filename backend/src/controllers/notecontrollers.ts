import { RequestHandler } from "express"
import createHttpError from "http-errors"
import mongoose from "mongoose"
import NoteModel from '../models/note'


export const getAllNotes:RequestHandler = async (req,res,next)=>{
    try {
        const notes = await NoteModel.find().exec()
        res.status(200).json(notes)
    } catch (error) {
       next(error)
    }
    
}

interface CreateNoteBody {
    title?:string,
    text?:string
}

export const createNote:RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async(req,res,next)=>{
    const {title,text} = req.body
    try {
        if(!title){
            throw createHttpError(400,"title is required")
        }
        const createdNote = await NoteModel.create({title,text})
        res.status(201).json({createdNote})
    } catch (error) {
        next(error)
    }
}

export const getSingleNote:RequestHandler = async(req,res,next)=>{

    const {id:noteId} = req.params

    try {

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note ID")
        }
        const noteExists = await NoteModel.findOne({_id : noteId})
        if(!noteExists){
            throw createHttpError(404, "Note not found")
        }
        res.status(200).json(noteExists)
    } catch (error) {
        next(error)
    }
}

interface UpdateNoteParams {
    id:string
}

interface UpdateNoteBody{
    title?:string,
    text?:string
}

export const updateNote:RequestHandler<UpdateNoteParams,unknown,UpdateNoteBody,unknown >= async(req,res,next)=>{
    const {id:noteId} = req.params
    const {title,text} = req.body
    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note ID")
        }
        if(!title){
            throw createHttpError(400,"title is required")
        }

        const updatedNote = await NoteModel.findOneAndUpdate({_id:noteId},{title,text},{new:true})
        if(!updatedNote){
            throw createHttpError(404, "Note not found")
        }
        res.status(200).json({updatedNote})
    } catch (error) {
        next(error)
    }
}

export const deleteNote:RequestHandler = async(req,res,next)=>{
    const {id:noteId} = req.params
    try {
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400,"Invalid note ID")
        }
        const deletedNote = await NoteModel.findOneAndRemove({_id:noteId})
        if(!deletedNote){
            throw createHttpError(404,"Note not found")
        }

        // res.status(200).json({deletedNote})
        res.sendStatus(204)
        
    } catch (error) {
        next(error)
    }

}