import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../../App';
import axios from 'axios';

export const createRecruitURL = url + '/api/v1/recruit/new';
export const ParticipateRecruitAPI = url + '/api/v1/order';
// AsyncStorge에 저장한 JWT token을 받아옴
export const getJWTToken = async () => {
  const JWTAccessToken = await AsyncStorage.getItem(
    '@BaedalMate_JWTAccessToken',
  );
  return String(JWTAccessToken);
};

export const formPrice = (text: number) => {
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

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

export const postParticipateRecruitAPI = async (
  menu: menuI[],
  recruitId: number,
) => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = await axios
      .post(
        ParticipateRecruitAPI,
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
