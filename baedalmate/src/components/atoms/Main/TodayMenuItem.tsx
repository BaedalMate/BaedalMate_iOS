import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WHITE_COLOR} from 'themes/theme';
export type TodayMenuItemProps = {
  text: string;
};
import Tag from './Tag';
import TodayMenuItemOngoing from './TodayMenuItemOngoing';
import TodayMenuItemCompleted from './TodayMenuItemCompleted';
import TodayMenuItemCreate, {CreateTagI} from './TodayMenuItemCreate';
import {eachMainTagRecruitListI} from 'components/pages/Main';
export interface tagI {
  tagname: string;
}
export const TagComponent = ({item}: {item: CreateTagI}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 30,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 5,
      }}>
      {item.tags.map((v, i) => {
        if (i < 2) {
          return <Tag text={v.tagname} key={i} />;
        }
      })}
    </View>
  );
};
export const TodayMenuItem = ({
  item,
  index,
}: {
  item: eachMainTagRecruitListI;
  index: any;
}) => {
  const now = new Date();
  const text =
    item?.deadlineDate.split(' ')[0] + 'T' + item?.deadlineDate.split(' ')[1];
  const deadline = new Date(text);
  const time = deadline.getTime() - now.getTime();

  // const durationYear = deadline.getFullYear() - now.getFullYear();
  // const durationMonth = deadline.getMonth() - now.getMonth();
  // const durationDate = deadline.getDate() - now.getDate();
  // const durationHour = deadline.getHours() - now.getHours();
  // const durationMinutes = deadline.getMinutes() - now.getMinutes();
  // const durationSeconds = deadline.getSeconds() - now.getSeconds();
  // const timeText =
  //   durationYear > 0
  //     ? durationYear + '년'
  //     : durationMonth > 0
  //     ? durationMonth + '달'
  //     : durationDate > 0
  //     ? durationDate + '일'
  //     : durationHour > 0
  //     ? durationHour + '시간'
  //     : durationMinutes > 0
  //     ? durationMinutes + '분'
  //     : '마감 임박';

  // if (index === 4) {
  //   itemStatus = <TodayMenuItemCreate />;
  // } else if (time > 0) {
  //   itemStatus = <TodayMenuItemOngoing item={item} />;
  // } else {
  //   itemStatus = <TodayMenuItemCompleted item={item} />;
  // }

  return (
    <View>
      {item.id === -1 ? (
        <TodayMenuItemCreate />
      ) : (
        <TodayMenuItemOngoing item={item} />
      )}
      {/* {index === 4 ? (
        <TodayMenuItemCreate />
      ) : time > 0 ? (
        <TodayMenuItemOngoing item={item} />
      ) : (
        <TodayMenuItemCompleted item={item} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  imageSliderWrapper: {
    width: 300,
    height: 114,
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageSliderItemCreateTitle: {
    color: '#FFFFFF',
    fontSize: 55,
    fontWeight: '200',
    lineHeight: 60,
  },
});

export default TodayMenuItem;
