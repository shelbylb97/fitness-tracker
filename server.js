const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');



const PORT = 3000;
const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));


mongoose.connect('mongodb://localhost/workout', {
    useNewUrlParser: true,
    useFindAndModify: false
})

//import routes
app.use(require('./routes/workoutRoutes.js'));
app.use(require('./routes/homeRoutes.js'));

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`)
})
