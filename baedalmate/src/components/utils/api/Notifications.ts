import axios from 'axios';
import {getJWTToken} from './Recruit';
import {FCMURL, url} from '../../../../App';
import {getUniqueId} from 'react-native-device-info';
import {refreshAPI} from './Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const notificationURL = url + '/api/v1/notification';
export interface notificationsProps {
  title: string;
  body: string;
  image: string;
  chatRoomId: number;
  createDate: string;
}
export const getNotificationAPI = async () => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const JWTAccessToken = await getJWTToken();
  try {
    const result = axios
      .get(notificationURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
      .then(async function (response) {
        console.log(response);
        if (response.status === 401) {
          const result = await refreshAPI();
          console.log(result);
          if (result.status == 200) {
            const tokens = await result.data;
            const token = tokens.accessToken;
            const refToken = tokens.refreshToken;
            AsyncStorage.multiSet([
              ['@BaedalMate_JWTAccessToken', token],
              ['@BaedalMate_JWTRefreshToken', refToken],
            ]);
            if (result.status === 200) {
              getNotificationAPI();
            }
            return result.data.notifications;
          }
        }
        return response.data.notifications;
      })
      .catch(async function (error) {
        if (error.response.status === 401) {
          const result = await refreshAPI();
          console.log(result);
          if (result.status == 200) {
            const tokens = await result.data;
            const token = tokens.accessToken;
            const refToken = tokens.refreshToken;
            AsyncStorage.multiSet([
              ['@BaedalMate_JWTAccessToken', token],
              ['@BaedalMate_JWTRefreshToken', refToken],
            ]);
            if (result.status === 200) {
              getNotificationAPI();
            }
            return result.data.notifications;
          }
        }
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
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const uniqueId = await getUniqueId();

  try {
    const result = axios
      .get(FCMURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
          'Device-Code': uniqueId,
        },
      })
      .then(async function (response) {
        console.log(response);
        if (response.status === 401) {
          const result = await refreshAPI();
          console.log(result);
          if (result.status == 200) {
            const tokens = await result.data;
            const token = tokens.accessToken;
            const refToken = tokens.refreshToken;
            AsyncStorage.multiSet([
              ['@BaedalMate_JWTAccessToken', token],
              ['@BaedalMate_JWTRefreshToken', refToken],
            ]);
            if (result.status === 200) {
              getNotificationAllowAPI();
            }
            return result.data;
          }
        }
        return response.data;
      })
      .catch(async function (error) {
        console.log(error);
        if (error.response.status === 401) {
          const result = await refreshAPI();
          console.log(result);
          if (result.status == 200) {
            const tokens = await result.data;
            const token = tokens.accessToken;
            const refToken = tokens.refreshToken;
            AsyncStorage.multiSet([
              ['@BaedalMate_JWTAccessToken', token],
              ['@BaedalMate_JWTRefreshToken', refToken],
            ]);
            if (result.status === 200) {
              getNotificationAllowAPI();
            }
            return result.data;
          }
        }
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
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
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
      .then(async function (response) {
        console.log(response);
        if (response.status === 401) {
          const result = await refreshAPI();
          console.log(result);
          if (result.status == 200) {
            const tokens = await result.data;
            const token = tokens.accessToken;
            const refToken = tokens.refreshToken;
            AsyncStorage.multiSet([
              ['@BaedalMate_JWTAccessToken', token],
              ['@BaedalMate_JWTRefreshToken', refToken],
            ]);

            if (result.status === 200) {
              putNotificationAllowAPI({
                allow_chat,
                allow_recruit,
              });
            }
            return result.data;
          }
        }
        return response.data;
      })
      .catch(async function (error) {
        console.log(error);
        if (error.response.status === 401) {
          const result = await refreshAPI();
          console.log(result);
          if (result.status == 200) {
            const tokens = await result.data;
            const token = tokens.accessToken;
            const refToken = tokens.refreshToken;
            AsyncStorage.multiSet([
              ['@BaedalMate_JWTAccessToken', token],
              ['@BaedalMate_JWTRefreshToken', refToken],
            ]);

            if (result.status === 200) {
              putNotificationAllowAPI({
                allow_chat,
                allow_recruit,
              });
            }
            return result.data;
          }
        }
        return false;
      });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
