import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const router = useRouter()
    const [userLogged, setuserLogged] = useState()
    const usersFunc = async () => {
        let data = JSON.parse(localStorage.getItem('id'));
        console.log(data)
        setuserLogged(data)
        if (!data){
            router.push("/")
        }
    }
    useEffect(() => {
        usersFunc()
    }, []);
    const logoutHandler = () => {
        localStorage.removeItem('id')
        router.push("/")
    }
    return (
        <div >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{backgroundColor: '#e6af2f'}}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            HELLO {userLogged?.username}!
                        </Typography>
                        <Link href="/crud/apoteker" passHref>
                            <Typography variant="h7" component="div" sx={{ flexGrow: 1, ":hover":{cursor: 'pointer'} }}>
                                Apoteker
                            </Typography>
                        </Link>
                        <Link href="/crud/obatmasuk" passHref>
                            <Button variant="h7" sx={{ flexGrow: 1 }}>
                                Medicine-In
                            </Button>
                        </Link>
                        <Link href="/crud/obatkeluar" passHref>
                            <Button variant="h7" sx={{ flexGrow: 1 }}>
                                Medicine-Out
                            </Button>
                        </Link>
                        <Link href="/crud/report" passHref>
                            <Button variant="h7" sx={{ flexGrow: 1 }}>
                                Report
                            </Button>
                        </Link>
                        
                        <Button onClick={logoutHandler} color="inherit" variant='outlined'>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header