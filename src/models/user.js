const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String
    }, 
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        trim: true 
    }, 
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    }, 
    age: {
        type: Number,
        min: 18
    }, 
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("not valid gender")
            }
        }, 

    },
    skills: {
        type: [String]
    },
    about: {
        type: String,
        default: "this is a default about of the user"
    }
},
{
    timestamps: true 
})

const User = mongoose.model("User", userSchema);

module.exports = {User};