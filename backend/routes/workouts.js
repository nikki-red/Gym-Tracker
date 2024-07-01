const express = require('express')
// importing controllers (actions to do for a api call)
const { 
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// importing schemas 
const Workout = require('../models/WorkoutModel')

const router = express.Router() // why router? we cannot get post using app like in server.js

// GET all workouts
router.get('/', getWorkouts)

// GET single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workoutq
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router

/*
--> or 
// POST a new workout
router.post('/', async (req, res) => {
    const { title, reps, load } = req.body
    try{
        const workout = await new Workout({title, reps, load})
        await workout.save()
        res.status(200).json(workout)
    } 
    catch(err) {
        res.status(500).json(err)
    }
    res.json({mssg: 'POST a new workout'})
})

Diff: 
    const workout = await new Workout({title, reps, load})
    await workout.save()
    <instead>
    const workout = await Workout.create({title, reps, load})

1st method allows use to have more control over the doc instance before saving, like setting defaults or running validations
2nd method is a straightforward appraoch

*/