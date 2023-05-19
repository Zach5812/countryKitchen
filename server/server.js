// Import Dependencies
const express = require("express");
const app = express();
require('dotenv').config();

require("./configs/mongoose.config")


// Configure Express
app.use(express.json() );
app.use(express.urlencoded({ extended: true }));

// Routes & Controller logic(CRUD)


// Listen to the Port
app.listen(8000, ()=>console.log(`Listening to the port: 8000`));