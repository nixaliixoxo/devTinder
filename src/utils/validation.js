const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName) {
        throw new Error("emter name");
    } else if(!validator.isEmail(emailId)){
        throw new Error("enter a valid email id");
    } else if(!validator.isStrongPassword(password)){
        throw new Error("enter a strong password");
    }
}

module.exports = {validateSignUpData};