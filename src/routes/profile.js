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
        res.status(400).json({ error: err.message });
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;
    const allowedGenders = ["male", "female", "others"];

    if (req.body.gender && !allowedGenders.includes(req.body.gender.toLowerCase())) {
      return res.status(400).json({
        error: "Invalid gender value",
      });
    }

    Object.keys(req.body).forEach((field) => {
      loggedInUser[field] = req.body[field];
    });

    await loggedInUser.save();
    res.send({ message: "Profile updated successfully", user: loggedInUser });
  } catch (err) {
    res.status(400).json({
      error: "ERROR: " + err.message,
    });
  }
});


module.exports = profileRouter;