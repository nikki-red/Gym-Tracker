const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        // find all workouts and then sort in descending order (-1)
        const workouts = await Workout.find({}).sort({createdAtt: -1})
        res.status(200).json(workouts)
    }
    catch(err) {
        res.status(200).json(err)
    }
}

// get a single workout
const getWorkout = async (req, res) => {
    try {
        const {id} = req.params

        // check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout"})
        }

        const workout = await Workout.findById(id)
        if(!workout) {
            return res.status(404).json({error: "No such workout"})
        }
        res.status(200).json(workout)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

// create a new workout
const createWorkout = async (req, res) => {
    // add doc to db
    const { title, reps, load } = req.body
    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } 
    catch(err) {
        res.status(500).json(err)
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    try{
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout"})
        }
        const workout = await Workout.findByIdAndDelete(id)
        if(!workout) {
            return res.status(404).json({error: "No such workout"})
        }
        res.status(200).json("Workout deleted")
    }
    catch(err) {
        res.status(500).json(err)
    }
}

// update a workout
const updateWorkout = async (req, res) => {
    try{
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout"})
        }
        const workout = await Workout.findByIdAndUpdate({_id:id}, {...req.body}, {new: true}) // new: true ensures mongoose returns the updated doc 
        if (!workout) {
            return res.status(404).json({ error: "No such workout" });
        }
        res.status(200).json(workout);
    }
    catch(err) {
        res.status(500).json(err)
    }
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}