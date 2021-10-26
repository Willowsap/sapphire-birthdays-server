const express = require("express");
const path = require('path');
const mongoose = require("mongoose");

const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/user');
const app = express();

mongoose.connect(
  'mongodb+srv://sapphire:36hVnZYwnot5nB0b@cluster0.1kzdc.mongodb.net/sapphire-birthdays?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database!");
  })
  .catch((err) => {
    console.log("failed to connect to database");
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/profiles", profileRoutes);

module.exports = app;
