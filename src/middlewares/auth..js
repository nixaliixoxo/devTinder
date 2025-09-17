const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    //read the token from req.cookies
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("token is not valid!!");
        }
        const decodedObj = jwt.verify(token, "DEV@tinder$11");
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("user not found");
        } else{
            next();
        }
    } catch(err){
        res.send("error message" + err.message);
    }
}

module.exports = {
    userAuth
}