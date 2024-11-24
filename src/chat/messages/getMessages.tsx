import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { userInfosSelector } from '../../features/loginSlice';
import { CustomError } from '../../model/CustomError';
import { MessageInfos, Message } from '../../model/common';
import { getMessage } from './getMessagesAPI';
import { newMSGSelector } from '../../features/messageSlice';
import { formatTimestamp } from '../../model/common';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material';

const MessageList: React.FC<{ receiverId: number, receiverName: string, receiverType: 'user' | 'group' | null }> = ({ receiverId, receiverName, receiverType }) => {
  const newMSGcounter = useSelector(newMSGSelector);
  const userInfos = useSelector(userInfosSelector);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [error, setError] = useState({} as CustomError);
  const [messageRecus, setMessageRecus] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const messageInfosEnvoyes = { senderId: userInfos.userId, receiverId, receiverType } as MessageInfos;
    const messageInfosRecus = { senderId: receiverId, receiverId: userInfos.userId, receiverType } as MessageInfos;

    getMessage(
      messageInfosEnvoyes,
      (resultEnvoyes: Message[]) => {
        setError(new CustomError(""));
        setMessageList(resultEnvoyes);
      },
      (loginError: CustomError) => {
        setError(loginError);
      }
    );

    getMessage(
      messageInfosRecus,
      (resultRecus: Message[]) => {
        setError(new CustomError(""));
        setMessageRecus(resultRecus);
      },
      (loginError: CustomError) => {
        setError(loginError);
      }
    );
  }, [userInfos.userId, receiverId, newMSGcounter]);

  const combinedMessages = [...messageList, ...messageRecus].sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
    return 0;
  });

  useEffect(() => {
    if (scrollRef.current && combinedMessages.length > 0) {
      const lastMessage = scrollRef.current.lastChild as HTMLDivElement;
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [combinedMessages]);

  return (
    <>
      <Box
        width={800}
        sx={{
          margin: 'auto',
          textAlign: 'center',
          padding: '16px',
          background: '#4fc3f7',
          borderRadius: '8px',
          color: '#fff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {receiverName}
        </Typography>
      </Box>
      <Box
        width={800}
        p={3}
        sx={{
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          margin: '16px auto',
          maxHeight: '70vh',
          overflowY: 'auto',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
        ref={scrollRef}
      >
        <List>
          {combinedMessages.length > 0 ? (
            combinedMessages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.senderId === userInfos.userId ? 'flex-end' : 'flex-start',
                  marginBottom: '16px',
                }}
              >
                <Paper
                  sx={{
                    padding: '12px 16px',
                    maxWidth: '70%',
                    backgroundColor: message.senderId === userInfos.userId ? '#4fc3f7' : '#004d40',
                    color: '#fff',
                    borderRadius: message.senderId === userInfos.userId ? '12px 12px 0 12px' : '12px 12px 12px 0',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <ListItemText primary={message.messageContent} sx={{ wordBreak: 'break-word' }} />
                </Paper>
                {message.timestamp && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#757575',
                      marginTop: '4px',
                      textAlign: message.senderId === userInfos.userId ? 'right' : 'left',
                    }}
                  >
                    {formatTimestamp(message.timestamp)}
                  </Typography>
                )}
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#757575' }}>
              Pas de Messages
            </Typography>
          )}
        </List>
        {error.message && (
          <Typography variant="body2" color="error" sx={{ textAlign: 'center', marginTop: '16px' }}>
            {error.message}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default MessageList;
