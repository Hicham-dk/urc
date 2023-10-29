import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userInfosSelector } from '../features/loginSlice';
import GetUser from './allUser/getUser';
import { messageReceiverSelector } from '../features/messageSlice';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { CssBaseline, IconButton, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setLogout } from '../features/loginSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const receiverId = useSelector(messageReceiverSelector);
    const userInfos = useSelector(userInfosSelector);

    useEffect(() => {
        console.log(userInfos);
    }, [userInfos, receiverId]);

    const drawerWidth1 = 300;
    const handleLogout = () => {
        dispatch(setLogout());
        navigate('/');
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Drawer
                    sx={{
                        width: drawerWidth1,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth1,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >

                    <Divider />
                    <List>
                        <ListItem key="s" disablePadding>
                            {}
                            <Box sx={{ backgroundColor: '#f0f0f0', padding:10, borderRadius: 2 }}>
                                <GetUser />
                            </Box>
                        </ListItem>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                        width: '100%',
                    }}
                >
                    {/* Bouton de déconnexion en haut à droite */}
                    <IconButton
                        sx={{ position: 'absolute', top: 10, right: 10 }}
                        onClick={handleLogout}
                    >
                        <Logout />
                    </IconButton>

                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                        Démarrez une discussion
                    </Typography>

                    <Divider sx={{ width: '100%' }} />
                </Box>
            </Box>
        </>
    );
};

export default Home;
