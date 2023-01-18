import {Fonts} from 'assets/Fonts';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {DARK_GRAY_COLOR} from 'themes/theme';
import {TextKRReg} from 'themes/text';
import {UsePopup} from 'components/utils/usePopup';
import {deactivateAPI, logoutAPI} from 'components/utils/api/Login';
import {useNavigation} from '@react-navigation/native';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const MyPageBottom = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  const [modalData, setModalData] = useState<{
    title: string;
    description: string;
    modal: boolean;
    handleModal: any;
    confirmEvent: any;
    choiceCnt: number;
  }>();
  const logout = async () => {
    const result = await logoutAPI();
    console.log(result);
    if (result.status == 200) {
      // handleModal();
      setTimeout(() => {
        navigation.navigate('Login' as never);
        navigation.reset({
          index: 0,
          routes: [{name: 'Login' as never}],
        });
      }, 1000);
    }
  };

  const withdraw = async () => {
    const result = await deactivateAPI();
    console.log(result);
    if (result.status == 200) {
      // handleModal();
      setTimeout(() => {
        navigation.navigate('Login' as never);
        navigation.reset({
          index: 0,
          routes: [{name: 'Login' as never}],
        });
      }, 1000);
    }
  };
  const logoutModalData = {
    title: '로그아웃 하시겠습니까?',
    description:
      '로그아웃시, 다음 앱 접속시에 다시 로그인을 해야 이용 가능합니다.',
    modal: modal,
    handleModal: handleModal,
    confirmEvent: logout,
    choiceCnt: 2,
  };

  const withdrawModalData = {
    title: '탈퇴 하시겠습니까?',
    description: '회원 탈퇴시, 현재까지 모집글에 참여한 기록이 삭제됩니다.',
    modal: modal,
    handleModal: handleModal,
    confirmEvent: withdraw,
    choiceCnt: 2,
  };

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 63,
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => {
          setModalData(logoutModalData);
          handleModal();
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
        <TextKRReg
          style={{
            paddingVertical: 15,
            textAlign: 'center',
            borderRadius: 10,
            fontSize: 14,
            lineHeight: 24,
            color: DARK_GRAY_COLOR,
          }}>
          로그아웃
        </TextKRReg>
      </TouchableOpacity>
      <View
        style={{width: 1, height: 22, backgroundColor: DARK_GRAY_COLOR}}></View>
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => {
          setModalData(withdrawModalData);
          handleModal();
        }}>
        {modalData && (
          <UsePopup
            title={modalData.title}
            description={modalData.description}
            modal={modal}
            handleModal={handleModal}
            confirmEvent={modalData.confirmEvent}
            choiceCnt={modalData.choiceCnt}
          />
        )}
        <TextKRReg
          style={{
            paddingVertical: 15,
            textAlign: 'center',
            borderRadius: 10,
            fontSize: 14,
            lineHeight: 24,
            color: DARK_GRAY_COLOR,
          }}>
          회원탈퇴
        </TextKRReg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mypageText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: DARK_GRAY_COLOR,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default MyPageBottom;
