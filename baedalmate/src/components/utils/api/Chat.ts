import {url} from '../../../../App';
import axios from 'axios';
import {getJWTToken} from './Recruit';

export interface eachChatRoomI {
  chatRoomId: number;
  image: string;
  lastMessage: {
    message: string;
    messageId: number;
    sendDate: string;
    sender: string;
    senderId: number;
    senderImage: string;
  };
  title: string;
}
export interface chatRoomListI {
  rooms: eachChatRoomI[];
}

export interface messageI {
  messageId: number;
  senderId: number;
  sender: string;
  senderImage: string;
  message: string;
  sendDate: string;
  // type: 'TALK' | 'ENTER';
}

export interface recruitI {
  recruitId: number;
  recruitImage: string;
  createDate: string;
  title: string;
  criteria: string;
  minPrice: number;
  minPeople: number;
  currentPeople?: number;
  currentPrice?: number;
  deadlineDate: string;
  deactivateDate?: string;
  active: boolean;
  cancel: boolean;
  fail: boolean;
  // coupon: number;
  // currentPeople: number;
  // currentPrice: number;
  // description: string;
  // dormitory: string;
  // host: boolean;
  // participants: boolean;
  // place: placeI;
  // platform: string;
  // profileImage: string;
  // score: number;
  // shippingFee: number;
  // shippingFeeDetail: shippingFeeI[];
  // username: string;
}

export interface eachDetailChatRoomI {
  id: number;
  messages: messageI[];
  recruit: recruitI;
}
export interface participantI {
  nickname: string;
  profileImage: string;
  userId: number;
  block: boolean;
}
export interface recruitParticipantsI {
  participants: participantI[];
  recruitId: number;
}
export interface eachMenuI {
  name: string;
  price: number;
  quantity: number;
}
export interface participantMenuPriceI {
  menu: eachMenuI[];
  userOrderTotal: number;
  userId: number;
}
export interface recruitMenuI {
  coupon: number;
  myOrderPrice: number;
  number: number;
  participants: participantMenuPriceI[];
  shippingFee: number;
  allOrderTotal: number;
}
export const chatRoomURL = url + '/api/v1/rooms';
export const eachChatRoomURL = url + `/api/v1/room/`;
export const chatRecruitURL = url + `/api/v1/recruit/`;
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
    (date.getMonth() + 1) +
    '월 ' +
    date.getDate() +
    '일';
  return dateText;
};
export const formDateWithTwoDigit = (time: string) => {
  let date = new Date(time);

  let dateText =
    date.getFullYear().toString().substring(2, 4) +
    '년 ' +
    (date.getMonth() + 1) +
    '월 ' +
    date.getDate() +
    '일';
  return dateText;
};

export const formDateWithDot = (time: string) => {
  let date = new Date(time);

  let dateText =
    date.getFullYear() +
    '.' +
    (date.getMonth() + 1) +
    '.' +
    date.getDate() +
    '';
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
export const formTime24 = (time: string) => {
  let date = new Date(time);

  let timeText =
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0');
  return timeText;
};
