import AlarmList from 'components/molecules/Alarm/AlarmList';
import {
  getNotificationAPI,
  notificationsProps,
} from 'components/utils/api/Notifications';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {WHITE_COLOR} from 'themes/theme';

// const alarmDummyData = [
//   {
//     title: '모집글 제목',
//     description: '주최한 모집이 마감되었습니다.',
//     time: '2시간 전',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ6yI5v-1UCyMx8CdTpABg9QzItPHcPLZh7_1ZnzOpTg&s',
//   },
// ];
const AlarmPage = ({route, navigation}) => {
  const [alarmData, setAlarmData] = useState<notificationsProps[]>();
  const getAlarmData = async () => {
    const result = await getNotificationAPI();
    console.log(result);
    setAlarmData(result);
  };
  useEffect(() => {
    getAlarmData();
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: WHITE_COLOR,
      }}>
      <AlarmList alarmList={alarmData} />
    </View>
  );
};

export default AlarmPage;
