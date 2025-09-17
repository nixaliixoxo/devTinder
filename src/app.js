const express = require("express");
const {connectDB} = require("./config/database");
const {User} = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

const app = express();

app.use(cookieParser());
app.use(express.json());

// user signup
app.post("/signup", async(req, res)=>{
    try{
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({firstName, lastName, emailId, password: passwordHash});
        await user.save();
        res.send("user added successfully");
    } catch(err){
        res.send("ERROR" + err.message);
    }
})

// user login
app.post("/login", async(req, res)=>{
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
            res.send("login successful");
        } else {
            res.send("invalid credentials");
        }
    } catch(err){
        res.send("ERROR" + err.message);
    }
})

// user profile
app.post("/profile", async(req, res)=>{
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

// get user by id - Model.findById
app.get("/user/:id", userAuth, async(req, res) => {
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
app.delete("/user", userAuth, async(req, res) => {
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
app.patch("/user/:userId", userAuth, async(req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    
    try{
        const allowedUpdates = ["firstName", "lastName", "age", "gender", "skills", "about", "password", "emailId"];
        const isAllowedUpdates = Object.keys(data).every(keyy => allowedUpdates.includes(keyy));
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
        res.status(400).send("update has failed" + err.message);
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


