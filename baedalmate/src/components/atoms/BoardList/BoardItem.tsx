import {useNavigation} from '@react-navigation/native';
import {url} from '../../../../App';
import {BoardListProps} from 'components/molecules/BoardList/BoardList';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  MAIN_GRAY_COLOR,
  MARKER_BLACK,
  STORE_BLACK,
  WHITE_COLOR,
} from 'themes/theme';
import {GrayTag, OrangeMainTag} from './Tags';

const BoardItem = ({item}: {item: BoardListProps}) => {
  const navigation = useNavigation();
  const [colour, setColour] = useState(WHITE_COLOR);
  const handlePress = () => {
    setColour('#FFF3F0');
  };
  return (
    <TouchableHighlight
      style={[
        styles.boardItemWrapper,
        !item.active && {backgroundColor: MAIN_GRAY_COLOR},
      ]}
      activeOpacity={0.6}
      underlayColor="#FFF3F0"
      onPress={() => {
        navigation.navigate(
          '글 상세 보기' as never,
          {
            id: item.recruitId,
          } as never,
        );
      }}>
      <>
        <Image
          source={{
            uri: url + '/images/' + item.image,
          }}
          style={[styles.storeImg]}
        />
        {!item.active && (
          <View
            style={{
              position: 'absolute',
              left: 15,
              top: 18,
              width: 75,
              height: 75,
              borderRadius: 75 / 2,
              flexDirection: 'row',
              backgroundColor: 'rgba(33, 33, 35, 0.7)',
              zIndex: 1,
            }}>
            <TextKRBold
              style={{
                color: 'white',
                display: 'flex',
                width: 75,
                height: 75,
                textAlign: 'center',
                lineHeight: 75,
                fontSize: 14,
              }}>
              모집완료
            </TextKRBold>
          </View>
        )}
        {/* <Image
        source={{
          uri: item.image !== null ? item.image : '',
        }}
        style={styles.storeImg}
        /> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextKRBold
              style={{
                fontSize: 16,
                lineHeight: 22,
              }}>
              {item.title}
            </TextKRBold>
            <TextKRReg
              style={{
                fontSize: 14,
                lineHeight: 24,
                color: DARK_GRAY_COLOR,
              }}>
              {item.createDate}
            </TextKRReg>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <TextKRReg
              style={{
                fontSize: 14,
                lineHeight: 24,
                flex: 1,
              }}>
              <Image source={STORE_BLACK} /> {item.place}{' '}
            </TextKRReg>
            <TextKRReg
              style={{
                fontSize: 14,
                lineHeight: 24,
                flex: 1,
              }}>
              <Image source={MARKER_BLACK} /> {item.dormitory}
            </TextKRReg>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <GrayTag item={item} />
            {item.active && <OrangeMainTag item={item} />}
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  boardItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 15,
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: LINE_GRAY_COLOR,
    alignItems: 'stretch',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  storeImg: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginRight: 15,
  },
});

export default BoardItem;
