const express = require("express");
const {connectDB} = require("./config/database");
const {User} = require("./models/user")

const app = express();

app.use(express.json());

app.post("/signup", async(req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.send("user added successfully");
    } catch(err){
        res.status(401).send("error in adding user to db" + err.message);
    }
})

//how to get one user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId: userEmail});
        if(users.length === 0){
            res.status(404).send("user not found");
        } else{
            res.send(users);
        }
    } catch(err) {
        res.status(400).send("something went wrong");
    }
})

// FEED API - GET /feed - get all the users from the database
//whenever u want to get the data from the db you shd know which model u have to use... what r u getting from the db
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    } catch(err){
        res.status(400).send("something went wrong");
    }
})


//Model.findOne()
app.get("/oneuser", async(req, res) => {
    const userEmail = req.body.emailId;
    try{
        const user = await User.findOne({emailId: userEmail});
        if(!user){
            res.status(404).send("user not found"); 
        } else {
            res.send(user);
        }
    } catch(err) {
        res.status(400).send("something went wrong");
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


