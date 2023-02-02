
import {Note} from '../models/note'

// The fetch() function will automatically throw an error for network errors but not for HTTP errors such as 4xx or 5xx responses.
//create a wrapper function to handle http errors for fetch method


async function fetchData(input: RequestInfo, init?: RequestInit): Promise<Response>{
    const response = await fetch(input,init)
    if(response.ok){
        return response
    }else{
        const errorBody = await response.json()
        const errorMessage = errorBody.errorMessage
        throw Error(errorMessage)
    }
}

export async function fetchNotes():Promise<Note[]>{
    const response = await fetchData('/api/notes',{method:'GET'})
   return  response.json()
}

export interface NoteInput{
    title:string,
    text:string
}

export async function createNote(note:NoteInput):Promise<Note>{
    const response = await fetchData('/api/notes',
    {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(note)
    })
   return  response.json()
}

export async function deleteNote(id:string){
    await fetchData('/api/notes/' + id,{method:"DELETE"})
}

export async function  updateNote(id:string,note:NoteInput):Promise<Note>{
    const response = await fetch('/api/notes' + id,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(note)
    })
    return response.json()
}