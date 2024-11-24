/*import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfosSelector, setLogout } from '../features/loginSlice';
import GetUser from './listUser';
import GetRoom from './GroupChatList';
import MessageList from './messages/getMessages';
import AddMessage from './messages/addMessage';
import { CssBaseline, IconButton, Typography, Box, Drawer, List, Divider, ListItem, Paper } from '@mui/material'; // <-- Added Paper import
import { Logout } from '@mui/icons-material';
import { AppDispatch } from '../app/store';
import { messageReceiverSelector } from '../features/messageSlice';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userInfos = useSelector(userInfosSelector);
    const receiver = useSelector(messageReceiverSelector);
    const [receiverId, setReceiverId] = useState<number | null>(null);
    const [receiverName, setReceiverName] = useState<string>('');
    const [receiverType, setReceiverType] = useState<'user' | 'group' | null>(null);

    const drawerWidth1 = 280;

    useEffect(() => {
        console.log(userInfos);
    }, [userInfos]);

    // Fonction de déconnexion
    const handleLogout = () => {
        dispatch(setLogout());
    };

   // Mettre à jour handleUserClick pour gérer aussi le type de receiver
const handleUserClick = (id: number, name: string, type: 'user' | 'group') => {
    setReceiverId(id);
    setReceiverName(name);
    setReceiverType(type); // Nouvel état pour le type de receiver
};


    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth1,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth1,
                        boxSizing: 'border-box',
                        backgroundColor: '#fff', // Blanc
                        color: '#000', // Noir pour le texte
                        borderRadius: '0 15px 15px 0',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Box sx={{ p: 2, textAlign: 'center', backgroundColor: '#0000FF', color: '#fff', borderRadius: '0 15px 0 0' }}>
                    <Typography variant="h6" noWrap>
                        UBO RELAY CHAT
                    </Typography>
                </Box>

                <Divider sx={{ bgcolor: 'rgba(0,0,0,0.2)' }} />

                <List>
                    <ListItem disablePadding>
                        <Box sx={{ padding: 2 }}>
                        <GetUser onUserClick={(id, name) => handleUserClick(id, name, 'user')} />
                        <GetRoom onUserClick={(id, name) => handleUserClick(id, name, 'group')} />

                        </Box>
                    </ListItem>
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: `calc(100% - ${drawerWidth1}px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    backgroundColor: '#fff', // Blanc
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: '#ff5722',
                        color: '#fff',
                        '&:hover': { bgcolor: '#e64a19' },
                    }}
                    onClick={handleLogout}
                >
                    <Logout />
                </IconButton>

                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2, color: '#0000FF' }}>
                    Bienvenue dans le chat
                </Typography>

                <Divider sx={{ my: 3, bgcolor: 'rgba(0,0,0,0.2)' }} />

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {receiverId ? (
                        <Box sx={{ width: '100%', maxWidth: 800 }}>
                            
                            <Paper sx={{ p: 2, marginBottom: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <MessageList receiverId={receiverId} receiverName={receiverName} receiverType={receiverType} />
                            </Paper>
                            <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <AddMessage receiverId={receiverId} receiverType={receiverType} />
                            </Paper>
                        </Box>
                    ) : (
                        <Typography>Pas encore de conversation sélectionnée.</Typography>
                    )}
                </Box>
            </Box>  
        </Box>
    );
};

export default Home;*/
import React from 'react';
import { CssBaseline, Box, Drawer, Typography, List, ListItem, IconButton, AppBar, Toolbar, Paper, Avatar, Badge, Divider } from '@mui/material';
import { Logout, Chat, Group, Person } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { userInfosSelector, setLogout } from '../features/loginSlice';
import { messageReceiverSelector } from '../features/messageSlice';
import GetUser from './listUser';
import GetRoom from './GroupChatList';
import MessageList from './messages/getMessages';
import AddMessage from './messages/addMessage';
import { AppDispatch } from '../app/store';
import { useNavigate } from 'react-router';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userInfos = useSelector(userInfosSelector);
    const receiver = useSelector(messageReceiverSelector);
    const drawerWidth = 320;
const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(setLogout());
        navigate("/")
    };

    const [receiverId, setReceiverId] = React.useState<number | null>(null);
    const [receiverName, setReceiverName] = React.useState<string>('');
    const [receiverType, setReceiverType] = React.useState<'user' | 'group' | null>(null);

    const handleUserClick = (id: number, name: string, type: 'user' | 'group') => {
        setReceiverId(id);
        setReceiverName(name);
        setReceiverType(type);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb' }}>
            <CssBaseline />
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#1c1f26',
                        color: '#ffffff',
                        borderRight: 'none',
                    },
                }}
            >
                <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid #383d46' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4fc3f7' }}>
                        UBO Relay Chat
                    </Typography>
                </Box>
                <Divider sx={{ borderColor: '#383d46' }} />
                <List sx={{ p: 2 }}>
                    <ListItem disablePadding sx={{ mb: 2 }}>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#b0bec5' }}>Utilisateurs</Typography>
                            <GetUser onUserClick={(id, name) => handleUserClick(id, name, 'user')} />
                        </Box>
                    </ListItem>
                    <ListItem disablePadding>
                        <Box>
                            <Typography variant="caption" sx={{ color: '#b0bec5' }}>Groupes</Typography>
                            <GetRoom onUserClick={(id, name) => handleUserClick(id, name, 'group')} />
                        </Box>
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb', p: 2 }}>
                {/* Header */}
                <AppBar
                    position="static"
                    sx={{
                        backgroundColor: '#ffffff',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
                        borderRadius: '12px',
                    }}
                >
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1c1f26' }}>
                            Bienvenue, {userInfos.username || 'Utilisateur'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Badge badgeContent={receiverId ? 1 : 0} color="error">
                                <Avatar sx={{ bgcolor: '#4fc3f7' }}>
                                    {userInfos.username?.charAt(0).toUpperCase() || 'U'}
                                </Avatar>
                            </Badge>
                            <IconButton
                                sx={{
                                    backgroundColor: '#ef5350',
                                    color: '#ffffff',
                                    '&:hover': { backgroundColor: '#d32f2f' },
                                }}
                                onClick={handleLogout}
                            >
                                <Logout />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Chat Section */}
                <Box
                    sx={{
                        flex: 1,
                        p: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 4,
                        flexDirection: 'column',
                    }}
                >
                    {receiverId ? (
                        <Box sx={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    backgroundColor: '#ffffff',
                                    borderRadius: '16px',
                                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <MessageList
                                    receiverId={receiverId}
                                    receiverName={receiverName}
                                    receiverType={receiverType}
                                />
                            </Paper>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '16px',
                                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <AddMessage receiverId={receiverId} receiverType={receiverType} />
                            </Paper>
                        </Box>
                    ) : (
                        <Typography variant="h5" sx={{ color: '#b0bec5', textAlign: 'center' }}>
                            Sélectionnez une conversation pour commencer
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
