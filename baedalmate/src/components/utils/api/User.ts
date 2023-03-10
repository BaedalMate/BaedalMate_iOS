import axios from 'axios';
import {userURL} from 'components/pages/Main';
import {getJWTToken} from './Recruit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshAPI} from './Login';
import {Platform} from 'react-native';

export interface UserInfoI {
  userId: number;
  nickname: string;
  profileImage: string;
  dormitory: string;
  score: number;
}
const participatedRecruitURL = userURL + '/participated-recruit';
const hostedRecruitURL = userURL + '/hosted-recruit';
const updateUserInfoURL = userURL;

// User Api 를 받아옴
export const getUserAPI = async () => {
  const JWTAccessToken = await getJWTToken();
  console.log(JWTAccessToken);
  try {
    const UserData = axios
      .get(userURL, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      })
      .then(async function (response) {
        console.log(response);
        if (response.status === 200) {
          // setNickname(response.data.nickname);
          // setProfileImage(response.data.profileImage);
          // setDormitory(response.data.dormitory);
          // setUserId(response.data.userId);
          // setScore(response.data.score);
          // AsyncStorage에 유저 이름과 배달 거점 저장
          // AsyncStorage.setItem('@BaedalMate_UserName', response.data.nickname);
          // AsyncStorage.setItem(
          //   '@BaedalMate_Dormitory',
          //   response.data.dormitory,
          // );
          // AsyncStorage.setItem(
          //   '@BaedalMate_UserId',
          //   response.data.userId.toString(),
          // );
          // AsyncStorage.setItem(
          //   '@BaedalMate_ProfileImage',
          //   response.data.profileImage,
          // );

          return response.data;
        } else if (response.status === 401) {
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
              getUserAPI();
            }
            return result.data;
          }
        }
      })
      .catch(async function (error) {
        console.log(error);
        if (error.response.status === 401) {
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
              getUserAPI();
            }
            return result.data;
          }
        }
        return false;
      });
    return UserData;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 401) {
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
          getUserAPI();
        }
        return result.data;
      }
    }
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
              getParticipatedRecruitAPI();
            }
            return result.data.recruitList;
          }
        }
        return response.data.recruitList;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
    return result;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 401) {
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
          getParticipatedRecruitAPI();
        }
        return result.data.recruitList;
      }
    }
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
              getHostedRecruitAPI();
            }
            return result.data.recruitList;
          }
        }
        return response.data.recruitList;
      })
      .catch(async function (error) {
        console.log(error);
        if (error.response.status === 401) {
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
              getHostedRecruitAPI();
            }
            return result.data.recruitList;
          }
        }
        return false;
      });
    return result;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 401) {
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
          getHostedRecruitAPI();
        }
        return result.data.recruitList;
      }
    }
    return false;
  }
};

export const updateUserInfoAPI = async (
  default_image: boolean,
  nickname: string,
  file?,
) => {
  const JWTAccessToken = await getJWTToken();
  const formData = new FormData();

  file &&
    formData.append('uploadfile', {
      // ...file,
      name: file.fileName,
      type: file.type,
      uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
      // base64: `data:${file.type};base64,${file.base64}`,
    });

  console.log(formData);
  try {
    const result = file
      ? axios
          .post(updateUserInfoURL, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + JWTAccessToken,
            },
            params: {
              default_image,
              nickname,
            },
            transformRequest: data => {
              return data;
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
                  updateUserInfoAPI(default_image, nickname, file);
                }
                return result;
              }
            }
            return response;
          })
          .catch(async function (error) {
            console.log(error);
            if (error.response.data.code === 401) {
              const result = await refreshAPI();
              console.log(result);
              if (error.response.status === 401) {
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
                    updateUserInfoAPI(default_image, nickname, file);
                  }
                  return result;
                }
              }
              // if (result.status === 200)
              //   return putUpdateUserInfoAPI(nickname, file);
              return error;
            }
            return error;
          })
      : axios
          .post(
            updateUserInfoURL,
            {uploadfile: ''},
            {
              params: {
                default_image,
                nickname,
              },
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + JWTAccessToken,
              },
            },
          )
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
                  updateUserInfoAPI(default_image, nickname, file);
                }
                return result;
              }
            }
            return response;
          })
          .catch(async function (error) {
            console.log(error);
            if (error.response.status === 401) {
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
                  updateUserInfoAPI(default_image, nickname, file);
                }
                return result;
              }
            }
            return error;
          });
    return result;
  } catch (error: any) {
    console.log(error);
    if (error.response.status === 401) {
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
          updateUserInfoAPI(default_image, nickname, file);
        }
        return result;
      }
    }
    return error;
  }
};
