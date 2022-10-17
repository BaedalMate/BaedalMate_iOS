import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../../App';
import axios from 'axios';
import {getJWTToken} from './Main';

export interface eachChatRoomI {
  id: number;
  lastMessage: {
    id: number;
    message: string;
    sendDate: string;
    sender: string;
  };
}
export interface chatRoomListI {
  rooms: eachChatRoomI[];
}

export interface messageI {
  id: number;
  message: string;
  sendDate: string;
  sender: string;
}

export interface recruitI {
  active: boolean;
  createDate: string;
  criteria: string;
  deadlineDate: string;
  minPeople: number;
  minPrice: number;
  recruitId: number;
  title: string;
}

export interface eachDetailChatRoomI {
  id: number;
  messages: messageI[];
  recruit: recruitI;
}

export const chatRoomURL = url + '/api/v1/rooms';
export const eachChatRoomURL = url + `/api/v1/room/`;
export const getChatRoomAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.get(chatRoomURL, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  return result;
};
