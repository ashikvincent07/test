const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
PORT=5000;



const userRoute=require('./Routes/userRoute');
const postEventRoutes = require('./Routes/postEvent'); 
const notificationRoutes = require('./Routes/postNotification'); 
const feedbackRoutes = require('./Routes/postFeedback');
require("./DB/connection");
const path = require('path');

// Create uploads directory if it doesn't exist



const app=new express();
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());


app.use('/api',userRoute)
app.use('/api/events', postEventRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
})