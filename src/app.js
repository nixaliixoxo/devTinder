const express = require("express");
const {connectDB} = require("./config/database");
const {User} = require("./models/user");
const { isValidElement } = require("react");

const app = express();

app.use(express.json());

// get user by id - Model.findById
app.get("/user/:id", async(req, res) => {
    const userId = req.params.id;
    try{
        const user = await User.findById(userId);
        if(!user){
            res.status(404).send("user not found");
        } else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send("something went wrong")
    }
})

// delete api to delete a user using Model.findByIdandDelete
app.delete("/user", async(req, res) => {
    const userId = req.body.userId;
    try{
        //const user = await User.findById({_id : userId});
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted"); 
    } catch(err){

    }
})

// update data of the user
// adding API level validations 
app.patch("/user/:userId", async(req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    
    try{
        const allowedUpdates = ["firstName", "lastname", "age", "gender", "skills", "about"];
        const isAloowedUpdates = Object.keys(data).every(keyy => allowedUpdates.includes(keyy));
        if(!isAllowedUpdates){
            throw new Error("update not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("skills cannot be more than 10");
        }
        await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: "before",
            runValidators: true
        });
        res.send("user updated successfully");
    } catch(err){
        res.status(400).send("update has failed");
    }
})

connectDB()
.then(() => {
    console.log("DB connection success");
    app.listen(3000, ()=> {
    console.log("server running")
});
}).catch((err) => {
    console.error("connection failed");
})


