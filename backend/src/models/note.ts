import mongoose, { InferSchemaType } from 'mongoose'

const noteSchema = new mongoose.Schema({
    title:{type:String, required:true},
    text:{type:String},
},{timestamps:true})

type Note= InferSchemaType<typeof noteSchema>
export default mongoose.model<Note>("Note", noteSchema)