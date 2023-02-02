
import app from './app'
import mongoose from 'mongoose'
import env from './utils/validateEnv'





const port = env.PORT



mongoose.connect(env.MONGO_URL!)
.then(()=>{
    console.log('mongoose connected');
    app.listen(port ,()=>{
        console.log(`Server is listenning on port ${port}`)
        
    })
    
})
.catch(console.error)

