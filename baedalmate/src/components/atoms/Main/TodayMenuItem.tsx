import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WHITE_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';
import {wrap} from 'module';
export type TodayMenuItemProps = {
  text: string;
};
import {STAR_PRIMARY} from 'themes/theme';
import Tag from './Tag';
import TodayMenuItemOngoing from './TodayMenuItemOngoing';
import TodayMenuItemCompleted from './TodayMenuItemCompleted';
import {status} from './Slider';
import TodayMenuItemCreate from './TodayMenuItemCreate';
const TagComponent = ({item}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 30,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 5,
      }}>
      {item.tag1 === '' ? <></> : <Tag text={item.tag1}></Tag>}
      {item.tag2 === '' ? <></> : <Tag text={item.tag2}></Tag>}
    </View>
  );
};
const TodayMenuItem = ({item, index}) => {
  let itemStatus;
  if (item.state === status.ONGOING) {
    itemStatus = <TodayMenuItemOngoing item={item} />;
  } else if (item.state === status.COMPLETED) {
    itemStatus = <TodayMenuItemCompleted item={item} />;
  } else {
    itemStatus = <TodayMenuItemCreate />;
  }

  return (
    <View>
      <TagComponent item={item} />
      {/* {itemStatus} */}
      {index === 4 ? (
        <TodayMenuItemCreate />
      ) : item.state === status.ONGOING ? (
        <TodayMenuItemOngoing item={item} />
      ) : (
        <TodayMenuItemCompleted item={item} />
      )}
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
