const userModel = require("../model/userModel");

const createUser = async (req,res) => {
    try {
        const {name, email, age} = req.body;
        if(!name || !email || !age)
        {
            return res.status(400).json({error: "All fields are required"})
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format"});
        }

        if(age < 1) 
        {
            return res.status(400).json({ error: "Age must be a positive value"});
        }

        const newUser = new userModel({name, email, age})
        const savedUser = await newUser.save()
        res.status(201).json({message: "User created", savedUser})

    } catch (error) {
        if (error.code === 11000) 
        {
            return res.status(400).json({ error: "Email already exists" });
        }
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find()
        return res.status(200).json({message: "users fetched successfuly",users})
    } catch (error) {    
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const getUserById = async (req,res) => {
    try {
        const {id} = req.params
        const userData = await userModel.findById(id)
        if(!userData)
        {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({message: "user details fetched",userData})    
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const updateUser = async (req,res) => {
    try {
      
        const {id} = req.params
        const {name, age, email} = req.body
        const updatedUser = await userModel.findByIdAndUpdate(id, {name, email, age}, {new:true})
        if(!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({message: "user details updated",updatedUser})

    } catch (error) {
        res.status(500).json({error: error.message || "Internal server error"})
    }
}

const deleteUser = async (req,res) => {
    try {

        const {id} = req.params
        const deletedUser = await userModel.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(204).json({message: "user deleted successfully ",deletedUser})
        
    } catch (error) {
        
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})

    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser

}