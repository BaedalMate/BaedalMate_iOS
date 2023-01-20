import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../../../App';
import axios from 'axios';
export const cancelRecruitURL = url + '/api/v1/recruit/cancel';
export const closeRecruitURL = url + '/api/v1/recruit/close';
export const createRecruitURL = url + '/api/v1/recruit/new';
export const ParticipateRecruitURL = url + '/api/v1/order';
export const searchRecruitURL = url + '/api/v1/recruit/search';
export const recruitURL = url + '/api/v1/recruit';
// AsyncStorge에 저장한 JWT token을 받아옴
export const getJWTToken = async () => {
  const JWTAccessToken = await AsyncStorage.getItem(
    '@BaedalMate_JWTAccessToken',
  );
  return await String(JWTAccessToken);
};

export const getJWTRefreshToken = async () => {
  const JWTRefreshToken = await AsyncStorage.getItem(
    '@BaedalMate_JWTRefreshToken',
  );

  return String(JWTRefreshToken);
};

export const formPrice = (text: number | undefined) => {
  return text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const formDigitTwo = (text: number | undefined) => {
  return text?.toString().padStart(2, '0');
};
export interface userMenuI {
  menu: menuI[];
  userId: number;
  userOrderTotal: number;
}
export interface menuI {
  name: string;
  price: number;
  quantity: number;
}

export interface placeI {
  addressName: string;
  name: string;
  roadAddressName: string;
  x: number;
  y: number;
}

export interface shippingFeeI {
  lowerPrice: number;
  shippingFee: number;
  upperPrice: number;
}

export interface tagI {
  tagname: string;
}

export interface postRecruitI {
  categoryId: number;
  coupon: number;
  criteria: string;
  deadlineDate: string;
  description: string;
  dormitory: string;
  freeShipping: boolean;
  menu: menuI[];
  minPeople: number;
  minPrice: number;
  place: placeI;
  platform: string;
  shippingFee: shippingFeeI[];
  tags: tagI[];
  title: string;
}
export const postRecruitAPI = async (
  categoryId: number,
  coupon: number,
  criteria: string,
  deadlineDate: string,
  description: string,
  dormitory: string,
  freeShipping: boolean,
  menu: menuI[],
  minPeople: number,
  minPrice: number,
  place: placeI,
  platform: string,
  shippingFee: shippingFeeI[],
  tags: tagI[],
  title: string,
) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = await axios
      .post(
        createRecruitURL,
        {
          categoryId,
          coupon,
          criteria,
          deadlineDate,
          description,
          dormitory,
          freeShipping,
          menu,
          minPeople,
          minPrice,
          place,
          platform,
          shippingFee,
          tags,
          title,
        },
        {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        },
      )
      .then(function (response) {
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

export const cancelRecruitAPI = async (id: number) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.get(cancelRecruitURL + `/${id}`, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  return result.data;
};
export const closeRecruitAPI = async (id: number) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.get(closeRecruitURL + `/${id}`, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  return result.data;
};

export const postParticipateRecruitAPI = async (
  menu: menuI[],
  recruitId: number,
) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = await axios
      .post(
        ParticipateRecruitURL,
        {
          menu,
          recruitId,
        },
        {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        },
      )
      .then(function (response) {
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

export const updateParticipateRecruitAPI = async (
  menu: menuI[],
  recruitId: number,
) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = await axios
      .put(
        ParticipateRecruitURL,
        {
          menu,
          recruitId,
        },
        {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        },
      )
      .then(function (response) {
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

export const deleteRecruitOrderAPI = async (recruitId: number) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.delete(ParticipateRecruitURL, {
    data: {recruitId},
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  return result.data;
};

export const searchRecruitAPI = async (keyword: string) => {
  const JWTAccessToken = await getJWTToken();
  const result = await axios.get(searchRecruitURL, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
    params: {
      keyword,
    },
  });
  return result.data;
};

export const getUserMenuAPI = async (recruitId: number) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = axios
      .get(recruitURL + '/' + recruitId + '/my-menu', {
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
