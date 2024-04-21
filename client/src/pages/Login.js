import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/Store.js'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({

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
            const { data } = await axios.post('/api/v1/user/loginuser', { email: inputs.email, password: inputs.password })
            if (data.success) {
                localStorage.setItem('userId', data?.user._id)
                dispatch(authActions.login())
                navigate("/")
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
                    <Typography variant='h4' textTransform={'uppercase'} padding={3} textAlign={'center'}>Login</Typography>

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

                </Box>

            </form>
        </>
    )
}

export default Login
