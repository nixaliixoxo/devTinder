const express = require("express");
const app = express();

// app.use("/", (req, res) => { //request handler //this code overwrites everything so any other route doesnt work
//     res.send("server running")
// })

//nowif we write a use code, all methods will console log this only bcoz ORDER MATTERS
app.use("/user", (req, res) => { 
    res.send("all methods same response")
})

//this will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({firstName: "Neelakshi"})
})

//POST method
app.post("/user", (req, res) => {
    console.log("save data to the database")
    res.send("data saved successfully")
})

//DELETE method
app.delete("/user", (req, res) => {
    res.send("data deleted successfully")
})

//it will match all the http method API calls to /test
app.use("/test", (req, res) => { 
    console.log("onto")
    res.send("onto server testing")
})

app.use("/hello", (req, res) => { 
    res.send("hello there")
})

// app.use("/", (req, res) => { //but if this is below ie we change the order, then hello there will work and not this
//     res.send("server running")
// })

app.listen(3000, ()=> {
    console.log("server running")
});

//ROUTES ARE ALWAYS MATCHED FROM TOP TO BOTTOM 
