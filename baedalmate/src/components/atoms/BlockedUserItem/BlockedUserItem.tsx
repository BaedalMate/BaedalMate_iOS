import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TextKRBold} from 'themes/text';
import {LINE_GRAY_COLOR} from 'themes/theme';
import BtnHorizontalWhiteS from '../Button/BtnHorizontalWhiteS';
import {url} from '../../../../App';
import {participantI} from 'components/utils/api/Chat';
import {postUnBlockAPI} from 'components/utils/api/Block';

const BlockedUserItem = ({
  item,
  getData,
}: {
  item: participantI;
  getData: any;
}) => {
  const unblockUser = async () => {
    const result = await postUnBlockAPI(item.userId);
    if (result) {
      console.log('unblock user', result);
      if (result.result === 'success') {
        getData();
      }
    }
  };
  return (
    <View style={styles.BlockedUserItemWrapper}>
      <>
        <Image
          source={{
            uri: url + '/images/' + item.profileImage,
          }}
          style={styles.userImg}
        />
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
              {item.nickname}
            </TextKRBold>
            <View
              style={{
                width: 85,
                height: 40,
              }}>
              <BtnHorizontalWhiteS
                onPress={() => {
                  unblockUser();
                }}
                text={'차단 해제'}
              />
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
