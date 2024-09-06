//Password = UM0Syrg5u5iRPglM
const express = require("express");
const userRouter = require("./Route/UserRoutes");
const employeeRouter = require("./Route/EmployeeRoute");
const recyclingProductRouter = require("./Route/RecyclingProductRoute");
const delivermanRoute = require("./Route/delivermanRoute");
require('dotenv').config({path: './env/.env'});
const mongoose = require("mongoose");
const config = require('config');

const app = express();

//Middleware
app.use(express.json());
app.use("/Users", userRouter);
app.use("/Employee", employeeRouter);
app.use("/RecyclingProducts", recyclingProductRouter);
app.use("/deliverMan", delivermanRoute);

//Database connection
mongoose.connect(config.get('db.uri'))
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Server listening on port ${port}...`));