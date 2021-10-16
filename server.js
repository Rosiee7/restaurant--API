const express = require("express");
const mongoose = require('mongoose');
const app = require("./app");


app.use(express.json());

mongoose.connect("mongoose.connect('mongodb://localhost:27017/yammieDB");
app.listen(3000, function () {
    console.log("Server started on port 3000");
});


