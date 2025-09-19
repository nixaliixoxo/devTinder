const express = require("express");
const {connectDB} = require("./config/database");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

const app = express();

app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRequestRouter = require("./routes/connRequest");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);

connectDB()
.then(() => {
    console.log("DB connection success");
    app.listen(3000, ()=> {
    console.log("server running")
});
}).catch((err) => {
    console.error("connection failed");
})


