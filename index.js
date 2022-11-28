const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000

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