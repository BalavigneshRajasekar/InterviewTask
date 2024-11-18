const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
//Server configuration
const server = express();
//Middlewares
server.use(cors());
server.use(bodyParser.json({ extended: true }));

//Routes Import
const registrationRoute = require("./routes/authentication");
const employeeRoute = require("./routes/employee");

//Routes
server.use("/api", registrationRoute);
server.use("/api/employees", employeeRoute);

//Database and Server Connection
mongoose.connect(process.env.MONGODB).then(() => {
  console.log("Connected to MongoDB");
  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
