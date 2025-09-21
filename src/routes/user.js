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

userRouter.get("/user/feed?page=1&limit=10", userAuth, async(req,res)=>{
    // user should see all the user cards except 
    // 1. his own card
    // 2, his connections
    // 3. ignored people
    // 4. already sent connection request
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10; 
        limit = limit > 50? 50 : limit;
        const skip = (page-1)*limit;

        //finding all the connection requests that either ive sent or received 
        const allConnectionRequests = await connectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id},
                {fromUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId").skip(skip).limit(limit);
        // .populate("fromUserId", "firstName lastName").populate("toUserId", "firstName lastName");

        const hideUsersFromFeed = new Set();
        allConnectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideUsersFromFeed)}},
                {_id : {$ne : loggedInUser._id }}
            ]
        }).select("firstName lastName");

        res.send(users);
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = userRouter;