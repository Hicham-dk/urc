import {CustomError} from "./CustomError";
import moment from 'moment';
export const formatTimestamp = (timestamp: EpochTimeStamp) => {
    return moment(timestamp).format('DD/MM/YYYY HH:mm');
  };

export const AUTHENT_HEADER = "Authentication";
export const BEARER = "Bearer ";

export interface User {
    user_id: number;
    username: string;
    email?: string;
    password: string;
    last_login?: string;
    external_id?: string;
}

export interface Session {
    token: string;
    username?: string;
    id?: number;
    externalId: string;
}

export interface EmptyCallback {
    (): void;
}

export interface SessionCallback {
    (session: Session): void;
}

export interface ErrorCallback {
    (error: CustomError): void;
}

export interface Account {
    username: string;
    email?: string;
    password: string;
}
export interface UserInfos {
    username: string;
    userId : number;
    last_login?: EpochTimeStamp;
}
export interface Message {
    senderId: number;
    receiverId: number;
    messageContent: string;
    timestamp?: EpochTimeStamp;
    senderName: string;
}
export interface MessageInfos {
    senderId: number;
    receiverId: number;
}
export interface Room {
    room_id: number;
    name: string;
    created_on?: string;
}
export interface Callback<T> {
    (result: T): void;
}