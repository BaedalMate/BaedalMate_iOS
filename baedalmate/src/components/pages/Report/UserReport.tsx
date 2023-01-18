import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {DARK_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import MyPageBar from 'components/atoms/Setting/MyPageBar';
import {TextKRBold, TextKRReg} from 'themes/text';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import ReportListItem from 'components/atoms/Report/ReportListItem';
import {postBlockAPI} from 'components/utils/api/Block';
import {postReportUserAPI} from 'components/utils/api/Report';
import {UsePopup} from 'components/utils/usePopup';

export interface MyPageI {
  userId: number;
  nickname: string;
  profileImage: string;
  dormitory: string;
  score: number;
}
export const MyPageUserDummyData = {
  profileImage:
    'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
  userName: '김예빈',
  score: '4.3',
  dormitory: '성림학사',
};

const UserReport = ({route, navigation}) => {
  // const navigation = useNavigation();
  const [selectedReportReason, setSelectedReportReason] = useState(-1);
  const [detailReport, setDetailReport] = useState('');
  const userInfo = route.params.userInfo;
  const targetUserId = route.params.userInfo.userId;

  const UserReportList = [
    {
      value: 0,
      name: '스팸 홍보/도배글을 올려요',
    },
    {
      value: 1,
      name: '비매너 사용자에요',
    },
    {
      value: 2,
      name: '정상적인 거래/환불이 이뤄지지 않았아요',
    },
    {
      value: 3,
      name: '욕설을 해요',
    },
    {
      value: 4,
      name: '나체 이미지/성적 행위를 해요',
    },
    {
      value: 5,
      name: '혐오/차별적 발언 또는 상징을 나타내요',
    },
    {
      value: 6,
      name: '다른 문제가 있어요',
    },
  ];

  const [modal, setModal] = useState(false);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };
  const blockUser = async () => {
    if (userInfo?.userId) {
      const result = await postBlockAPI(userInfo?.userId);
      if (result) {
        console.log('block user', result);
      }
    }
  };
  const successModalData = {
    title: '신고가 완료되었습니다.',
    description: `신고 심사 결과에 따라 처리됩니다.\n'${userInfo.nickname}'님을 차단하시겠습니까?`,
    modal: modal,
    handleModal: handleModal,
    confirmEvent: blockUser,
    choiceCnt: 2,
  };
  const errorModalData = {
    title: '신고에 실패하였습니다.',
    description: '',
    modal: modal,
    handleModal: handleModal,
    confirmEvent: handleModal,
    choiceCnt: 1,
  };
  const [modalData, setModalData] = useState<{
    title: string;
    description: string;
    modal: boolean;
    handleModal: () => void;
    confirmEvent: any;
    choiceCnt: number;
  }>(successModalData);

  const reportUser = async () => {
    const result = await postReportUserAPI(
      targetUserId,
      UserReportList[selectedReportReason].name,
      detailReport,
    );
    console.log('report user ', result);
    if ('result' in result) {
      setModalData(successModalData);
      handleModal();
    } else {
      if (result.response.data.code === 400) {
        if (result.response.data.message === 'Api request body invalid') {
          errorModalData.description = '필수 정보가 누락되었습니다.';
        } else if (result.response.data.message === 'Already reported') {
          errorModalData.description = '이미 신고하였습니다.';
        } else if (
          result.response.data.message === 'Users cannot report themselves'
        ) {
          errorModalData.description = '자기 자신은 신고가 불가능합니다.';
        }
      } else if (result.response.data.code === 401) {
        errorModalData.description = '토큰이 만료되었습니다.';
      } else if (result.response.data.code === 403) {
        errorModalData.description = '권한이 부족합니다.';
      }
      setModalData(errorModalData);
      handleModal();
    }
  };
  return (
    <>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: WHITE_COLOR,
        }}>
        <UsePopup
          title={modalData.title}
          description={modalData.description}
          modal={modal}
          handleModal={handleModal}
          // 추가 필요
          confirmEvent={modalData.confirmEvent}
          choiceCnt={modalData.choiceCnt}
        />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.select({ios: 'padding'})}
          keyboardVerticalOffset={120}>
          <View style={{marginTop: 18, marginBottom: 35}}>
            <TextKRBold
              style={{
                fontSize: 14,
                lineHeight: 17,
                color: PRIMARY_COLOR,
              }}>
              ‘{userInfo.nickname}’ 님을 신고하는 사유를 선택해주세요
            </TextKRBold>
            <TextKRReg
              style={{
                marginTop: 5,
                marginBottom: 7,
                fontSize: 12,
                lineHeight: 18,
                color: DARK_GRAY_COLOR,
              }}>
              신고 사유 검토후, 검토 결과에 따라 처리됩니다.{' '}
            </TextKRReg>
            <View>
              {UserReportList &&
                UserReportList.map((v, i) => (
                  <View key={i}>
                    <MyPageBar height={1} />
                    <ReportListItem
                      type={'USER'}
                      item={v}
                      onPress={() => {
                        setSelectedReportReason(v.value);
                      }}
                      selectedReportReason={selectedReportReason}
                      detailReport={detailReport}
                      setDetailReport={setDetailReport}
                    />
                  </View>
                ))}
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={{height: 143, width: '100%'}} />
      </ScrollView>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 15,
          position: 'absolute',
          bottom: 45,
        }}>
        <BtnVerticalOrange
          onPress={() => {
            if (
              selectedReportReason === -1 ||
              (selectedReportReason === 6 && detailReport === '')
            )
              return;
            reportUser();
          }}
          text={'신고하기'}
        />
      </View>
    </>
  );
};

export default UserReport;
