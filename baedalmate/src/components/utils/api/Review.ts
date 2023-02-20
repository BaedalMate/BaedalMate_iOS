import {url} from '../../../../App';
import axios from 'axios';
import {getJWTToken} from './Recruit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshAPI} from './Login';
import {useRecoilState} from 'recoil';
// import {JWTAccessTokenState, JWTRefreshTokenState} from '../recoil/atoms/User';

export const reviewURL = url + '/api/v1/review';
export interface reviewEachUserI {
  score: number;
  userId: number;
}
export interface reviewI {
  recruitId: number;
  users: reviewEachUserI[];
}
export const getReviewParticipantsAPI = async (id: number) => {
  const JWTAccessToken = await getJWTToken();
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  console.log(JWTAccessToken);
  const result = await axios.get(reviewURL + `/${id}/target`, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  if (result.status === 401) {
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
        getReviewParticipantsAPI(id);
      }
      return result;
    }
  }
  return result;
};

export const postReviewAPI = async (reviewData: reviewI) => {
  const JWTAccessToken = await getJWTToken();
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  console.log(JWTAccessToken);
  const result = await axios.post(reviewURL, reviewData, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  if (result.status === 401) {
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
        postReviewAPI(reviewData);
      }
      return result;
    }
  }
  return result;
};
