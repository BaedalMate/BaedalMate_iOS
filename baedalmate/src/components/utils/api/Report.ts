import {url} from '../../../../App';
import axios from 'axios';
import {getJWTToken} from './Recruit';
import {useRecoilState} from 'recoil';
// import {JWTAccessTokenState, JWTRefreshTokenState} from '../recoil/atoms/User';
import {refreshAPI} from './Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const reportURL = url + '/api/v1/report';
export const reportUserURL = reportURL + '/user';
export const reportRecruitURL = reportURL + '/recruit';

export interface reportI {
  targetUserId: number;
  reason: string;
  detail: string;
}
export interface reportRecruitI {
  targetRecruitId: number;
  reason: string;
  detail: string;
}

export const postReportUserAPI = async (
  targetUserId: number,
  reason: string,
  detail: string,
) => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = axios
      .post(
        reportUserURL,
        {targetUserId, reason, detail},
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
              postReportUserAPI(targetUserId, reason, detail);
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
              postReportUserAPI(targetUserId, reason, detail);
            }
            return result;
          }
        }
        return error;
      });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postReportRecruitAPI = async (
  targetRecruitId: number,
  reason: string,
  detail: string,
) => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = axios
      .post(
        reportRecruitURL,
        {targetRecruitId, reason, detail},
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
              postReportRecruitAPI(targetRecruitId, reason, detail);
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
              postReportRecruitAPI(targetRecruitId, reason, detail);
            }
            return result;
          }
        }
        return error;
      });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
