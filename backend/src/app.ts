import 'dotenv/config'
import express, {Request,Response,NextFunction} from 'express'
import morgan from 'morgan'
import noteroutes from './routes/noteroutes'
import createHttpError, {isHttpError} from 'http-errors'
import cors from 'cors'

const app = express()
app.use(cors())

app.use(express.json())
app.use(morgan("dev"))

app.use('/api/notes',noteroutes)

// not  endpoin found error handler middleware
app.use((req,res,next)=>{
    next(createHttpError(404,"Endpoint not found"))
})

// error handler middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown,req:Request, res:Response,next:NextFunction)=>{

    console.error(error)
    let errorMessage = "An unknown error occured"
    let statusCode = 500
    if(isHttpError(error)){
        statusCode = error.status
        errorMessage = error.message
    } 
    res.status(statusCode).json({errorMessage:errorMessage})

})

// handler error for no existing route
app.use((req,res,next)=>{
    next(Error("Endpoint not found"))
})

export default app