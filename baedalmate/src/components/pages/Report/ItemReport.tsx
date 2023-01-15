import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {DARK_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import MyPageListItem from 'components/atoms/Setting/MyPageListItem';
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

const ItemReport = ({route, navigation}) => {
  // const navigation = useNavigation();
  const [selectedReportReason, setSelectedReportReason] = useState(-1);
  const ItemReportList = [
    {
      value: 0,
      name: '스팸 홍보글이에요',
    },
    {
      value: 1,
      name: '중복 모집글이에요',
    },
    {
      value: 2,
      name: '배달 모집글이 아니에요',
    },
    {
      value: 3,
      name: '혐오/차별적 내용이 담겨있어요',
    },
    {
      value: 4,
      name: '성적인 내용이 담겨있어요',
    },
    {
      value: 5,
      name: '욕설이 담겨 있어요',
    },
    {
      value: 6,
      name: '개인정보가 담겨 있어요',
    },
    {
      value: 7,
      name: '다른 문제가 있어요',
    },
  ];
  const UserReportList = [
    {
      name: '사용자 신고하러 가기',
      onPress: () => {
        navigation.navigate('사용자 신고하기');
      },
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
            게시글을 신고하는 사유를 선택해주세요
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
            {ItemReportList.map((v, i) => (
              <View key={i}>
                <MyPageBar height={1} />
                <ReportListItem
                  type={'ITEM'}
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
        <View style={{marginTop: 18}}>
          <TextKRBold
            style={{
              fontSize: 14,
              lineHeight: 17,
              color: PRIMARY_COLOR,
            }}>
            ‘캡스톤 디자인’ 님을 신고하고 싶으신가요?
          </TextKRBold>
          <View>
            {UserReportList.map((v, i) => (
              <View key={i}>
                {i !== 0 && <MyPageBar height={1} />}
                <MyPageListItem item={v} />
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

export default ItemReport;
