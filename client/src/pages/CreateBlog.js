import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CreateBlog = () => {

    const navigate = useNavigate()
    const id = localStorage.getItem('userId')
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/blog/registerblog', {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            })
            console.log(data)
            if (data?.success) {
                console.log("hellllooooooo")
                alert("Blog Created");
                navigate('/my-blogs')
            }
        } catch (error) {
            console.log(error)
        }

    }
    const handleChange = (e) => {
        setInputs((p) => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box border={3} borderRadius={10} padding={3} margin='auto' boxShadow={'10px 10px 20px #ccc'} marginTop={'90px'} display={'flex'} flexDirection={'column'} width={'50%'}>
                    <Typography variant='h2' textAlign={'center'} fontWeight={'bold'} padding={3} color={'gray'}>
                        Create A Post
                    </Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>
                        Title
                    </InputLabel>
                    <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>
                        Description
                    </InputLabel>
                    <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' />
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>
                        Image URL
                    </InputLabel>
                    <TextField name='image' value={inputs.image} onChange={handleChange} margin='normal' variant='outlined' />
                    <Button color='primary' variant='contained' type='submit'>Submit</Button>
                </Box>
            </form>
        </div>
    )
}

export default CreateBlog
