const express = require("express");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const {User} = require("../models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, emailId, password: passwordHash });
    const savedUser = await user.save();

    const token = jwt.sign({ _id: user._id }, "DEV@tinder$11");
    res.cookie("token", token);
    res.status(201).json(savedUser);  
  } catch (err) {
    res.status(400).json({ message: err.message });  
  }
});


authRouter.post("/login", async(req, res)=>{
    try{
        const {emailId, password} = req.body;
    
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            const token = await jwt.sign({_id : user._id}, "DEV@tinder$11");
            res.cookie("token", token);
            res.send(user);
        } else {
            throw new Error("invalid credentials");
        }
    } catch(err){
        res.status(401).send("ERROR" + err.message);
        console.log(err.message);
    }
})

authRouter.post("/logout", async(req, res) =>{
    try{
        res.cookie("token", null, {
            expires: new Date(Date.now())
        });
        res.json({
            message: "logged out"
        });
    } catch(err){
        res.status(400).json({
            error: "ERROR: " + err.message
        })
    }
})

module.exports = authRouter;