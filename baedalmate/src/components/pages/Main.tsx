import {NavigationProp} from '@react-navigation/native';
import Category from 'components/molecules/Main/Category';
import React, {useEffect, useState} from 'react';
import {View, Platform, StatusBar} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {LINE_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {TextKRBold} from 'themes/text';
import NowGathering from 'components/molecules/Main/NowGathering';
import TodayMenu from 'components/molecules/Main/TodayMenu';
import BaedalMateRecommendation from 'components/molecules/Main/BaedalMateRecommendation';
import BtnFloating from 'components/atoms/Button/BtnFloating';
import axios from 'axios';
import {url} from '../../../App';
import {getJWTToken} from 'components/utils/api/Recruit';
import {getUserAPI} from 'components/utils/api/User';
import {refreshAPI} from 'components/utils/api/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {
  selectDormitoryState,
  userDormitoryState,
  userIdState,
  userNicknameState,
  userProfileImageState,
  userScoreState,
} from 'components/utils/recoil/atoms/User';
import {dormitoryList} from './CreateRecuit/second';
export const userURL = url + '/api/v1/user';
export const recruitListURL = url + '/api/v1/recruit/list';
export const mainRecruitListURL = url + '/api/v1/recruit/main/list';
export const mainTagRecruitListURL = url + '/api/v1/recruit/tag/list';
export const imageURL = url + `/images/`;
export interface eachMainRecruitListI {
  active: boolean;
  createDate: string;
  currentPeople: number;
  deadlineDate: string;
  dormitory: string;
  image: string | null;
  minPeople: number;
  minPrice: number;
  place: string;
  recruitId: number;
  shippingFee: number;
  userScore: number;
  username: string;
}
export interface mainRecruitListI {
  recruitList: eachMainRecruitListI[];
}
export interface eachMainTagRecruitListI {
  active: boolean;
  createDate: string;
  deadlineDate: string;
  dormitory: string;
  image: string;
  minPrice: number;
  place: string;
  recruitId: number;
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

// 메인 태그 모집글 리스트 api
// 모집글 리스트 Api 받아옴
// let imageURLList: any = [];
export const getImages = async fileOriginName => {
  const BoardListData = await axios
    .get(imageURL + `${fileOriginName}`)
    .then(function (response) {
      if (response.status === 200) {
        return response.data;
      }
      return false;
    })
    .catch(async function (error) {
      console.log(error);
      if (error.response.data.code === 401) {
        const result = await refreshAPI();
        console.log(result);
      }
      return false;
    });
  return BoardListData;
};
const Main: React.FunctionComponent<MainProps> = props => {
  const [yOffset, setYOffset] = useState(0);
  const [StatusBGColor, setStatusBGColor] = useState(PRIMARY_COLOR);
  //user 관련 state
  const [nickname, setNickname] = useRecoilState(userNicknameState);
  const [selectDormitory, setSelectDormitory] =
    useRecoilState(selectDormitoryState);
  const [dormitory, setDormitory] = useRecoilState(userDormitoryState);
  const [profileImage, setProfileImage] = useRecoilState(userProfileImageState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [score, setScore] = useRecoilState(userScoreState);
  //recruit 관련 state
  const [mainRecruitList, setMainRecruitList] =
    useState<eachMainRecruitListI[]>();
  const [mainTagRecruitList, setMainTagRecruitList] =
    useState<mainTagRecruitListI>({
      recruitList: [],
    });
  const [option, setOption] = useState(null);

  // 메인 모집글 리스트 api
  // 모집글 리스트 Api 받아옴
  const getMainRecruitList = async () => {
    try {
      const JWTAccessToken = await getJWTToken();
      const BoardListData = await axios
        .get(mainRecruitListURL, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
          params: {
            page: 0,
            size: 5,
            // sort: 'deadlineDate,ASC',
          },
        })
        .then(async function (response) {
          if (response.status === 200) {
            // response.data.recruitList.map(async v => {
            //   console.log(v);
            //   return v;
            // });
            console.log(response.data.recruitList);
            setMainRecruitList(response.data.recruitList);

            return response.data.recruitList;
          } else if (response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            const tokens = await result.data;
            const token = tokens.accessToken;
            const refToken = tokens.refreshToken;

            AsyncStorage.multiSet([
              ['@BaedalMate_JWTAccessToken', token],
              ['@BaedalMate_JWTRefreshToken', refToken],
            ]);
          } else if (response.status === 403) {
            // props.navigation.navigate('거점 인증');
            if (nickname !== '') {
              props.navigation.navigate('거점 인증');
            } else {
              props.navigation.navigate('프로필 설정');
            }
          }
          return false;
        })
        .catch(async function (error) {
          console.log(error);
          console.log(error.response.status);
          if (error.response.status === 403) {
            // props.navigation.navigate('거점 인증');
            if (nickname !== '') {
              props.navigation.navigate('거점 인증');
            } else {
              props.navigation.navigate('프로필 설정');
            }
          } else if (error.response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            const tokens = await result.data;
            const token = tokens.accessToken;
            const refToken = tokens.refreshToken;

            AsyncStorage.multiSet([
              ['@BaedalMate_JWTAccessToken', token],
              ['@BaedalMate_JWTRefreshToken', refToken],
            ]);
          }
          return false;
        });
      console.log('BoardListData', BoardListData);
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
        .then(async function (response) {
          if (response.status === 200) {
            console.log(response.data);
            setMainTagRecruitList(response.data);
            return response.data.recruitList;
          } else if (response.status === 403) {
            // props.navigation.navigate('거점 인증');
            if (nickname !== '') {
              props.navigation.navigate('거점 인증');
            } else {
              props.navigation.navigate('프로필 설정');
            }
          } else if (response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            const tokens = await result.data;
            const token = tokens.accessToken;
            const refToken = tokens.refreshToken;

            AsyncStorage.multiSet([
              ['@BaedalMate_JWTAccessToken', token],
              ['@BaedalMate_JWTRefreshToken', refToken],
            ]);
          }
          return false;
        })
        .catch(async function (error) {
          console.log(error);
          if (error.response.status === 403) {
            if (nickname !== '') {
              props.navigation.navigate('거점 인증');
            } else {
              props.navigation.navigate('프로필 설정');
            }

            // props.navigation.navigate('거점 인증');
          } else if (error.response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            const tokens = await result.data;
            const token = tokens.accessToken;
            const refToken = tokens.refreshToken;

            AsyncStorage.multiSet([
              ['@BaedalMate_JWTAccessToken', token],
              ['@BaedalMate_JWTRefreshToken', refToken],
            ]);
          }
          return false;
        });
      return BoardListData;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  // 스크롤바 위치에 따른 status bar 화면 배경 색상 변경 코드
  useEffect(() => {
    yOffset <= 387
      ? setStatusBGColor(PRIMARY_COLOR)
      : setStatusBGColor(WHITE_COLOR);
  }, [yOffset]);

  const getUserData = async () => {
    try {
      const result = await getUserAPI();
      console.log('main user data', result);
      if (result !== false) {
        setNickname(result.nickname);
        dormitoryList.map((item, id) => {
          item.name === result.dormitory &&
            (setDormitory(item), setSelectDormitory(item));
        });
        // setDormitory(result.dormitory);
        setProfileImage(result.profileImage);
        setUserId(result.userId);
        setScore(result.score);
        return result;
      } else {
        const result = await getUserAPI();
        console.log('main user data', result);
        if (result !== false) {
          setNickname(result.nickname);
          dormitoryList.map((item, id) => {
            item.name === result.dormitory &&
              (setDormitory(item), setSelectDormitory(item));
          });
          // setDormitory(result.dormitory);
          setProfileImage(result.profileImage);
          setUserId(result.userId);
          setScore(result.score);
          return result;
        }
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    getUserData();
    getMainRecruitList();
    getMainTagRecruitList();
  }, []);
  // 렌더링 시 유저 정보 받아오기

  useEffect(() => {
    getMainRecruitList();
    getMainTagRecruitList();
  }, [nickname, dormitory]);

  //  const [mainRecruitSortList, setMainRecruitSortList] = useState<
  //    eachMainRecruitListI[]
  //  >([]);
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
            props.navigation.navigate('상세 설정', {type: 'CREATE'});
          }}
        />
        <ScrollView
          onScroll={event => {
            setYOffset(event.nativeEvent.contentOffset.y);
          }}>
          <TodayMenu
            dormitory={selectDormitory}
            nickname={nickname}
            mainTagRecruitList={mainTagRecruitList}
          />
          <Category navigation={props.navigation} />
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
            <BaedalMateRecommendation
              mainRecruitSortList={mainRecruitList}
              setMainRecruitSortList={setMainRecruitList}
              option={option}
              setOption={setOption}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Main;
