import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../../App';
import axios from 'axios';
import {getJWTToken, placeI, shippingFeeI} from './Main';

export interface eachChatRoomI {
  id: number;
  image: string;
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
  sender: string;
  senderId: number;
  sendDate: string;
  senderImage: string;
}

export interface recruitI {
  active: boolean;
  cancel: boolean;
  criteria: string;
  coupon: number;
  currentPeople: number;
  currentPrice: number;
  deadlineDate: string;
  description: string;
  dormitory: string;
  host: boolean;
  image: string;
  minPeople: number;
  minPrice: number;
  participage: boolean;
  place: placeI;
  platform: string;
  profileImage: string;
  recruitId: number;
  score: number;
  shippingFee: number;
  shippingFeeDetail: shippingFeeI[];
  title: string;
  username: string;
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

// export const formTime = (time) => {
//   return
// }

export const formDate = (time: string) => {
  let date = new Date(time);

  let dateText =
    date.getFullYear() +
    '년 ' +
    date.getMonth() +
    '월 ' +
    date.getDate() +
    '일';
  return dateText;
};

export const formTime = (time: string) => {
  let date = new Date(time);

  let timeText =
    (date.getHours() < 12 ? '오전 ' : '오후 ') +
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0');
  return timeText;
};
