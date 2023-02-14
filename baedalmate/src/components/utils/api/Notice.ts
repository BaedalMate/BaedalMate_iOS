import axios from 'axios';
import {getJWTToken} from './Recruit';
import {url} from '../../../../App';
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
  try {
    const result = axios
      .get(noticeURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
      .then(function (response) {
        console.log(response);
        return response.data.noticeList;
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

export const getDetailNoticeAPI = async id => {
  const JWTAccessToken = await getJWTToken();
  try {
    const result = axios
      .get(noticeURL + `/${id}`, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
      .then(function (response) {
        console.log(response);
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
