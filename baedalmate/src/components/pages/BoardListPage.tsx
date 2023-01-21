import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  BLACK_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import BoardList, {
  BoardListProps,
} from 'components/molecules/BoardList/BoardList';
import Sort from 'components/molecules/BoardList/Sort';
import {categoryData} from 'components/atoms/BoardList/CategoryItem';
import BtnFloating from 'components/atoms/Button/BtnFloating';
import axios from 'axios';
import {recruitListURL} from './Main';
import {getJWTToken} from 'components/utils/api/Recruit';
import {useRecoilState} from 'recoil';
import {
  recruitListCategoryIdxState,
  recruitListState,
  // totalRecruitListState,
} from 'components/utils/recoil/atoms/RecruitList';
import SwiperView from 'components/molecules/BoardList/SwiperView';
export const sortData = [
  {name: '최신순', value: 'createDate'},
  {name: '마감순', value: 'deadlineDate'},
  {name: '평점순', value: 'score'},
  {name: '인기순', value: 'view'},
];
const BoardListPage = ({route, navigation}) => {
  const {categoryIndex} = route.params;
  const [categoryId, setCategoryId] = useRecoilState(
    recruitListCategoryIdxState,
  );
  const [pageCnt, setPageCnt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortData[0].value);
  const [recruitList, setRecruitList] = useRecoilState(recruitListState);
  // const [totalList, setTotalList] = useRecoilState(totalRecruitListState);

  useEffect(() => {
    setCategoryId(route.params.categoryId);
  }, [route.params]);
  // 모집글 리스트 Api 받아옴
  const getBoardListData = async () => {
    try {
      const JWTAccessToken = await getJWTToken();
      const BoardListData =
        categoryId === 0
          ? await axios
              .get<{recruitList: BoardListProps[]; last: boolean}>(
                recruitListURL,
                {
                  headers: {
                    Authorization: 'Bearer ' + JWTAccessToken,
                  },
                  params: {
                    page: pageCnt,
                    size: 10,
                    sort: selectedSort,
                  },
                },
              )
              .then(function (response) {
                if (response.status === 200) {
                  console.log(selectedSort);
                  console.log(response.data);
                  recruitList.length > 0
                    ? setRecruitList(
                        prev =>
                          [...prev, ...response.data.recruitList] as never[],
                      )
                    : setRecruitList(response.data.recruitList as never);
                  //  setTotalList(response.data.recruitList);
                  setLast(response.data.last);
                  return response.data.recruitList;
                }
                return false;
              })
              .catch(function (error) {
                console.log(error);
                return false;
              })
          : await axios
              .get(recruitListURL, {
                headers: {
                  Authorization: 'Bearer ' + JWTAccessToken,
                },
                params: {
                  categoryId: categoryId,
                  page: pageCnt,
                  size: 10,
                  sort: selectedSort,
                },
              })
              .then(function (response) {
                if (response.status === 200) {
                  console.log(selectedSort);
                  console.log(response.data);
                  recruitList.length > 0
                    ? setRecruitList(
                        prev =>
                          [...prev, ...response.data.recruitList] as never[],
                      )
                    : setRecruitList(response.data.recruitList as never);
                  //  setTotalList(response.data.recruitList);
                  setLast(response.data.last);
                  // setTotalList(response.data.recruitList);
                  // setRecruitList(response.data.recruitList);
                  return response.data.recruitList;
                }
                return false;
              })
              .catch(function (error) {
                console.log(error);
                console.log(categoryId);
                return false;
              });
      return BoardListData;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const getData = async () => {
    if (!last) {
      setLoading(true);
      setPageCnt(pageCnt + 1);
      setTimeout(() => {
        getBoardListData();
        setLoading(false);
      }, 1000);
      // const boardList = await getBoardListData();
      // totalList.length > 0
      //   ? setRecruitList(prev => [...prev, boardList] as never[])
      //   : setRecruitList(boardList);
    }
  };

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  useEffect(() => {
    setPageCnt(0);
    setRecruitList([]);
    getBoardListData();
  }, [selectedSort, categoryId, categoryIndex, route.params]);
  useEffect(() => {
    console.log(pageCnt);
  }, [pageCnt]);
  let tabList = [];
  for (let i = 0; i < 12; i++) {
    tabList.push({
      id: categoryData[i].id,
      name: categoryData[i].text,
      component: (
        <View style={{width: '100%', height: '100%'}}>
          <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
          <BoardList onEndReached={onEndReached} />
        </View>
      ),
    } as never);
  }
  // console.log(tabList);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: WHITE_COLOR,
      }}>
      {/* <CategoryList categoryId={categoryId} setCategoryId={setCategoryId} /> */}
      {/* <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} /> */}
      {/* <BoardList categoryId={categoryId} boardList={recruitList} /> */}
      <SwiperView
        tabList={tabList}
        tabHeaderStyles={{
          // color: WHITE_COLOR,
          // borderBottomWidth: 4,
          width: '100%',
          height: 48,
          // paddingHorizontal: 10,
          // paddingLeft: 15,
          backgroundColor: WHITE_COLOR,
        }}
        tabButtonStyles={{
          padding: 10,
          backgroundColor: WHITE_COLOR,
        }}
        tabButtonActiveStyles={{
          backgroundColor: WHITE_COLOR,
          padding: 10,
          // borderBottomWitdh: -4,
          // borderBottomColor: PRIMARY_COLOR,
        }}
        tabButtonTextStyles={{
          color: BLACK_COLOR,
          fontWeight: '400',
          fontSize: 16,
          // borderBottomWitdh: 4,
          // borderBottomColor: PRIMARY_COLOR,
        }}
        tabButtonTextActiveStyles={{
          color: BLACK_COLOR,
          fontSize: 16,
          fontWeight: '700',
        }}
        tabBarContainerStyles={{height: 2, borderBottom: LINE_GRAY_COLOR}}
        tabBarLineStyles={{
          height: 2,
          backgroundColor: LINE_GRAY_COLOR,
        }}
        tabBarStyles={{
          height: 4,
          backgroundColor: PRIMARY_COLOR,
        }}
        tabHeaderColor={WHITE_COLOR}
        tabTextColor={BLACK_COLOR}
        tabBarColor={LINE_GRAY_COLOR}
        tabTextSelectedColor={BLACK_COLOR}
      />
      <BtnFloating
        onPress={() => {
          navigation.navigate('상세 설정', {type: 'CREATE'});
          // 임시 값. 변경 필요
        }}
      />
    </View>
  );
};

export default BoardListPage;
