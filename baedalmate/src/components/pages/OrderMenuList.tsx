import React from 'react';
import {
  Image,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {
  BLACK_COLOR,
  DARK_GRAY_COLOR,
  ERROR_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';

export interface RecruitItemProps {
  createDate: string;
  deadlineDate: string;
  shippingFee: number;
  description: string;
  dormitory: string;
  id: number;
  minPeople: number;
  minPrice: number;
  participate: false;
  platform: string;
  thumbnailImage: string;
  title: string;
  userImage: string;
  userScore: number;
  username: string;
}

const {StatusBarManager} = NativeModules;

const MyOrderPriceInfo = () => {
  return (
    <View
      style={{
        backgroundColor: '#F7F8FA',
        margin: 10,
        position: 'absolute',
        bottom: 0,
        borderRadius: 5,
        shadowColor: BLACK_COLOR,
        shadowOpacity: 0.25,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowRadius: 3.84,
        elevation: 5,
        // shadowRadius: 5,
        // box-shadow: 0px -5px 3px rgba(0, 0, 0, 0.1);
      }}>
      <View
        style={{
          width: '100%',
          padding: 15,
        }}>
        <View
          style={{
            display: 'flex',
          }}>
          <TextKRBold style={[styles.Title, {color: BLACK_COLOR}]}>
            결제 금액
          </TextKRBold>
        </View>
        <Text style={styles.Description}>
          {`배달팁 계산 시, 나누어 떨어지지 않는 경우 1원이 추가되어 계산됩니다.\n예시) 1000원, 3인주문 인 경우 334원으로 계산됨`}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              paddingVertical: 10,
              borderColor: LINE_GRAY_COLOR,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextKRReg
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontStyle: 'normal',
                }}>
                총 주문 금액
              </TextKRReg>
              <TextKRReg
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontStyle: 'normal',
                }}>
                {`18,300`} 원
              </TextKRReg>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextKRReg
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontStyle: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                배달팁
              </TextKRReg>
              <TextKRReg
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontStyle: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                {`2,000`} 원
              </TextKRReg>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
              }}>
              <TextKRBold
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontStyle: 'normal',
                }}>
                {`500`} 원
              </TextKRBold>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: LINE_GRAY_COLOR,
              paddingBottom: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextKRReg
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontStyle: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                쿠폰 사용 금액
              </TextKRReg>
              <TextKRReg
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontStyle: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                {`3,000`} 원
              </TextKRReg>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextKRBold style={styles.Label}>결제 예정 금액</TextKRBold>
              <TextKRBold
                style={{
                  fontSize: 24,
                  lineHeight: 29,
                  fontStyle: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                  color: PRIMARY_COLOR,
                }}>
                {`17,300`}원
              </TextKRBold>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const OrderMenuItem = () => {
  return (
    <View style={{padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          // justifyContent: 'center',
        }}>
        <Image
          source={{
            uri: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
          }}
          style={{
            width: 45,
            height: 45,
            backgroundColor: '#ffffff',
            borderRadius: 45 / 2,
            marginBottom: 6,
            marginRight: 15,
          }}
        />
        <View
          style={{
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextKRBold style={{}}>김예빈</TextKRBold>
        </View>
      </View>
      <View>
        <Text
          style={
            styles.Description
          }>{`\u2022 달달한 가츠동 / 1개 : 9,000원`}</Text>
        <Text
          style={
            styles.Description
          }>{`\u2022 치킨 오야꼬동 / 2개 : 18000원`}</Text>
      </View>
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextKRReg style={{fontSize: 16, lineHeight: 24}}>총 금액</TextKRReg>
        <TextKRBold style={{fontSize: 16}}>27,000원</TextKRBold>
      </View>
    </View>
  );
};

const OrderMenuList = props => {
  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
      }}>
      <ScrollView
        style={{
          backgroundColor: WHITE_COLOR,
          // paddingBottom: 300,
        }}>
        <View
          style={{
            padding: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextKRBold style={styles.Title}>전체 총 주문 금액</TextKRBold>
          <TextKRReg style={{fontSize: 16, lineHeight: 24}}>50,200원</TextKRReg>
        </View>
        <View style={{paddingBottom: 300}}>
          <OrderMenuItem />
          <OrderMenuItem />
          <OrderMenuItem />
          <OrderMenuItem />
          <OrderMenuItem />
        </View>
      </ScrollView>
      <MyOrderPriceInfo />
    </View>
  );
};

const styles = StyleSheet.create({
  Validation: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    textAlignVertical: 'center',
    color: ERROR_COLOR,
    marginLeft: 20,
  },
  margin: {
    marginLeft: 10,
  },
  Title: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlignVertical: 'center',
    color: PRIMARY_COLOR,
  },
  TitleInput: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlignVertical: 'center',
  },
  Label: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    textAlignVertical: 'center',
  },
  Description: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    alignItems: 'center',
    textAlignVertical: 'center',
    color: DARK_GRAY_COLOR,
    // paddingBottom: 18,
  },
  avoidingView: {
    // flex: 1,
  },
});

export default OrderMenuList;
