const mongoose = require('mongoose')

const usermodel = new mongoose.Schema( {

    name: {
        type : String,
        min: 3,
        required : true
    },
    
    email: {
        type: String,
        unique: true,
        required: true
    },

    age: {
        type: Number,
        required: true,
        min: 1
    }
}, {timestamps: true})

const userModel = new mongoose.model("Users", usermodel)

module.exports = userModel