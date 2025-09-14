const express = require("express");
const app = express();

// app.get("/ab?c", (req, res) => {
//     res.send("b is optional here")
// })

// app.get("/ab+c", (req, res) => {
//     res.send("a and c shd be at last and u can add as many bs as u want")
// })

// app.get("/ab*c", (req, res) => {
//     res.send("starts with ab, ends with c, and in place of star anything can come")
// })

// app.get("/a(bc)?d", (req, res) => {
//     res.send("grouping also exists, bc is optional")
// })

// app.get("/a(bc)+d", (req, res) => {
//     res.send("grouping also exists, any amt of bc is allowed")
// })

//regex
app.get(/a/, (req, res) => {
    res.send("if any of my path contains a, it works")
})

app.get("/user", (req, res) => {
    console.log(req.query);
    res.send("query params")
})

app.get("/user/:userId", (req, res) => {
    console.log(req.params);
    res.send("dynamic routes")
})

app.listen(3000, ()=> {
    console.log("server running")
});


