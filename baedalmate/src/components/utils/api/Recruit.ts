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

export const getFCMToken = async () => {
  const FCMToken = await AsyncStorage.getItem('@BaedalMate_FCMToken');
  return await String(FCMToken);
};
export const getAPNSToken = async () => {
  const FCMToken = await AsyncStorage.getItem('@BaedalMate_APNSToken');
  return await String(FCMToken);
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
  name: string;
  addressName: string;
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

export interface detailRecruitI {
  recruitId: number;
  categoryId: number;
  place: placeI;
  dormitory: string;
  criteria: string;
  minPrice: number;
  minPeople: number;
  shippingFee: shippingFeeI[];
  coupon: number;
  platform: string;
  deadlineDate: string;
  title: string;
  description: string;
  freeShipping: boolean;
  menu: menuI[];
  tags: tagI[];
}
export const postRecruitAPI = async data => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = await axios
      .post(createRecruitURL, data, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
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

export const getRecruitDetailDataForUpdateAPI = async id => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.get<detailRecruitI>(recruitURL + `/${id}/detail`, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });
  console.log(result);
  return result.data;
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
