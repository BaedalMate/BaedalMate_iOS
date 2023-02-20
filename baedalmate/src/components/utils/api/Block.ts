import {url} from '../../../../App';
import axios from 'axios';
import {getJWTToken} from './Recruit';
import {refreshAPI} from './Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const blockURL = url + '/api/v1/block';
export const unblockURL = url + '/api/v1/unblock';
export interface reviewEachUserI {
  score: number;
  userId: number;
}
export interface reviewI {
  recruitId: number;
  users: reviewEachUserI[];
}
export const getBlockUserListAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  try {
    const result = axios
      .get(blockURL, {
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
              getBlockUserListAPI();
            }
            return result.data.blockList;
          }
        }
        return response.data.blockList;
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

export const postBlockAPI = async (userId: number) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = axios
      .post(
        blockURL,
        {userId},
        {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
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
              getBlockUserListAPI();
            }
            return result.data;
          }
        }
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

export const postUnBlockAPI = async (userId: number) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = axios
      .post(
        unblockURL,
        {userId},
        {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
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
              postUnBlockAPI(userId);
            }
            return result.data;
          }
        }
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
