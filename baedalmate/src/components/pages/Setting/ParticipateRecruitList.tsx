import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import BoardItem from 'components/atoms/BoardList/BoardItem';
import {dummyBoardListData} from './HostingRecruitList';
import MyRecruitItem from 'components/atoms/Setting/MyRecruitItem';
import {WHITE_COLOR} from 'themes/theme';
import {getParticipatedRecruitAPI} from 'components/utils/api/User';

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
        boardList.map((item, i) => {
          return <MyRecruitItem item={item} key={i} />;
        })
      )}
    </View>
  );
};

const ParticipateRecruitList = props => {
  const [boardListData, setBoardListData] = useState();
  const getData = async () => {
    const result = await getParticipatedRecruitAPI();
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

export default ParticipateRecruitList;
