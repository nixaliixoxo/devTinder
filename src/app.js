const express = require("express");
const app = express();

app.use("/user", (req, res) => {
    res.send("route handler 1")
})

app.use("/user", (req, res) => { //postman will send request but bcoz we have not defined any res it will stay hanging \
// there,, after some time req will be timed out and nothing will be responded from the server
// we are not handling this req 
    //empty req handler
})

//we can have multiple request handlers
//first arg is the route, and then followed by as many no of route handlers
//outputs route handler 1
//case 1
// app.use("/user",
//     (req, res) => {
//     res.send("route handler 1")
//     }, 
//     (req, res) => {
//         res.send("route handler 2")
//     }
// )

//case 2 - if the first req handler doesnt have a res.send it still wont moveto the next one it would stay hanging
// app.use("/user",
//     (req, res) => {
//     //no res.send found here... do u thing the next res.send will be printed? NO it wont
//     }, 
//     (req, res) => {
//         res.send("route handler 2")
//     }
// )

//case 3
//express tells us to explicitly take the 4rd arg next and call the func next() to be able to moc=ve to the next 
// req handler
// app.use("/user",
//     (req, res, next) => {
//     //no res from here
//     next();
//     }, 
//     (req, res) => {
//         res.send("route handler 2")
//     }
// )

//case 4
// will send route handler 1 
// but then since js code is synchronous and new func context ismade everytime we see a new func
// the 2nd callback will also be executed and when we try to send res back from 2nd callback also it will give a 
// console error (as server had alr sent res to client afer which the connection was closed, client is working fine but
// server is again trying to send a response but is not able to find the client)
app.use("/user",
    (req, res, next) => {
    res.send("route handler 1");
    next();
    }, 
    (req, res) => {
        res.send("route handler 2")
    }
)

//case 5
//outputs req handler 2 as 2nd res.send returns the response 
// and again error from first res.send after next() finishes 
app.use("/user",
    (req, res, next) => {
    next();
    res.send("route handler 1");
    }, 
    (req, res) => {
        res.send("route handler 2")
    }
)

//case 6
// 2nd route handler printed and no error 
app.use("/user",
    (req, res, next) => {
    next();
    }, 
    (req, res) => {
        res.send("route handler 2")
    }, 
    (req, res) => {
        res.send("route handler 3")
    }, 
    (req, res) => {
        res.send("route handler 4")
    }, 
)

//case 7
// error
app.use("/user",
    (req, res, next) => {
        next();
    }, 
    (req, res, next) => {
        next();
    }, 
    (req, res, next) => {
        next();
    }, 
    (req, res, next) => {
        next(); //here it expects there would be a router after this also but it couldnt find one so error
    }, 
)

//case 8
// again request hanging 
app.use("/user",
    (req, res, next) => {
        next();
    }, 
    (req, res, next) => {
        next();
    }, 
    (req, res, next) => {
        next();
    }, 
    (req, res, next) => {

    }, 
)

//we can also send array of functions instead of passing many different route handlers 

app.listen(3000, ()=> {
    console.log("server running")
});


