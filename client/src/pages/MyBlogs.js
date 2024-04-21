import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'
const MyBlogs = () => {
    const [blogs, setBlog] = useState([])

    const getuserBlog = async () => {
        try {
            const id = localStorage.getItem('userId')
            const { data } = await axios.get(`/api/v1/blog/userblog/${id}`)
            console.log(data)
            if (data?.success) {
                console.log(data.user_blog.blogs)
                setBlog(data?.user_blog.blogs)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getuserBlog()
    }, [])
    return (
        <div>
            {blogs && blogs.length > 0 ?
                (
                    blogs.map(blog => (
                        < BlogCard
                            id={blog._id}
                            isUser={localStorage.getItem('userId') === blog.user._id}
                            title={blog.title}
                            description={blog.description}
                            image={blog.image}
                            username={blog.user.username}
                            date={blog.updatedAt}
                        />
                    )))
                :
                (<h1>You Havn't Create any Blog</h1>)
            }


        </div>
    )
}

export default MyBlogs