import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {TextKRBold} from 'themes/text';
import {LINE_GRAY_COLOR} from 'themes/theme';
import BtnHorizontalWhiteS from '../Button/BtnHorizontalWhiteS';
import {url} from '../../../../App';
import {participantI} from 'components/utils/api/Chat';
import {postUnBlockAPI} from 'components/utils/api/Block';
import {UsePopup, popupProps} from 'components/utils/usePopup';
import Toast from 'react-native-root-toast';

const BlockedUserItem = ({
  item,
  getData,
}: {
  item: participantI;
  getData: any;
}) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  const unblockUser = async () => {
    const result = await postUnBlockAPI(item.userId);
    if (result) {
      console.log('unblock user', result);
      if (result.result === 'success') {
        getData();
        Toast.show('차단 해제가 완료되었습니다.');
      } else {
        Toast.show('차단 해제에 실패하였습니다.');
      }
    }
  };
  const unblockModalData = {
    title: '차단을 해제하시겠습니까?',
    description: '해당 유저가 주최하는 모집글을 다시 볼 수 있게 됩니다.',
    modal: modal,
    handleModal: handleModal,
    confirmEvent: unblockUser,
    choiceCnt: 2,
  };
  const [modalData, setModalData] = useState<popupProps>(unblockModalData);

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
          {modalData && (
            <UsePopup
              title={modalData.title}
              description={modalData.description}
              modal={modal}
              handleModal={handleModal}
              // 추가 필요
              confirmEvent={modalData.confirmEvent}
              choiceCnt={modalData.choiceCnt}
            />
          )}
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
                  handleModal();
                  // unblockUser();
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
