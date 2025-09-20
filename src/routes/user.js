const express = require("express");
const {userAuth} = require("../middlewares/auth");
const { User } = require("../models/user");
const { connectionRequest } = require("../models/connectionRequest");

const userRouter = express.Router();

//get all the pending connection requests for the logged in user
userRouter.get("/user/pendingrequests", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;
        const allConnectionRequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested", 
        }).populate("fromUserId", ["firstName", "lastName"]); 
        // .populate("fromUserId"); 
        // .populate("fromUserId", ["firstName lastName"]); 
        res.json({
            message: "data fetched successfully",
            data: allConnectionRequests
        })
    }
    catch(err){
        res.status(400).send("ERROR " + err.message);
    }
})

userRouter.get("/user/connections", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;
        const allConnections = await connectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        })
        .populate("fromUserId", "firstName lastName")
        .populate("toUserId", "firstName lastName"); 

        const data = allConnections.map((obj) => {
            if(obj.fromUserId._id.toString() === loggedInUser._id.toString()){
                return  obj.toUserId;
            } else{
                return obj.fromUserId;
            }
        })

        res.json({
            message: "connections fetched",
            data: data
        })
    }
    catch(err){
        res.status(400).send("ERROR " + err.message);
    }
})

module.exports = userRouter;