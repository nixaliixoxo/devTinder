const express = require("express");
const {connectDB} = require("./config/database");
const {User} = require("./models/user")

const app = express();

app.post("/signup", async(req, res) => {
    const userDataObj = {
        firstName: "virat",
        lastName: "kohli",
        emailId: "kohli@gmail.com",
        password: "kohli@123"
    }
    const user = new User(userDataObj);
    try{
        await user.save();
        res.send("user added successfully");
    } catch(err){
        res.status(401).send("error in adding user to db" + err.message);
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


