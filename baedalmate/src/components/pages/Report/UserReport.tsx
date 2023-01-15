import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {DARK_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import MyPageBar from 'components/atoms/Setting/MyPageBar';
import {TextKRBold, TextKRReg} from 'themes/text';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import ReportListItem from 'components/atoms/Report/ReportListItem';

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

  // const renderItem = ({item}) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         setSelectedReportReason(item.value);
  //       }}
  //       style={{
  //         height: 52,
  //         width: '100%',
  //         paddingHorizontal: 15,
  //         justifyContent: 'center',
  //         borderBottomColor: LINE_GRAY_COLOR,
  //         borderBottomWidth: 1,
  //       }}>
  //       <TextKRReg
  //         style={{
  //           fontWeight: '400',
  //           fontSize: 16,
  //           lineHeight: 24,
  //           color:
  //             selectedReportReason === item.name ? PRIMARY_COLOR : '#666666',
  //         }}>
  //         {item.name}
  //       </TextKRReg>
  //     </TouchableOpacity>
  //   );
  // };
  console.log(route, navigation);
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
        <View style={{marginTop: 18, marginBottom: 35}}>
          <TextKRBold
            style={{
              fontSize: 14,
              lineHeight: 17,
              color: PRIMARY_COLOR,
            }}>
            ‘{route.params.user.nickname}’ 님을 신고하는 사유를 선택해주세요
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
                  />
                </View>
              ))}
          </View>
        </View>

        <View style={{height: 143, width: '100%'}} />
      </ScrollView>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 15,
          position: 'absolute',
          bottom: 45,
        }}>
        <BtnVerticalOrange onPress={() => {}} text={'신고하기'} />
      </View>
    </>
  );
};

export default UserReport;
