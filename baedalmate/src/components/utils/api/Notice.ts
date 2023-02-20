import axios from 'axios';
import {getJWTToken} from './Recruit';
import {url} from '../../../../App';
import {refreshAPI} from './Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const noticeURL = url + '/api/v1/notice';

export interface noticeListI {
  id: number;
  title: string;
  createDate: string;
}

export interface detailNoticeI {
  title: string;
  description: string;
  createDate: string;
}

export const getNoticeListAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  try {
    const result = axios
      .get(noticeURL, {
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
              getNoticeListAPI();
            }
            return result.data.noticeList;
          }
        }
        return response.data.noticeList;
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
              getNoticeListAPI();
            }
            return result.data.noticeList;
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

export const getDetailNoticeAPI = async id => {
  const JWTAccessToken = await getJWTToken();
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  try {
    const result = axios
      .get(noticeURL + `/${id}`, {
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
              getDetailNoticeAPI(id);
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
              getDetailNoticeAPI(id);
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
