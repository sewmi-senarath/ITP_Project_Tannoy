//Password = UM0Syrg5u5iRPglM
const express = require("express");
const userRouter = require("./Route/UserRoutes");
const employeeRouter = require("./Route/EmployeeRoute");
const recyclingProductRouter = require("./Route/RecyclingProductRoute");
const reProductRouter = require("./Route/ProductRoute");
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
const CRMRegister = require("./CRMAuthHandler/CRMRegiHandler");
const { loginCRM } = require("./CRMAuthHandler/CRMLoginHandler");

const app = express();
const itemRoutes = require("./Route/InvenoryRoute");
const productRoutes=require("./Route/InventoryProductRoutes")
const loginRoute = require('./Route/loginRoute.js');







//Middleware
app.use(cors());
app.use(express.json());
app.use(cors());
//app.use("/Users", userRouter);
app.use("/api/employees", employeeRouter);
app.use("/products", reProductRouter);
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
app.use("/api/suppliers",SupplierRouter)
app.use("/api/attendance",employeeAttendancerouter)
app.use("/order", orderRouter);
app.use('/api/products', productRoutes);
app.use('/api/items',itemRoutes);
app.post("/CRMRegister", CRMRegister);
app.post("/loginCRM", loginCRM);
app.use(require("./Route/TechnicalRoutes.js"));

const jwt = require('jsonwebtoken');

const JWT_SECRET = "your-secure-secret-key"; // You can replace this with any strong key
app.use("/api/user", loginRoute);

// You can also pass JWT_SECRET directly to other routes or components that require it
app.set('jwtSecretKey', JWT_SECRET);


// routes customer management
app.get("/", (req, res) => {
    res.send("Home Page");
  });

//Register
//Call Registration Model
require("./Model/DelRegister");
const Register = mongoose.model("Register");
app.post("/register", async(req, res) => {
  const {name, email, password} = req.body;
  try {
    await Register.create({
      name,
      email,
      password,
    })
    res.send({status:"ok"});
  }catch(err){
    res.send({status:"err"});
  }
});

//Login
app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  try{
    const register = await Register.findOne({email});
    if(!register){
      return res.json({err:"Not found"})
    }
    if(register.password === password){
      return res.json({status: "ok"});

    }else{
      return res.json({err: "Incorrect Password"})
    }

  }catch(err){
    console.error(err);
    res.status(500).json({err:"Server Error"})
  }
});

app.get('/recyclingProducts/report', (req, res) => {
    const { startDate, endDate, status } = req.query;
    
  // Filter data based on date range and status
  RecyclingProduct.find({
    date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    status: status,
  })
    .then((products) => res.json(products))
    .catch((error) => res.status(500).json({ error: error.message }));
});

//Database connection
mongoose.connect(config.get('db.uri'))
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Server listening on port ${port}...`));
