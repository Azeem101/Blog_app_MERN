const mongoose = require('mongoose');
const blogModel = require('../models/blogModel.js');
const userModel = require('../models/userModel.js');



//get all blogs
exports.getallblog = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");;
        if (!blogs) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            })
        }

        return res.status(200).send({
            success: true,
            blogcount: blogs.length,
            blogs,
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in GET ALL BLOG",
            error
        })
    }
}

//get all blogs by Id
exports.getallblogById = async (req, res) => {
    try {

        const { id } = req.params
        const blogs = await blogModel.findById(id);
        if (!blogs) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            })
        }

        return res.status(200).send({
            success: true,
            blogs,
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in GET BLOG BY ID",
            error
        })
    }
}

//post || create blogs 
exports.registerblog = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;

        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields",
            });
        }

        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User Not Exists',
            });
        }

        const new_blog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession();

        try {
            session.startTransaction();
            await new_blog.save({ session });
            existingUser.blogs.push(new_blog);
            await existingUser.save({ session });
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error; // Rethrow the error to be caught by the outer catch block
        } finally {
            session.endSession();
        }

        return res.status(200).send({
            success: true,
            message: 'Blog successfully added',
            new_blog,
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            success: false,
            message: "Error in REGISTER BLOG",
            error: error.message,
        });
    }
};


//update blog
exports.updateblog = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, image } = req.body

        const update_blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })


        return res.status(200).send({
            success: true,
            message: "blog Updated Successfully",
            update_blog
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in UPDATE BLOG",
            error
        })
    }
}

//delete blog
exports.deleteblog = async (req, res) => {
    try {
        const { id } = req.params
        const delete_blop = await blogModel.findByIdAndDelete(id, { new: true })

        return res.status(200).send({
            success: true,
            message: "blog successfully DELETED",
            delete_blop
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in DELETE BLOG",
            error
        })
    }
}



//user blog
exports.userblogbyid = async (req, res) => {
    try {
        const { id } = req.params
        const user_blog = await userModel.findById(id).populate('blogs')

        if (!user_blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            })
        }




        return res.status(200).send({
            success: true,
            message: "blog successfully found",
            user_blog
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in Getting user BLOG",
            error
        })
    }
}