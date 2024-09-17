//Password = UM0Syrg5u5iRPglM
const express = require("express");
const userRouter = require("./Route/UserRoutes");
const employeeRouter = require("./Route/EmployeeRoute");
const recyclingProductRouter = require("./Route/RecyclingProductRoute");
const delivermanRoute = require("./Route/delivermanRoute");
//const technicalRouter = require("./Route/TechnicalRoutes");
require('dotenv').config({path: './env/.env'});
const mongoose = require("mongoose");
const config = require('config');
const router = require("./Route/CustomerRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const app = express();




//Middleware
app.use(express.json());
app.use("/Users", userRouter);
app.use("/Employee", employeeRouter);
app.use("/RecyclingProducts", recyclingProductRouter);
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json()); 
app.use("/Customer",router);
app.use("/deliverMan", delivermanRoute);
//app.use("/Technical", technicalRouter);

// routes customer management
app.get("/", (req, res) => {
    res.send("Home Page");
  });






//Database connection
mongoose.connect(config.get('db.uri'))
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Server listening on port ${port}...`));
