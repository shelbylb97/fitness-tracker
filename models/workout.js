const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({

    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [
        {
          type:{
              type: String,
              required: 'Enter an exercise please'
          } ,
           name: {
               type: String,
               required: 'Enter an exercise name'
           },
           duration: {
               type: Number,
               required: ' Enter duration in minutes'
           },
           weight:{
               type: Number
           },
           reps: {
               type: Number
           },
           sets:{
               type: Number
           },
           distance:{
               type: Number
           }
        }
    ]
});


const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
