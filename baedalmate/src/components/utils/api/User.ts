import axios from 'axios';
import {userURL} from 'components/pages/Main';
import {getJWTToken} from './Recruit';
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface UserInfoI {
  nickname: string;
  profileImage: string;
  score: number;
  userDormitory: string;
  userId: number;
}
const participatedRecruitURL = userURL + '/participated-recruit';
const hostedRecruitURL = userURL + '/hosted-recruit';
// User Api 를 받아옴
export const getUserAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  try {
    const UserData = axios
      .get(userURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
      .then(function (response) {
        console.log(response);
        // AsyncStorage에 유저 이름과 배달 거점 저장
        AsyncStorage.setItem('@BaedalMate_UserName', response.data.nickname);
        AsyncStorage.setItem('@BaedalMate_Dormitory', response.data.dormitory);
        AsyncStorage.setItem(
          '@BaedalMate_UserId',
          response.data.userId.toString(),
        );

        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
    return UserData;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getParticipatedRecruitAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  try {
    const result = axios
      .get(participatedRecruitURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
      .then(function (response) {
        console.log(response);

        return response.data.recruitList;
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

export const getHostedRecruitAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  try {
    const result = axios
      .get(hostedRecruitURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
      .then(function (response) {
        console.log(response);

        return response.data.recruitList;
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
