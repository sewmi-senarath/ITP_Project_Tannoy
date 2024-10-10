const asyncHandler = require("express-async-handler"); 
const User = require("../Model/CustomerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../Model/tokenModel");
const crypto = require("crypto");
const exp = require("constants");



   const generateToken = (id) => { 
  return jwt.sign({id}, process.env.JWT_SECRET = "dilmi", {
    expiresIn: "1d"
  });

}
   // Register user
const addUsers =  asyncHandler(async(req, res) => 
  { 
    const {name, email, password} = req.body;

    //validation
    if(!name || !email || !password)
    {
      res.status(400);
      throw new Error("Please fill in all  fields")
    }
    if(password.length < 6)
    {
      res.status(400);
      throw new Error("Password must be at least 6 characters long");
    }
    //check email already exists
     const userExists = await User.findOne({email});
     if(userExists)
     {
       res.status(400);
       throw new Error("User email has  already exists");
     }

      //create new user
     const user = await User.create({
       name,
       email,
       password,
     });

     // generate token
     const token = generateToken(user._id);

     //send HTTP only cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() +1000 * 86400),
        sameSite: "none",
        secure: true,
      });

     if(user)
     {
      const{_id, name, email, photo, phone, bio} = user;
       res.status(201).json
       ({
         _id,
         name, 
         email, 
         photo,
         phone,
         bio,
         token,
       });
     }
     else
     {
       res.status(400);
       throw new Error("Invalid user data");
      
     }
  });

  //Login User
  const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    //validation
    if(!email || !password)
    {
      res.status(400);
      throw new Error("Please add email and password");
    }

    //check if user exists
    const user = await User.findOne({email});

    if(!user)
    {
      res.status(400);
      throw new Error("User not found,please signup");
    }

    //check if password matches
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
     // generate token
      const token = generateToken(user._id);

      //send HTTP only cookie
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
      });

    if(user && passwordIsCorrect){
      const{_id, name, email, photo, phone, bio} = user;
      res.status(200).json
      ({
        _id,
        name,
        email,
        photo,
        phone,
        bio,
        token,
      });
    }else{
      res.status(400);
      throw new Error("Invalid email or password");
    }
  });

  //Logout User
  const logout = asyncHandler(async(req, res) => {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({
      message: " Successfully Logged out",
    });
  });

  //Get User data
  const getUser = asyncHandler(async(req, res) => {
     const user = await User.findById(req.user._id)
     if(user)
      {
       const{_id, name, email, photo, phone, bio} = user;
        res.status(200).json
        ({
          _id,
          name, 
          email, 
          photo,
          phone,
          bio,
     
        });
      }
      else
      {
        res.status(400);
        throw new Error("User not found");
      }
   
  });

  //get login status
  const loginStatus = asyncHandler(async(req, res) => {

    const token = req.cookies.token;
    if(!token)
    {
      return res.json(false);
    }
      // verify token
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if(verified)
      {
        return res.json(true);
      }
        return res.json(false);
      
  });

  //update user
  const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if(user)
    {
      const{ name, email, photo, phone, bio} = user;
      user.email = email,
      user.name = req.body.name || name;
      user.photo = req.body.photo || photo;
      user.phone = req.body.phone || phone;
      user.bio = req.body.bio || bio;

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
      })

    }
    else
    {
      res.status(404);
      throw new Error("User not found");
    } 
  });

  //change password
  const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { oldPassword, password } = req.body;
  
    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }
    //Validate
    if (!oldPassword || !password) {
      res.status(400);
      throw new Error("Please add old and new password");
    }
    //check if password matches
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    //save new password
    if(user && passwordIsCorrect)
    {
      user.password = password;
      await user.save();
      res.status(200).json({
        message: "Password updated successfully",
      });
     
        
  }
    else
    {
      res.status(400);
      throw new Error("Old Password is incorrect");

    };
  });
  
  const forgotPassword = asyncHandler(async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email})

    if(!user)
    {
      res.status(404)
      throw new Error("User does not exist");
    } 
    
    //create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id
   
   //hash token before saving DB
    const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
   
   res.send("Forgot password")

    //save token to DB
    try{
    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 *( 60 * 1000) //30 mins
     

    }).save();
  }catch(error){
    console.error("Error saving token to DB", error);
    throw new Error("Could not save token");
  }

    //construct reset URL
    const resetUrl = `${process.env.FRONTEND_URL ="http://localhost:3000"}/resetpassword/${resetToken}`;


    //reset email
    const message = `
    <h2>Hello ${user.name}</h2>
    <p>Please use the url below to reset your password</p>
    <p>This reset link is only valid for 30 minutes</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    <p>Regards.....</p>
    <p>Tannoy Electrical Team</p> `;


    const subject = "Password Reset Request";
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER = "dilshi2024@outlook.lk";

    try {
      await sendEmail(subject, message, send_to, sent_from);
      res.status(200).json({ success: true, message: "Reset Email Sent" });
    } catch (error) {
      res.status(500);
      throw new Error("Email not sent, please try again");
    }
    res.send("Forgot password")
  });

  //reset password
  const resetPassword = asyncHandler(async(req, res) => {
   const{password} = req.body;
    const resetToken = req.params;


    //hash token ,then compare to tiken in DB
    const hashedToken = crypto 
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    

    //find token in DB
    const userToken = await Token.findOne({
      token: hashedToken,
     expiresAt: {$gt: Date.now()},
     });

     if(!userToken)
     {
       res.status(404);
       throw new Error("Invalid or expired token");
     }

     //find user
     const user = await User.findOne({ _id: userToken.userId });
     user.password = password;
     await user.save();
     res.status(200).json({
       message: "Password Reset Successful, Please Login",
     });
    
  });
 //error handle middleware
  const errorHandler =(err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode:500
     res.status(statusCode)
 
     res.json({
         message: err.message,
         stack: process.env.NODE_ENV === "production" ? err.stack: null
     });
 };
 //auth Middleware

 const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET = "dilmi");
    // Get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});




module.exports = {
  addUsers,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  protect,
  errorHandler,  // Ensure this is exported correctly
};
// 