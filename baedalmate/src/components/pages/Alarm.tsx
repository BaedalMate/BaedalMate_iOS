import AlarmList from 'components/molecules/Alarm/AlarmList';
import BoardList from 'components/molecules/BoardList/BoardList';
import React from 'react';
import {View} from 'react-native';
import {WHITE_COLOR} from 'themes/theme';

const alarmDummyData = [
  {
    title: '모집글 제목',
    description: '주최한 모집이 마감되었습니다.',
    time: '2시간 전',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ6yI5v-1UCyMx8CdTpABg9QzItPHcPLZh7_1ZnzOpTg&s',
  },
];
const AlarmPage = ({route, navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: WHITE_COLOR,
      }}>
      <AlarmList alarmList={alarmDummyData} />
    </View>
  );
};

export default AlarmPage;
