import {url} from '../../../../App';
import axios from 'axios';
import {getJWTRefreshToken, getJWTToken} from './Recruit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUniqueId} from 'react-native-device-info';
import {useRecoilState} from 'recoil';
// import {JWTAccessTokenState, JWTRefreshTokenState} from '../recoil/atoms/User';
export const refreshURL = url + '/api/v1/refresh';
export const logoutURL = url + '/logout';
export const withdrawalURL = url + '/api/v1/user/withdrawal';

export const refreshAPI = async () => {
  // const [accesssToken, setJWTAccessToken] = useRecoilState(JWTAccessTokenState);
  // const [refreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);

  const JWTAccessToken = await getJWTToken();
  const JWTRefreshToken = await getJWTRefreshToken();
  console.log(JWTAccessToken);
  try {
    const result = await axios
      .post(
        refreshURL,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
            'Refresh-Token': JWTRefreshToken,
          },
        },
      )
      .then(function (response) {
        AsyncStorage.multiSet([
          ['@BaedalMate_JWTAccessToken', response.data.accessToken],
          ['@BaedalMate_JWTRefreshToken', response.data.refreshToken],
        ]);
        // setJWTAccessToken(response.data.accessToken);
        // setJWTRefreshToken(response.data.refreshToken);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logoutAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  const uniqueId = await getUniqueId();
  console.log(JWTAccessToken);
  try {
    const result = await axios
      .post(
        logoutURL,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
            'Device-Code': uniqueId,
          },
        },
      )
      .then(async function (response) {
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
              logoutAPI();
            }
            return result;
          }
        }
        return response;
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
              logoutAPI();
            }
            return result;
          }
        }

        return error;
      });
    return result;
  } catch (error: any) {
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
          logoutAPI();
        }
        return result;
      }
    }
    return error;
  }
};

export const withdrawalAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  const JWTRefreshToken = await getJWTRefreshToken();
  console.log(JWTAccessToken);
  try {
    const result = await axios
      .delete(withdrawalURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
          'Refresh-Token': 'Bearer ' + JWTRefreshToken,
        },
      })
      .then(async function (response) {
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
              withdrawalAPI();
            }
            return result;
          }
        }
        return response;
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
              withdrawalAPI();
            }
            return result;
          }
        }
        return error;
      });
    return result;
  } catch (error: any) {
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
          withdrawalAPI();
        }
        return result;
      }
    }
    return error;
  }
};

// axios.interceptors.request.use(async function (config) {
//   const accesssToken = await getJWTToken();
//   if (accesssToken) {
//     config.headers && config.headers['Authorization'] = 'Bearer ' + accesssToken;
//   }
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const {response: errorResponse} = error;
//     const originalRequest = error.config;

//     if (errorResponse.status === 401) {
//       return await refreshAPI();
//     }
//     // console.log(result);
//     // if (result.status === 200) return result;
//     return Promise.reject(error);
//   },
// );
