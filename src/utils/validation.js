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

const validateEditProfile = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "gender", "age", "about", "skills", "photoURL"];
    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    return isEditAllowed;
}

module.exports = {validateEditProfile, validateSignUpData};

