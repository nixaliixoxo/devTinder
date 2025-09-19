const express = require("express");
const {userAuth} = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const {validateEditProfile} = require("../utils/validation")

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async(req, res)=>{
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        const decodedMsg = await jwt.verify(token, "DEV@tinder$11");
        const {_id} = decodedMsg;
        const user = await User.findOne({_id: _id});
        if(!user){
            res.send("user not found");
        } else{
            res.send(user);
        }
    } catch(err){
        res.send("ERROR" + err.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async(req, res)=>{
    //validate my profile edit data
    try{
        if(!validateEditProfile(req)){
            throw new Error("invalid edit request");
        }
        const loggedInUser = req.user;
        // validate what the user has sent & then proceed with below
        Object.keys(req.body).forEach(field => loggedInUser[field] = req.body[field]);
        await loggedInUser.save();
        res.send("profile updated successfully" + loggedInUser);
    }
    catch(err){
        res.send("cant update profile" + err.message);
    }
})

module.exports = profileRouter;