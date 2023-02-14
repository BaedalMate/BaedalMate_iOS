import axios from 'axios';
import {getJWTToken} from './Recruit';
import {FCMURL, url} from '../../../../App';
import {getUniqueId} from 'react-native-device-info';

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

export const getNotificationAllowAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  const uniqueId = await getUniqueId();

  try {
    const result = axios
      .get(FCMURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
          'Device-Code': uniqueId,
        },
      })
      .then(function (response) {
        console.log(response);
        return response.data;
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

export const putNotificationAllowAPI = async ({
  allow_chat,
  allow_recruit,
}: {
  allow_chat?: boolean;
  allow_recruit?: boolean;
}) => {
  const JWTAccessToken = await getJWTToken();
  const uniqueId = await getUniqueId();

  try {
    const result = axios
      .put(
        FCMURL,
        {},
        {
          params: {allow_chat, allow_recruit},
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
            'Device-Code': uniqueId,
          },
        },
      )
      .then(function (response) {
        console.log(response);
        return response.data;
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
