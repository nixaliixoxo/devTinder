const express = require("express");
const app = express();

//example 1
// app.use("/", (req, res) => {
//     res.send("handling / router");  //prints this & END
// })
// app.get("/user", 
//     (req, res, next) => {
//         next();
//     },
//     (req, res, next) => {
//         next();
//     },
//     (req, res, next) => {
//         res.send("handling / router 2");
//     }
// )

//example 2
// app.use("/", (req, res, next) => {
//     next();  
// })
// app.get("/user", 
//     (req, res, next) => {
//         next();
//     },
//     (req, res, next) => {
//         next();
//     },
//     (req, res, next) => {
//         res.send("handling / router 2"); //prints this & END
//     }
// )

//SO EXPRESS WHEN IT GET A REQ IT KEEPS ON CHECKING THE MIDDLEWARES UNTIL IT REACHES THE RES HANDLER THAT SENDS BACK RESPONSE
// API CALL => MIDDLEWARE CHAIN => REQ HANDLER 

// WHY DO WE NEED MIDDLEWARES??
// In this code example we have to check admin authorizaton everytime for an admin route to make sure that only the admin 
// can get all data or delete a user 
// app.get("/admin/getAllData", (req, res) => {
//     //logic of checking if the request is authorised
//     // const token = "xyzzzzzz";
//     const token = "xyz";
//     const isAdminAuthorised = token === "xyz";
//     if(isAdminAuthorised){
//         res.send("all data sent");
//     } else{
//         res.status(401).send("unauthorised access");
//     }
// })

// app.get("/admin/deleteUser", (req, res) => {
//     //logic of checking if the request is authorised
//     // const token = "xyzzzzzz";
//     const token = "xyz";
//     const isAdminAuthorised = token === "xyz";
//     if(isAdminAuthorised){
//         res.send("user deleted");
//     } else{
//         res.status(401).send("unauthorised access");
//     }
// })

//HERE MIDDLEWARES ARE USEFUL 
// now we will write handle auth middleware for all requests 
// app.use("/admin", 
//     //logic of checking if the request is authorised
//     (req, res) => {
//         // const token = "xyzzzzzz";
//         const token = "xyz";
//         const isAdminAuthorised = token === "xyz";
//         if(!isAdminAuthorised){
//             res.status(401).send("unauthorised access");
//         } else{
//             next();
//         }   
//     }
// )   //moving all this logic to another file for clean code writing 

//clean code 
const adminAuth = require("./middlewares/auth.js");
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
    res.send("sent all data")
})
app.get("/admin/deleteUser", (req, res) => {
    res.send("user deleted");
})

//example 2
const userAuth = require("./middlewares/auth.js");
app.get("/user", userAuth, (req, res) => {
    res.send("user has access")
}) 
app.get("/user/login", (req, res) => {
    res.send("user has access")
})

app.listen(3000, ()=> {
    console.log("server running")
});


