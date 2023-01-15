import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {WHITE_COLOR} from 'themes/theme';
import BoardList from 'components/molecules/BoardList/BoardList';
import Sort from 'components/molecules/BoardList/Sort';
import {CategoryList} from 'components/atoms/BoardList/CategoryItem';
import BtnFloating from 'components/atoms/Button/BtnFloating';
import axios from 'axios';
import {recruitListURL} from './Main';
import {getJWTToken} from 'components/utils/api/Recruit';

export const sortData = [
  {name: '마감순', value: 'deadlineDate'},
  {name: '평점순', value: 'score'},
  {name: '인기순', value: 'view'},
];
const BoardListPage = ({route, navigation}) => {
  const {categoryIndex} = route.params;
  const [categoryId, setCategoryId] = useState(0);
  const [selectedSort, setSelectedSort] = useState(sortData[0].value);
  const [recruitList, setRecruitList] = useState();
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
              .get(recruitListURL, {
                headers: {
                  Authorization: 'Bearer ' + JWTAccessToken,
                },
                params: {
                  page: 0,
                  // size: 10,
                  sort: selectedSort,
                },
              })
              .then(function (response) {
                if (response.status === 200) {
                  console.log(selectedSort);
                  console.log(response.data);
                  setRecruitList(response.data.recruitList);
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
                  page: 0,
                  // size: 10,
                  sort: selectedSort,
                },
              })
              .then(function (response) {
                if (response.status === 200) {
                  console.log(selectedSort);
                  console.log(response.data);
                  setRecruitList(response.data.recruitList);
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

  useEffect(() => {
    getBoardListData();
  }, [selectedSort, categoryId, categoryIndex, route.params]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: WHITE_COLOR,
      }}>
      <CategoryList categoryId={categoryId} setCategoryId={setCategoryId} />
      <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      <BoardList categoryId={categoryId} boardList={recruitList} />
      <BtnFloating
        onPress={() => {
          navigation.navigate('상세 설정');
          // 임시 값. 변경 필요
        }}
      />
    </View>
  );
};

export default BoardListPage;
