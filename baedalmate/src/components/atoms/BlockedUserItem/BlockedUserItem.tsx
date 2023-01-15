import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {DARK_GRAY_COLOR, LINE_GRAY_COLOR, WHITE_COLOR} from 'themes/theme';
import BtnHorizontalWhiteS from '../Button/BtnHorizontalWhiteS';
import {BtnActive} from '../Button/BtnEndStandard';
import BtnHorizontalWhite from '../Button/BtnHorizontalWhite';

const BlockedUserItem = ({item}: {item}) => {
  return (
    <View style={styles.BlockedUserItemWrapper}>
      <>
        <Image
          source={{
            uri: item?.profileImage,
            // uri: url + '/images/' + item.image,
          }}
          style={styles.userImg}
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
              alignItems: 'center',
            }}>
            <TextKRBold
              style={{
                fontSize: 16,
                lineHeight: 19,
              }}>
              {item.userNickname}
            </TextKRBold>
            <View
              style={{
                width: 85,
                height: 40,
              }}>
              <BtnHorizontalWhiteS onPress={() => {}} text={'차단 해제'} />
            </View>
          </View>
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  BlockedUserItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 9,
    paddingHorizontal: 15,
    width: '100%',
    height: 58,
    borderBottomWidth: 1,
    // borderWidth: 1,
    borderColor: LINE_GRAY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginHorizontal: 18,
    backgroundColor: '#D9D9D9',
  },
});

export default BlockedUserItem;
