import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {
  DARK_GRAY_COLOR,
  PRIMARY_COLOR,
  SEARCH_DOT,
  WHITE_COLOR,
} from 'themes/theme';
import BoardList from 'components/molecules/BoardList/BoardList';
import {TextKRBold, TextKRReg} from 'themes/text';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';

export const sortData = [
  {name: '마감순', value: 'deadlineDate'},
  {name: '평점순', value: 'score'},
  {name: '인기순', value: 'view'},
];
const SearchPage = ({route, navigation}) => {
  // const {categoryIndex} = route.params;
  // const [categoryIdcategoryId, setCategoryId] = useState(0);
  // const [selectedSort, setSelectedSort] = useState(sortData[0].value);
  const [keyword, setKeword] = useState('키워드');
  const [recruitList, setRecruitList] = useState([]);
  // useEffect(() => {
  //   setCategoryId(route.params.categoryId);
  // }, [route.params]);
  // 모집글 리스트 Api 받아옴
  // const getBoardListData = async () => {
  //   try {
  //     const JWTAccessToken = await getJWTToken();

  //     const BoardListData = await axios
  //       .get(recruitListURL, {
  //         headers: {
  //           Authorization: 'Bearer ' + JWTAccessToken,
  //         },
  //       })
  //       .then(function (response) {
  //         if (response.status === 200) {
  //           // console.log(selectedSort);
  //           console.log(response.data);
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
  useEffect(() => {
    console.log('result', route.params);
    route.params &&
      route.params.result &&
      setRecruitList(route.params.result.recruitList);
    route.params && route.params.keyword && setKeword(route.params.keyword);
  }, [route.params]);
  useEffect(() => {
    console.log(recruitList);
  }, [recruitList]);
  useEffect(() => {
    console.log(keyword);
  }, [keyword]);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: WHITE_COLOR,
      }}>
      <View style={{marginLeft: 15, marginTop: 23}}>
        <TextKRBold
          style={{fontSize: 14, lineHeight: 24, color: DARK_GRAY_COLOR}}>
          <TextKRBold style={{color: PRIMARY_COLOR}}>
            {recruitList.length ? recruitList.length : 0}개
          </TextKRBold>
          의 모집글이 있습니다.
        </TextKRBold>
      </View>
      {recruitList && recruitList.length > 0 ? (
        <BoardList boardList={recruitList} />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            flex: 1,
          }}>
          <Image
            source={SEARCH_DOT}
            style={{width: 50, height: 50, marginBottom: 37}}
          />
          <TextKRBold
            style={{
              fontSize: 18,
              lineHeight: 22,
              textAlign: 'center',
              color: DARK_GRAY_COLOR,
            }}>
            <Text style={{color: PRIMARY_COLOR}}> '{keyword}'</Text> 검색 결과가
            없어요.
          </TextKRBold>
          <TextKRReg
            style={{
              fontSize: 12,
              lineHeight: 18,
              textAlign: 'center',
              color: DARK_GRAY_COLOR,
            }}>
            검색어를 다시 확인해주세요.
          </TextKRReg>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 147,
            }}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                color: DARK_GRAY_COLOR,
                textAlign: 'center',
                marginBottom: 11,
              }}>
              함께 먹고싶은 음식을 직접 모집할 수도 있어요!
            </Text>
            <BtnVerticalOrange
              onPress={() => {
                navigation.navigate('상세 설정');
                // 임시 값. 변경 필요
              }}
              text={'모집글 작성하러 가기'}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchPage;
