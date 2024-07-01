const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// Load env varibles from .env file
dotenv.config()
const PORT = process.env.PORT 

const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// Middleware 
app.use(express.json()) // Sets up middleware to parse incoming request bodies as JSON

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
  // routes for the API
app.use('/api/workouts', workoutRoutes)

/*
Eg: 
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})
*/

// Fxn to Connect to db
const ConnectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connection established")
    }
    catch(err){
        console.log(err);
    }
}

// listen for requests (port)
app.listen(PORT, ()=> {
    ConnectDB(); // Call connect to db fxn
    console.log('Server is running on port '+ PORT)
})