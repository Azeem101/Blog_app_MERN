import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
const Register = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handlechange = (e) => {
        setInputs((previousState) => ({
            ...previousState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/registeruser', { username: inputs.name, email: inputs.email, password: inputs.password })
            if (data.success) {
                alert("User registerd successfully")
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>

                <Box maxWidth={450}
                    display='flex'
                    flexDirection={'column'}
                    alignItems='center'
                    justifyContent={'center'}
                    margin={'auto'}
                    marginTop={5}
                    boxShadow='10px 10px 20px #ccc'
                    padding={3}
                    borderRadius={5}
                >
                    <Typography variant='h4' textTransform={'uppercase'} padding={3} textAlign={'center'}>Register</Typography>
                    <TextField
                        placeholder='name'
                        name='name'
                        value={inputs.name}
                        onChange={handlechange}
                        margin='normal'
                        type='text'
                        required
                    />
                    <TextField
                        placeholder='Email'
                        name='email'
                        value={inputs.email}
                        onChange={handlechange}
                        margin='normal'
                        type='text'
                        required
                    />
                    <TextField
                        placeholder='Password'
                        name='password'
                        value={inputs.password}
                        onChange={handlechange}
                        margin='normal'
                        type='password'
                        required
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        sx={{ borderRadius: 3, marginTop: 3 }}
                    >Submit</Button>
                    <Button
                        onClick={() => navigate("/login")}
                        sx={{ borderRadius: 3, marginTop: 3 }}
                    >Already Registerd ? || Login </Button>
                </Box>

            </form>
        </>
    )
}

export default Register
