import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard';

const Blogs = () => {

    const [blogs, setBlogs] = useState();
    const getallBlogs = async () => {
        try {
            const { data } = await axios.get("/api/v1/blog/getallblogs")
            console.log(data)
            if (data?.success) {
                setBlogs(data?.blogs)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getallBlogs()
    }, [])
    return (
        <div>
            {blogs && blogs.map(blog => (
                < BlogCard
                    id={blog._id}
                    isUser={localStorage.getItem('userId') === blog.user._id}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.user.username}
                    date={blog.updatedAt}
                />
            ))}

        </div>
    )
}

export default Blogs