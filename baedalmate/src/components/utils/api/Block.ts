import {url} from '../../../../App';
import axios from 'axios';
import {getJWTToken} from './Recruit';

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
  console.log(JWTAccessToken);
  try {
    const result = axios
      .get(blockURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
      .then(function (response) {
        console.log(response);
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
  const result = await axios.post(blockURL, userId, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  return result;
};

export const postUnBlockAPI = async (userId: number) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.post(unblockURL, userId, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  return result;
};
