import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../../../App';
import axios from 'axios';
import {useRecoilState} from 'recoil';
// import {JWTAccessTokenState, JWTRefreshTokenState} from '../recoil/atoms/User';
import {refreshAPI} from './Login';
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
  // coupon: number;
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
  shippingFee: number;
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
  shippingFee: number;
  // coupon: number;
  platform: string;
  deadlineDate: string;
  title: string;
  description: string;
  freeShipping: boolean;
  menu: menuI[];
  tags: tagI[];
}
export const postRecruitAPI = async data => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = await axios
      .post(createRecruitURL, data, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
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
              postRecruitAPI(data);
            }
            return result;
          }
        }
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
export const updateRecruitAPI = async (recruidId, data) => {
  const JWTAccessToken = await getJWTToken();
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  console.log(JWTAccessToken);
  try {
    const result = await axios
      .put(recruitURL + `/${recruidId}`, data, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
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
              updateRecruitAPI(recruidId, data);
            }
            return result.data;
          }
        }
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
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.get<detailRecruitI>(recruitURL + `/${id}/detail`, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
  });

  console.log(result);
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
        getRecruitDetailDataForUpdateAPI(id);
      }
      return result.data;
    }
  }
  return result.data;
};

export const cancelRecruitAPI = async (id: number) => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.get(cancelRecruitURL + `/${id}`, {
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
        cancelRecruitAPI(id);
      }
      return result.data;
    }
  }
  return result.data;
};
export const closeRecruitAPI = async (id: number) => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.get(closeRecruitURL + `/${id}`, {
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
        closeRecruitAPI(id);
      }
      return result.data;
    }
  }
  return result.data;
};

export const postParticipateRecruitAPI = async (
  menu: menuI[],
  recruitId: number,
) => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
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
      .then(async function (response) {
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
              postParticipateRecruitAPI(menu, recruitId);
            }
            return result;
          }
        }
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
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
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
      .then(async function (response) {
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
              updateParticipateRecruitAPI(menu, recruitId);
            }
            return result;
          }
        }
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
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  const result = await axios.delete(ParticipateRecruitURL, {
    data: {recruitId},
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
        deleteRecruitOrderAPI(recruitId);
      }
      return result.data;
    }
  }
  return result.data;
};

export const searchRecruitAPI = async (keyword: string) => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const JWTAccessToken = await getJWTToken();
  const result = await axios.get(searchRecruitURL, {
    headers: {
      Authorization: 'Bearer ' + JWTAccessToken,
    },
    params: {
      keyword,
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
        searchRecruitAPI(keyword);
      }
      return result.data;
    }
  }
  return result.data;
};

export const getUserMenuAPI = async (recruitId: number) => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const result = axios
      .get(recruitURL + '/' + recruitId + '/my-menu', {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
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
              getUserMenuAPI(recruitId);
            }
            return result.data;
          }
        }
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
