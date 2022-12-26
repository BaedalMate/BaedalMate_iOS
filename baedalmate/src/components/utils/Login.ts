import {url} from '../../../App';
import axios from 'axios';
import {getJWTRefreshToken, getJWTToken} from './Recruit';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const refreshURL = url + '/api/v1/refresh';

export const refreshAPI = async () => {
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
            'Refresh-Token': 'Bearer ' + JWTRefreshToken,
          },
        },
      )
      .then(function (response) {
        AsyncStorage.multiSet([
          ['@BaedalMate_JWTAccessToken', response.data.accessToken],
          ['@BaedalMate_JWTRefreshToken', response.data.refreshToken],
        ]);
        return response;
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
