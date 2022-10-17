import {NavigationProp} from '@react-navigation/native';
import Category from 'components/molecules/Main/Category';
import React, {useEffect, useState} from 'react';
import {View, Platform, StatusBar, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {LINE_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {TextKRBold} from 'themes/text';
import NowGathering from 'components/molecules/Main/NowGathering';
import TodayMenu from 'components/molecules/Main/TodayMenu';
import BaedalMateRecommendation from 'components/molecules/Main/BaedalMateRecommendation';
import BtnFloating from 'components/atoms/Button/BtnFloating';
import axios from 'axios';
import {url} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getJWTToken} from 'components/utils/Main';
import {Blob} from 'buffer';
export const userURL = url + '/api/v1/user';
export const recruitListURL = url + '/api/v1/recruit/list';
export const mainRecruitListURL = url + '/api/v1/recruit/main/list';
export const mainTagRecruitListURL = url + '/api/v1/recruit/tag/list';
export const imageURL = url + `/images/`;
export interface eachMainRecruitListI {
  id: number;
  place: string;
  minPeople: number;
  minPrice: number;
  currentPeople: number;
  createDate: string;
  deadlineDate: string;
  username: string;
  userScore: number;
  dormitory: string;
  shippingFee: number;
  image: string | null;
}
export interface mainRecruitListI {
  recruitList: eachMainRecruitListI[];
}
export interface eachMainTagRecruitListI {
  createDate: string;
  deadlineDate: string;
  dormitory: string;
  id: number;
  image: string;
  minPrice: number;
  place: string;
  shippingFee: number;
  tags: [
    {
      tagname: string;
    },
  ];
  userScore: number;
  username: string;
}

export interface mainTagRecruitListI {
  recruitList: eachMainTagRecruitListI[];
}

export type sort = 'view' | 'score' | 'deadlineDate';

export interface MainProps {
  navigation: NavigationProp<any, any>;
  user: {
    nickname: string;
    dormitory: string;
    profileImage: string;
  };
}

// // AsyncStorge에 저장한 JWT token을 받아옴
// export const getJWTToken = async () => {
//   const JWTAccessToken = await AsyncStorage.getItem(
//     '@BaedalMate_JWTAccessToken',
//   );
//   return String(JWTAccessToken);
// };
export const arrayBufferToBase64 = buffer => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// 메인 태그 모집글 리스트 api
// 모집글 리스트 Api 받아옴
// let imageURLList: any = [];
export const getImages = async fileOriginName => {
  const BoardListData = await axios
    .get(imageURL + `${fileOriginName}`)
    .then(function (response) {
      if (response.status === 200) {
        // const blob = response.data.blob();

        // const imageURL = URL.createObjectURL(blob);
        // return btoa(binary);
        // console.log(response.data);
        // imageURLList.push(
        //   Buffer.from(response.data, 'binary').toString('base64'),
        // );
        // console.log(imageURLList);
        // console.log('data', response.data);
        // let img = 'data:image/jpeg;base64,' + response.data;

        // console.log(img);
        console.log(response.data);
        const Buffer = require('buffer').Buffer;
        let encoded = new Buffer(response.data).toString('base64');
        console.log('encoded', encoded);
        return encoded;

        // return response.data;
        // return response.data;
      }
      return false;
      // return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
  return BoardListData;
};
const Main: React.FunctionComponent<MainProps> = props => {
  const [yOffset, setYOffset] = useState(0);
  const [StatusBGColor, setStatusBGColor] = useState(PRIMARY_COLOR);
  //user 관련 state
  const [nickname, setNickname] = useState('캡스톤');
  const [dormitory, setDormitory] = useState('성림학사');
  const [profileImage, setProfileImage] = useState('');
  //recruit 관련 state
  const [recruitList, setRecruitList] = useState();
  const [mainRecruitList, setMainRecruitList] = useState<mainRecruitListI>();
  const [mainRecruitImgList, setMainRecruitImgList] = useState<string[]>([]);
  const [mainTagRecruitImgList, setMainTagRecruitImgList] = useState([]);
  const [mainTagRecruitList, setMainTagRecruitList] =
    useState<mainTagRecruitListI>({
      recruitList: [
        {
          createDate: 'string',
          deadlineDate: 'string',
          dormitory: '수림학사',
          id: 1,
          image: 'string',
          minPrice: 15000,
          place: '도미노피자',
          shippingFee: 0,
          tags: [
            {
              tagname: 'string',
            },
          ],
          userScore: 4.1,
          username: '유상',
        },
      ],
    });

  // User Api 를 받아옴
  const getUserData = async () => {
    const JWTAccessToken = await getJWTToken();
    try {
      const UserData = axios
        .get(userURL, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        })
        .then(function (response) {
          // console.log(response);
          // AsyncStorage에 유저 이름과 배달 거점 저장
          AsyncStorage.setItem('@BaedalMate_UserName', response.data.nickname);
          AsyncStorage.setItem(
            '@BaedalMate_Dormitory',
            response.data.dormitory,
          );
          // 해당 페이지는 렌더링 문제로 state 설정 후 사용
          setNickname(response.data.nickname);
          setDormitory(response.data.dormitory);
          setProfileImage(response.data.profileImage);
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

  // 메인 모집글 리스트 api
  // 모집글 리스트 Api 받아옴
  const getMainRecruitList = async () => {
    try {
      const BoardListData = await axios
        .get(mainRecruitListURL, {
          params: {
            page: 0,
            size: 5,
            // sort: 'deadlineDate,ASC',
          },
        })
        .then(async function (response) {
          if (response.status === 200) {
            // setMainRecruitList(response.data.recruitList);

            response.data.recruitList.map(async (v, i) => {
              // const image = await getImages(v.image);

              // setMainRecruitImgList([...mainRecruitImgList, image]);
              // console.log(image);
              console.log(v);
              return v;
              // console.log('getImage', image);
              // v.image = image;
              // console.log('v.image', v.image, 'image', image);
            });
            console.log(response.data.recruitList);
            setMainRecruitList(response.data.recruitList);

            return response.data.recruitList;
          }
          return false;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
      return BoardListData;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // 메인 태그 모집글 리스트 api
  // 모집글 리스트 Api 받아옴
  const getMainTagRecruitList = async () => {
    const JWTAccessToken = await getJWTToken();
    try {
      const BoardListData = await axios
        .get(mainTagRecruitListURL, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
          params: {
            page: 0,
            size: 5,
            // sort: 'deadlineDate',
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data);
            setMainTagRecruitList(response.data);
            return response.data.recruitList;
          }
          return false;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
      return BoardListData;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // // 모집글 리스트 Api 받아옴
  // const getBoardListData = async () => {
  //   try {
  //     const BoardListData = axios
  //       .get(recruitListURL, {
  //         params: {
  //           page: 0,
  //           size: 10,
  //           sort: 'deadlineDate,ASC',
  //         },
  //       })
  //       .then(function (response) {
  //         if (response.status === 200) {
  //           setRecruitList(response.data.recruitList);
  //           return response.data.recruitList;
  //         }
  //         return false;
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         return false;
  //       });
  //     return BoardListData;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   getBoardListData();
  // }, []);

  // 스크롤바 위치에 따른 status bar 화면 배경 색상 변경 코드
  useEffect(() => {
    yOffset <= 387
      ? setStatusBGColor(PRIMARY_COLOR)
      : setStatusBGColor(WHITE_COLOR);
  }, [yOffset]);

  // 렌더링 시 유저 정보 받아오기
  useEffect(() => {
    getUserData();
    getMainRecruitList();
    getMainTagRecruitList();
    // getRecruitList();
  }, [nickname, dormitory]);

  // useEffect(() => {
  //   async () => {
  //     const data = await AsyncStorage.getItem('@BaedalMate_Dormitory');
  //     let dorm =
  //       data === 'KB'
  //         ? 'KB학사'
  //         : data === 'NURI'
  //         ? '누리학사'
  //         : data === 'BURAM'
  //         ? '불암학사'
  //         : data === 'NURI'
  //         ? '누리학사'
  //         : '성림학사';
  //     setDormitory(dorm);
  //   };
  // }, [dormitory]);

  useEffect(() => {
    getUserData();
    getMainRecruitList();
    getMainTagRecruitList();
  }, []);
  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: StatusBGColor,
          height: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
        }}>
        <StatusBar backgroundColor={PRIMARY_COLOR} />
      </View>
      <View style={{flex: 1}}>
        <BtnFloating
          onPress={() => {
            props.navigation.navigate('상세 설정');
            // 임시 값. 변경 필요
          }}
        />
        <ScrollView
          onScroll={event => {
            setYOffset(event.nativeEvent.contentOffset.y);
          }}>
          <TodayMenu
            dormitory={dormitory !== null ? dormitory : '성림학사'}
            nickname={nickname}
            profileImage={profileImage}
            mainTagRecruitList={mainTagRecruitList}
            setDormitory={setDormitory}
          />

          <Category
            navigation={props.navigation}
            // onPress={() => {
            //   props.navigation.navigate('카테고리');
            // }}
          />
          <View
            style={{
              width: '95%',
              height: 1,
              borderColor: LINE_GRAY_COLOR,
              borderWidth: 1,
              marginTop: 24,
              marginBottom: 16,
            }}
          />
          <View
            style={{
              height: 260,
              paddingHorizontal: '5%',
            }}>
            <TextKRBold
              style={{
                lineHeight: 22,
                fontSize: 16,
                marginBottom: 13,
                color: '#212123',
              }}>
              지금 모으고 있어요!
            </TextKRBold>
            {mainRecruitList && (
              <NowGathering mainRecruitList={mainRecruitList} />
            )}
          </View>
          <View
            style={{
              width: '95%',
              height: 1,
              borderColor: LINE_GRAY_COLOR,
              borderWidth: 1,
              marginTop: 20,
              marginBottom: 16,
            }}
          />
          <View
            style={{
              paddingHorizontal: '5%',
            }}>
            <TextKRBold
              style={{
                fontSize: 16,
                lineHeight: 22,
                color: '#212123',
              }}>
              배달메이트 추천
            </TextKRBold>
            <BaedalMateRecommendation />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Main;
