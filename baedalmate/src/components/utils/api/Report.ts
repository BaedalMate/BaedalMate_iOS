import {url} from '../../../../App';
import axios from 'axios';
import {getJWTToken} from './Recruit';

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
      .then(function (response) {
        console.log(response);
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

export const postReportRecruitAPI = async (
  targetRecruitId: number,
  reason: string,
  detail: string,
) => {
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
      .then(function (response) {
        console.log(response);
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
