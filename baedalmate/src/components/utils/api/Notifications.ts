import axios from 'axios';
import {getJWTToken} from './Recruit';
import {url} from '../../../../App';

export const notificationURL = url + '/api/v1/notification';
export interface notificationsProps {
  title: string;
  body: string;
  image: string;
  chatRoomId: number;
  createDate: string;
}
export const getNotificationAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  try {
    const result = axios
      .get(notificationURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
      .then(function (response) {
        console.log(response);

        return response.data.notifications;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
