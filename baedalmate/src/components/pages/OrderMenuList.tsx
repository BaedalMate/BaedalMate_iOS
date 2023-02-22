import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
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
import axios from 'axios';
import {
  chatRecruitURL,
  participantMenuPriceI,
  recruitMenuI,
  recruitParticipantsI,
} from 'components/utils/api/Chat';
import {formPrice, getJWTToken} from 'components/utils/api/Recruit';
import {url} from '../../../App';
import {refreshAPI} from 'components/utils/api/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const MyOrderPriceInfo = ({item}: {item: recruitMenuI}) => {
  return (
    <View
      style={{
        backgroundColor: '#F7F8FA',
        margin: 10,
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        borderRadius: 5,
        shadowColor: BLACK_COLOR,
        shadowOpacity: 0.25,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowRadius: 3.84,
        elevation: 5,
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
          배달비과 쿠폰 사용금액 더치페이 계산 시, 나누어 떨어지지 않는 경우
          각각 1원이 가감하여 계산됩니다.
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
                {formPrice(item.myOrderPrice)} 원
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
                배달비
              </TextKRReg>
              <TextKRReg
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  fontStyle: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                {formPrice(item.shippingFee)} 원
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
                {formPrice(
                  Math.ceil(item.shippingFee / item.participants.length),
                )}{' '}
                원
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
                {formPrice(item.coupon)} 원
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
                alignItems: 'center',
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
                {formPrice(
                  item.myOrderPrice +
                    Math.ceil(item.shippingFee / item.participants.length) -
                    item.coupon,
                )}
                원
              </TextKRBold>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const OrderMenuItem = ({
  item,
  id,
}: {
  item: participantMenuPriceI;
  id: number;
}) => {
  const [participantsInfo, setParticipantsInfo] =
    useState<recruitParticipantsI>();
  const [currentParticipant, setcurrentParticipant] = useState<{
    image: string;
    name: string;
  }>();
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  // const [FCMToken, setFCMToken] = useRecoilState(FCMTokenState);

  const getParticipants = async id => {
    try {
      const JWTAccessToken = await getJWTToken();
      const chatParticipants = await axios
        .get(chatRecruitURL + id + `/participants`, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        })
        .then(async function (response) {
          if (response.status === 200) {
            setParticipantsInfo(response.data);
            return response.data.recruitList;
          } else if (response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            if (result.status == 200) {
              const tokens = await result.data;
              const token = tokens.accessToken;
              const refToken = tokens.refreshToken;
              AsyncStorage.multiSet([
                ['@BaedalMate_JWTAccessToken', token],
                ['@BaedalMate_JWTRefreshToken', refToken],
              ]);

              if (result.status === 200) {
                getParticipants(id);
              }
              return result;
            }
          }
          return false;
        })
        .catch(async function (error) {
          console.log(error);
          if (error.response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            if (result.status == 200) {
              const tokens = await result.data;
              const token = tokens.accessToken;
              const refToken = tokens.refreshToken;
              AsyncStorage.multiSet([
                ['@BaedalMate_JWTAccessToken', token],
                ['@BaedalMate_JWTRefreshToken', refToken],
              ]);

              if (result.status === 200) {
                getParticipants(id);
              }
              return result;
            }
          }
          return false;
        });
      return chatParticipants;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    getParticipants(id);
  }, []);
  useEffect(() => {
    participantsInfo?.participants.map(v => {
      if (item.userId === v.userId) {
        setcurrentParticipant({image: v.profileImage, name: v.nickname});
      }
    });
  }, [participantsInfo]);

  return (
    <View
      style={{
        paddingVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Image
          source={{uri: url + '/images/' + currentParticipant?.image}}
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
          <TextKRBold style={{}}>{currentParticipant?.name}</TextKRBold>
        </View>
      </View>
      <View>
        {item.menu.map(v => (
          <Text style={styles.Description}>{`\u2022 ${v.name} / ${
            v.quantity
          }개 : ${formPrice(v.price)}원`}</Text>
        ))}
      </View>
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextKRReg style={{fontSize: 16, lineHeight: 24}}>총 금액</TextKRReg>
        <TextKRBold style={{fontSize: 16}}>
          {formPrice(item.userOrderTotal)}원
        </TextKRBold>
      </View>
    </View>
  );
};

const OrderMenuList = props => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  // const [FCMToken, setFCMToken] = useRecoilState(FCMTokenState);

  const id = props.route.params.id;
  const [recruitMenuInfo, setRecruitMenuInfo] = useState<recruitMenuI>();
  const getMenu = async id => {
    try {
      const JWTAccessToken = await getJWTToken();
      const chatMenu = await axios
        .get(chatRecruitURL + id + `/menu`, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        })
        .then(async function (response) {
          if (response.status === 200) {
            setRecruitMenuInfo(response.data);
            return response.data.recruitList;
          } else if (response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            if (result.status == 200) {
              const tokens = await result.data;
              const token = tokens.accessToken;
              const refToken = tokens.refreshToken;
              AsyncStorage.multiSet([
                ['@BaedalMate_JWTAccessToken', token],
                ['@BaedalMate_JWTRefreshToken', refToken],
              ]);
              if (result.status === 200) {
                getMenu(id);
              }
              return result;
            }
          }
          return false;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
      return chatMenu;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    getMenu(id);
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: WHITE_COLOR,
      }}>
      <ScrollView
        style={{
          backgroundColor: WHITE_COLOR,
          padding: 10,
        }}>
        <View
          style={{
            paddingVertical: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: LINE_GRAY_COLOR,
          }}>
          <TextKRBold style={styles.Title}>현재 총 주문 금액</TextKRBold>
          <TextKRReg style={{fontSize: 16, lineHeight: 24}}>
            {formPrice(recruitMenuInfo?.allOrderTotal)}원
          </TextKRReg>
        </View>
        <View style={{paddingBottom: 300}}>
          {recruitMenuInfo?.participants.map(v => (
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <OrderMenuItem item={v} id={id} />
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: LINE_GRAY_COLOR,
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {recruitMenuInfo && <MyOrderPriceInfo item={recruitMenuInfo} />}
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
