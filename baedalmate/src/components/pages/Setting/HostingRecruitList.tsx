import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {WHITE_COLOR} from 'themes/theme';
import MyRecruitItem from 'components/atoms/Setting/MyRecruitItem';
import {getHostedRecruitAPI} from 'components/utils/api/User';

export const dummyBoardListData = Array(10).fill({
  createDate: '2022-10-14 10:40:13',
  criteria: 'NUMBER',
  currentPeople: 1,
  deadlineDate: '2022-10-14 12:40:13',
  dormitory: '누리학사',
  recruitId: 47,
  image: '1665252912498_11-3.png',
  minPeople: 4,
  minPrice: 10000,
  place: '도미노피자',
  title: '글 제목',
  userScore: 4.1,
});

const renderItem = boardList => {
  const date = new Date().getDate();
  const time = new Date().getTime();
  console.log(date);
  console.log(time);

  return (
    <View>
      {boardList === undefined ? (
        <View></View>
      ) : (
        boardList.map(item => {
          return <MyRecruitItem item={item} />;
        })
      )}
    </View>
  );
};

const HostingRecruitList = props => {
  const [boardListData, setBoardListData] = useState();
  const getData = async () => {
    const result = await getHostedRecruitAPI();
    setBoardListData(result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView style={{backgroundColor: WHITE_COLOR}}>
      {renderItem(boardListData)}
    </ScrollView>
  );
};

export default HostingRecruitList;
