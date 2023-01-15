import {Fonts} from 'assets/Fonts';
import {url} from '../../../../App';
import {RecruitItemProps} from 'components/pages/Detail';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BLOCK_ICON,
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  REPORT_ICON,
  WHITE_COLOR,
} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
import {UsePopup} from 'components/utils/usePopup';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const MyPageBottom = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const handleLogoutModal = () => {
    logoutModal ? setLogoutModal(false) : setLogoutModal(true);
  };
  const logoutModalData = {
    title: '로그아웃 하시겠습니까?',
    description:
      '로그아웃시, 다음 앱 접속시에 다시 로그인을 해야 이용 가능합니다.',
    modal: logoutModal,
    handleModal: handleLogoutModal,
  };
  const [withdrawModal, setWithdrawModal] = useState(false);
  const handleWithdrawModal = () => {
    withdrawModal ? setWithdrawModal(false) : setWithdrawModal(true);
  };
  const withdrawModalData = {
    title: '탈퇴 하시겠습니까?',
    description: '회원 탈퇴시, 현재까지 모집글에 참여한 기록이 삭제됩니다.',
    modal: withdrawModal,
    handleModal: handleWithdrawModal,
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
          handleLogoutModal();
        }}>
        <UsePopup
          title={logoutModalData.title}
          description={logoutModalData.description}
          modal={logoutModal}
          handleModal={handleLogoutModal}
        />
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
          handleWithdrawModal();
        }}>
        <UsePopup
          title={withdrawModalData.title}
          description={withdrawModalData.description}
          modal={withdrawModal}
          handleModal={handleWithdrawModal}
        />
        <TextKRReg
          style={{
            paddingVertical: 15,
            textAlign: 'center',
            // borderWidth: 1,
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
