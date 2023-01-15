import React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {DARK_GRAY_COLOR, LINE_GRAY_COLOR} from 'themes/theme';

const AlarmItem = ({item}: {item}) => {
  return (
    <TouchableHighlight
      style={styles.AlarmItemWrapper}
      activeOpacity={0.6}
      underlayColor="#FFF3F0"
      onPress={() => {
        // navigation.navigate(
        //   '글 상세 보기' as never,
        //   {
        //     id: item.id,
        //   } as never,
        // );
      }}>
      <>
        <Image
          source={{
            uri: item?.image,
            // uri: url + '/images/' + item.image,
          }}
          style={styles.storeImg}
        />
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
                lineHeight: 19,
              }}>
              {item.title}
            </TextKRBold>
            <TextKRReg
              style={{
                fontSize: 12,
                lineHeight: 18,
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
                fontSize: 11,
                lineHeight: 13,
                color: DARK_GRAY_COLOR,
                marginTop: 5,
                // flex: 1,
              }}>
              {item.description}
            </TextKRReg>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}></View>
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  AlarmItemWrapper: {
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

export default AlarmItem;
