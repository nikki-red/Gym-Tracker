const mongoose = require('mongoose')
const WorkoutSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    reps: {
        type: Number, 
        required: true
    },
    load: {
        type: Number, 
        required: true
    }
}, { timestamps: true }) // second arguement to have timestamps: true --> tells when it was created/updated

module.exports = mongoose.model('Workout', WorkoutSchema)