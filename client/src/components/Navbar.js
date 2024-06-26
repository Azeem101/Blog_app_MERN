import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from "@mui/material"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/Store'
const Navbar = () => {
    const isLogin = useSelector((state) => state.isLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handLogOut = () => {
        try {
            dispatch(authActions.logout())
            alert("Logout Successfully")
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    const [value, setValue] = useState()
    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h4'>
                        My Blog App
                    </Typography>
                    {isLogin && (
                        <Box display={'flex'} margin='auto' marginRight='auto'>
                            <Tabs textColor='inherit' value={value} onChange={(e, val) => { setValue(val) }}>
                                <Tab label='Blogs' LinkComponent={Link} to='/blogs' />
                                <Tab label='My Blogs' LinkComponent={Link} to='/my-blogs' />

                                <Tab label='Create Blog' LinkComponent={Link} to='/create-blogs' />
                            </Tabs>
                        </Box>

                    )}

                    <Box display={'flex'} marginLeft={'auto'}>
                        {!isLogin && (
                            <>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/login'>Login</Button>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/register'>Register</Button>

                            </>
                        )}
                        {isLogin && (
                            <>
                                <Button onClick={handLogOut} sx={{ margin: 1, color: 'white' }}>Log Out</Button>

                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
