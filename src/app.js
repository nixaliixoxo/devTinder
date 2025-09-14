const express = require("express");
const app = express();

// app.use((req, res) => { //request handler
//     res.send("server running")
// })

app.use("/test", (req, res) => { 
    console.log("onto")
    res.send("onto server testing")
})

app.use("/hello", (req, res) => { 
    res.send("hello there")
})

app.listen(3000, ()=> {
    console.log("server running")

});