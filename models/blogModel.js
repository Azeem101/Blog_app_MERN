const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Title is Required'],
    },
    description: {
        type: String,
        require: [true, 'Description is Required'],
    },
    image: {
        type: String,
        require: [true, 'Images is Required'],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, 'user id is require'],
    }
}, { timestamps: true })


const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel