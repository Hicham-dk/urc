/*import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userInfosSelector } from '../../features/loginSlice';
import { CustomError } from '../../model/CustomError';
import { Message } from '../../model/common';
import { addMessage } from './addMessagesAPI';
import { Grid, TextField, IconButton } from '@mui/material';
import { setnewMSG } from '../../features/messageSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import SendIcon from '@mui/icons-material/Send';

const AddMessage: React.FC<{ receiverId: number }> = ({ receiverId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userInfos = useSelector(userInfosSelector);
    const [messageSent, setMessageSent] = useState('');
    const [error, setError] = useState({} as CustomError);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageSent(e.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (receiverId !== -1) {
            const message: Message = {
                senderId: userInfos.userId,
                receiverId: receiverId,
                messageContent: messageSent,
                senderName: userInfos.username,
            };
            addMessage(
                message,
                (result: boolean) => {
                    if (result === true) {
                        dispatch(setnewMSG());
                        setMessageSent('');
                        setError(new CustomError(''));
                    } else {
                        console.error('La création de message a échoué.');
                    }
                },
                (messageError: CustomError) => {
                    console.log(messageError);
                    setError(messageError);
                }
            );
        }
    };

    return (
        <Grid container alignItems="center" justifyContent="center" >
            <Grid item xs={11}>
                <TextField
                    name="messageSent"
                    label="Message"
                    placeholder="Saisissez votre message"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={messageSent}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    multiline
                    maxRows={2}
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton
                    type="submit"
                    color="primary"
                    aria-label="send"
                    onClick={handleSubmit}
                >
                    <SendIcon />
                </IconButton>
            </Grid>
            {error.message && <span>{error.message}</span>}
        </Grid>
    );
};

export default AddMessage;*/
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfosSelector } from '../../features/loginSlice';
import { CustomError } from '../../model/CustomError';
import { Message } from '../../model/common';
import { addMessage } from './addMessagesAPI';
import { Grid, TextField, IconButton, Paper, Alert } from '@mui/material';
import { setnewMSG } from '../../features/messageSlice';
import { AppDispatch } from '../../app/store';
import SendIcon from '@mui/icons-material/Send';

const AddMessage: React.FC<{ receiverId: number, receiverType:'user' | 'group' | null}> = ({ receiverId,receiverType }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userInfos = useSelector(userInfosSelector);
    const [messageSent, setMessageSent] = useState('');
    const [error, setError] = useState({} as CustomError);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageSent(e.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (receiverId !== -1) {
            const message: Message = {
                senderId: userInfos.userId,
                receiverId: receiverId,
                messageContent: messageSent,
                senderName: userInfos.username,
                receiverType: receiverType,  // Ajoutez cette valeur à l'objet message si nécessaire
            };
            addMessage(
                message,
                (result: boolean) => {
                    if (result === true) {
                        dispatch(setnewMSG());
                        setMessageSent('');
                        setError(new CustomError(''));
                    } else {
                        console.error('La création de message a échoué.');
                    }
                },
                (messageError: CustomError) => {
                    console.log(messageError);
                    setError(messageError);
                    }
                );
            }
        };

        return (
            <Paper elevation={6} sx={{ padding: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Grid container alignItems="center">
                    <Grid item xs={10} sx={{ paddingRight: 2 }}>
                        <TextField
                            name="messageSent"
                            label="Message"
                            placeholder="Saisissez votre message"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={messageSent}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                            multiline
                            maxRows={2}
                            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <IconButton
                            type="submit"
                            color="primary"
                            aria-label="send"
                            onClick={handleSubmit}
                            sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Grid>
                    {error.message && (
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Alert severity="error">{error.message}</Alert>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        );
    };
    export default AddMessage;