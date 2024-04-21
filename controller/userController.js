const userModel = require('../models/userModel.js')
const bcrypt = require('bcrypt')
// get all users
exports.getAllUser = async (req, res) => {

    try {


        // Check if user already exists
        const users = await userModel.find();



        return res.status(201).send({
            usercount: users.length,
            success: true,
            message: 'User GET successfully',
            users
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in Get User process',
            error,
        });
    }
}

// user register 
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation for empty fields
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: 'User Already Exists'
            });
        }
        const hasPassword = await bcrypt.hash(password, 10)
        // Save new user
        const newUser = new userModel({ username, email, password: hasPassword });
        await newUser.save();

        return res.status(201).send({
            success: true,
            message: 'User saved successfully',
            user: newUser
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in registration process',
            error: error.message
        });
    }
}


// login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation for empty fields
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(409).send({
                success: false,
                message: 'User Not Exists'
            });
        }
        const confrimPassword = await bcrypt.compare(password, existingUser.password)
        if (!confrimPassword) {
            return res.status(500).send({
                success: false,
                message: 'Incorrect Information'
            });
        }



        return res.status(201).send({
            success: true,
            message: 'User Found successfully',
            user: existingUser
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in Login process',
            error: error.message
        });
    }
}