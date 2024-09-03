//Password = UM0Syrg5u5iRPglM
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/UserRoutes")

const app = express();

//Middleware
app.use(express.json())
app.use("/Users", router)

mongoose.connect("mongodb+srv://tannoyelectrical:Tannoy123@tannoy.veldxba.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
  app.listen(5000);
})
.catch((err)=> console.log((err)));
