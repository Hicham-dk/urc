import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userInfosSelector } from '../features/loginSlice';
import MessageList from './messages/getMessages';
import AddMessage from './messages/addMessage';
import Box from '@mui/material/Box';
import {  useParams } from 'react-router-dom';

const Chats = () => {
    const { receiverId, receiverName } = useParams();
    const userInfos = useSelector(userInfosSelector);

    useEffect(() => {
        console.log(userInfos);
    }, [userInfos, receiverId]);



    return (
        <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Box component="main" sx={{ p: 3, maxWidth: '400px', margin: '0 auto' }}>
                <MessageList receiverId={Number(receiverId)} receiverName={String(receiverName)} />
                <AddMessage receiverId={Number(receiverId)} />
            </Box>
        </Box>
    );
};

export default Chats;
