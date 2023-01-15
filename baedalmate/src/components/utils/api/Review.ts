import {url} from '../../../../App';
import axios from 'axios';
import {getJWTToken} from './Recruit';

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
  console.log(JWTAccessToken);
  const result = await axios.get(reviewURL + `/${id}/target`, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  return result;
};

export const postReviewAPI = async (reviewData: reviewI) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.post(reviewURL, reviewData, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  return result;
};
