const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: [true, 'Email is Required']
    },
    password: {
        type: String,
        require: true,
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
    }]
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;