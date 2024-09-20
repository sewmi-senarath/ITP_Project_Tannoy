//Password = UM0Syrg5u5iRPglM
const express = require("express");
const userRouter = require("./Route/UserRoutes");
const employeeRouter = require("./Route/EmployeeRoute");
const recyclingProductRouter = require("./Route/RecyclingProductRoute");
const delivermanRoute = require("./Route/delivermanRoute");
const deliverParselRoute =require("./Route/deliverParselRoutes")
const financeRoute = require("./Route/FinanceInvestorRoutes");
const ProductRouter = require("./Route/InventoryProductRoutes");
const SupplierRouter = require("./Route/SupplierRoutes")
const employeeAttendancerouter=require("./Route/employeeAttendanceRoutes")
require('dotenv').config({path: './env/.env'});
const mongoose = require("mongoose");
const config = require('config');
const router = require("./Route/CustomerRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const orderRouter = require("./Route/OrderRoute");

const app = express();
const itemRoutes = require("./Route/InvenoryRoute");
const productRoutes=require("./Route/InventoryProductRoutes")





//Middleware
app.use(express.json());
app.use(cors());
app.use("/Users", userRouter);
app.use("/api/employees", employeeRouter);
app.use("/RecyclingProducts", recyclingProductRouter);
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json()); 
app.use("/Customer",router);
app.use("/deliverMan", delivermanRoute); 
app.use("/deliverParsel", deliverParselRoute)
app.use("/FinanceInvestor", financeRoute);
app.use("/api/items", itemRoutes);
app.use("/api/inventoryProduct",ProductRouter)
app.use("/api/Supplier",SupplierRouter)
app.use("/api/attendance",employeeAttendancerouter)
app.use("/order", orderRouter);
app.use('/api/products', productRoutes);

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
