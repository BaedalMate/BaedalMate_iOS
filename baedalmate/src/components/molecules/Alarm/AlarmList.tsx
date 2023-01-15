import React from 'react';
import BoardItem from 'components/atoms/BoardList/BoardItem';
import {ScrollView, View} from 'react-native';
import {DARK_GRAY_COLOR} from 'themes/theme';
import {TextKRBold} from 'themes/text';
import AlarmItem from 'components/atoms/Alarm/AlarmItem';

const renderItem = alarmList => {
  // const [alarmList, setalarmList] = useState<alarmListProps[]>(alarmList);
  const date = new Date().getDate();
  const time = new Date().getTime();
  console.log(date);
  console.log(time);
  // // 모집글 리스트 Api 받아옴
  // const getalarmListData = async () => {
  //   try {
  //     const alarmListData = axios
  //       .get(recruitListURL, {
  //         params: {
  //           // page: 0,
  //           // size: 10,
  //         },
  //       })
  //       .then(function (response) {
  //         if (response.status === 200) {
  //           setalarmList(response.data.recruitList);
  //           return response.data.recruitList;
  //         }
  //         return false;
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         return false;
  //       });
  //     return alarmListData;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   getalarmListData();
  // }, []);

  return (
    <View>
      {alarmList === undefined || alarmList.length === 0 ? (
        <View></View>
      ) : (
        alarmList.map((item, i) => {
          console.log(item.time);
          const dateString = item.time;
          const time = dateString.replace(' ', 'T');
          const createTime = new Date(time);
          const currentTime = new Date();
          const durationYear =
            currentTime.getFullYear() - createTime.getFullYear();
          const durationMonth = currentTime.getMonth() - createTime.getMonth();
          const durationDate = currentTime.getDate() - createTime.getDate();
          const durationHour = currentTime.getHours() - createTime.getHours();
          const durationMinutes =
            currentTime.getMinutes() - createTime.getMinutes();
          const durationSeconds =
            currentTime.getSeconds() - createTime.getSeconds();

          durationYear > 0
            ? (item = {...item, createDate: durationYear + '년 전'})
            : durationMonth > 0
            ? (item = {...item, createDate: durationMonth + '달 전'})
            : durationDate > 0
            ? (item = {...item, createDate: durationDate + '일 전'})
            : durationHour > 0
            ? (item = {...item, createDate: durationHour + '시간 전'})
            : durationMinutes > 0
            ? (item = {...item, createDate: durationMinutes + '분 전'})
            : (item = {...item, createDate: '방금 전'});

          return <AlarmItem item={item} key={i} />;
        })
      )}
    </View>
  );
};
const AlarmList = ({alarmList}: {alarmList}) => {
  return alarmList && alarmList.length !== 0 ? (
    <ScrollView>{renderItem(alarmList)}</ScrollView>
  ) : (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
      }}>
      <TextKRBold
        style={{
          fontSize: 18,
          lineHeight: 22,
          textAlign: 'center',
          color: DARK_GRAY_COLOR,
        }}>
        현재 알람이 없어요
      </TextKRBold>
    </View>
  );
};

export default AlarmList;
