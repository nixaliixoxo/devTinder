const express = require("express");
const {userAuth} = require("../middlewares/auth");
const {connectionRequest} = require("../models/connectionRequest");
const { User } = require("../models/user");

const connectionRequestRouter = express.Router();

connectionRequestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res) =>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // if(fromUserId === toUserId){
        //     return res.status(400).send({message: "cant send request to yourself"}) 
        // }

        const allowedStatus = ["ignored", "interested"];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "invalid status type"});
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message: "user not found"}) 
        }

        const existingConnectionRequest = await connectionRequest.findOne({
            $or: [
                {toUserId: toUserId, fromUserId: fromUserId},
                {toUserId: fromUserId, fromUserId: toUserId}
            ]
        })

        if(existingConnectionRequest){
            res.status(400).json({
                message: "cpnnection request already exists"
            })
        }

        const newconnectionRequest = new connectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await newconnectionRequest.save();

        res.json({
            message: "connection request sent successfully",
            data,
        }); 
    }
    catch(err){
        res.send("ERROR" + err.message); 
    }
});

connectionRequestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res) =>{
    try{
        const loggedInUser = req.user;

        //validate the status
        const allowedStatus = ["accepted", "rejected"];
        const {status, requestId} = req.params;
        if(!allowedStatus.includes(status)){
            throw new Error("invalid status");
        }

        //validate the requestId
        //loggedInUser === toUserId
        //status === interested
        const existingConnectionRequest = await connectionRequest.findOne({
            _id: requestId, 
            toUserId: loggedInUser._id,
            status:"interested", 
        });
        if(!existingConnectionRequest){
            return res.status(404).json({
                message: "connection request not found"
            })
        }

        existingConnectionRequest.status = status;
        const successData = await existingConnectionRequest.save();

        res.json({
            message: "connection request " + status,
            data: successData
        })
    }
    catch(err){
        res.send("ERROR" + err.message); 
    }
});

module.exports = connectionRequestRouter;