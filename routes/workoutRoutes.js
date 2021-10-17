const router = require('express').Router();
const Workout = require('../models/workout.js');


router.post('/api/workouts', (req, res) =>{
    Workout.create({})
    .then((workout) => {
        console.log('created', workout)
        res.json(workout)
    })
    .catch((err) => {
        console.log(err);
        res.json(err)
    })
});

router.put('/api/workouts/:id', (req, res) =>{
  
    Workout.findByIdAndUpdate(
       req.params.id,
       { $push: { exercises: req.body } },
       {new: true, runValidators: true} 
    )
    .then((workout) =>{
        console.log(workout);
        res.json(workout)
    })
    .catch((err) => {
        console.log(err);
        res.json(err)
    })
});


router.get('/api/workouts', (req, res) =>{
    Workout.aggregate([
        {
            $addFields:{
                totalDuration:{
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .then((workout) =>{
        res.json(workout)
    })
    .catch((err) =>{
        console.log(err);
        res.json(err)
    })
});

router.get("/api/workouts/range", function (req, res) {
    Workout.aggregate([

        //find all workouts
        { $match: {} },

        // duration
        { $addFields: { totalDuration: { $sum: "$exercises.duration" } } }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;