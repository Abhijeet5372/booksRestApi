const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const app = express();
require('dotenv').config();
const booksRoute = require('./routes/books');



const PORT = process.env.PORT || 3000


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//create a logger



//routes
app.use('/api/books',booksRoute);



//connect to Mongodb Atlas
mongoose.connect(process.env.MONGO_URL,
{useNewUrlParser:true}).then(() => {
    console.log("Connected to MongoDB Atlas")
}).catch(error => {
    console.log("Something wrong happened",error);
})
//Start Server
app.listen(PORT,()=>{
    console.log("Server Started at PORT ",PORT);
});