const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const attendance_routes = require('./routes/attendance_routes');


//Routes MiddleWheres

app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//my routes
app.use('/api/attendance',attendance_routes);





//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to DB'));

    app.listen(8000, () => console.log('Server is up and running'));
    
