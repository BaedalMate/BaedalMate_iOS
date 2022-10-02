import React, {useEffect, useRef, useState} from 'react';
import DetailImage from 'components/atoms/Image/DetailImage';
import {
  Image,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import UserInfo from 'components/molecules/Detail/UserInfo';
import Title from 'components/molecules/Detail/Title';
import ItemInfo from 'components/molecules/Detail/ItemInfo';
import Description from 'components/molecules/Detail/Description';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileImage from 'components/atoms/Image/UserImage';
import {TextKRBold, TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {
  DARK_GRAY_COLOR,
  DECREASE_ACTIVE,
  DECREASE_DEACTIVE,
  INCREASE_ACTIVE,
  LINE_GRAY_COLOR,
  MAIN_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {useNavigation} from '@react-navigation/native';
import BtnHorizontal3 from 'components/molecules/Button/BtnHorizontal3';
import BtnRadio from 'components/atoms/Button/BtnRadio';
import {BtnActive, BtnDeactive} from 'components/atoms/Button/BtnEndStandard';
import BtnCreateFloating from 'components/atoms/Button/BtnCreateFloating';
import {RadioButton} from 'react-native-paper';
import DeliveryFee from 'components/atoms/CreateRecruit/DeliveryFee';
import BtnAddDeliveryFee from 'components/atoms/Button/BtnAddDeliveryFee';

export interface RecruitItemProps {
  createDate: string;
  deadlineDate: string;
  deliveryFee: number;
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
type endStandardType = 'people' | 'price' | 'time';
export interface deliveryFeeProps {
  i: number;
  cnt: number;
  setCnt: (cnt: number) => void;
}
const CreateRecruit1 = props => {
  const [minPrice, setMinPrice] = useState('');
  const [minPeople, setMinPeople] = useState(1);
  const [title, setTitle] = useState('');
  const [endStandard, setEndStadard] = useState<endStandardType>('people');
  const [checked, setChecked] = useState('true');
  const ref = useRef(null);
  const priceFormat = value => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [deliveryFeeRangeStart, setDeliveryFeeRangeStart] = useState([]);
  const [deliveryFeeRangeEnd, setDeliveryFeeRangeEnd] = useState([]);
  const [deliveryFeeList, setDeliveryFeeList] = useState([]);
  const [deliveryFeeCnt, setDeliveryFeeCnt] = useState<number>(0);
  useEffect(() => {
    Platform.OS == 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);
  const deliveryFeeComponent = () => {
    const ret: JSX.Element[] = [];
    for (let i = 0; i < deliveryFeeCnt + 1; i++) {
      ret.push(
        <DeliveryFee i={i} cnt={deliveryFeeCnt} setCnt={setDeliveryFeeCnt} />,
      );
    }
    return ret;
  };
  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
      }}>
      <ScrollView
        style={{
          backgroundColor: WHITE_COLOR,
          marginBottom: 150,
        }}>
        <KeyboardAvoidingView
          style={styles.avoidingView}
          behavior={Platform.select({ios: 'padding'})}
          keyboardVerticalOffset={statusBarHeight + 44}>
          <View style={{}}>
            <View
              style={{
                padding: 15,
                display: 'flex',
              }}>
              <TextKRBold style={styles.Title}>주문 조건</TextKRBold>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
                justifyContent: 'space-between',
                paddingBottom: 30,
              }}>
              <TextKRBold style={styles.Label}>최소 모집 인원</TextKRBold>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (minPeople > 1) {
                      setMinPeople(minPeople - 1);
                    }
                  }}>
                  {minPeople <= 1 ? (
                    <Image
                      source={DECREASE_DEACTIVE}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 38,
                      }}
                    />
                  ) : (
                    <Image
                      source={DECREASE_ACTIVE}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 38,
                      }}
                    />
                  )}
                </TouchableOpacity>
                <TextKRBold style={styles.Label}>{minPeople}인</TextKRBold>
                <TouchableOpacity
                  onPress={() => {
                    setMinPeople(minPeople + 1);
                  }}>
                  <Image
                    source={INCREASE_ACTIVE}
                    style={{
                      width: 30,
                      height: 30,
                      marginLeft: 38,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
                paddingBottom: 30,
              }}>
              <TextKRBold style={styles.Label}>최소 주문 금액</TextKRBold>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 15,
                }}>
                <TextKRReg
                  style={{
                    fontSize: 14,
                    lineHeight: 24,
                    fontStyle: 'normal',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  금액
                </TextKRReg>
                <TextInput
                  style={{
                    backgroundColor: WHITE_COLOR,
                    width: 300,
                    height: 45,
                    borderRadius: 10,
                    padding: 15,
                    textAlign: 'right',
                    fontFamily: Fonts.Ko,
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: 16,
                    lineHeight: 19,
                    // textAlign: 'center',
                    textAlignVertical: 'center',
                  }}
                  keyboardType={'number-pad'}
                  ref={ref}
                  value={
                    minPrice.toString().split('원')[0]
                    // priceFormat(minPrice.toString().split('원')[0])
                    // .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  onChangeText={newMinPrice => setMinPrice(newMinPrice)}>
                  원
                </TextInput>
              </View>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
                paddingBottom: 30,
              }}>
              <TextKRBold style={styles.Label}>마감 시간 설정</TextKRBold>
              <TextKRReg style={styles.Description}>
                모집 인원에 도달하면 모집이 완료됩니다
              </TextKRReg>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={{
                    backgroundColor: WHITE_COLOR,
                    width: '40%',
                    height: 45,
                    borderRadius: 10,
                    padding: 15,
                    textAlign: 'right',
                  }}
                  keyboardType={'number-pad'}>
                  시간
                </TextInput>
                <TextInput
                  style={{
                    backgroundColor: WHITE_COLOR,
                    width: '40%',
                    height: 45,
                    borderRadius: 10,
                    padding: 15,
                    textAlign: 'right',
                  }}
                  keyboardType={'number-pad'}>
                  분
                </TextInput>
                <TextKRReg>뒤 주문</TextKRReg>
              </View>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
                paddingBottom: 30,
              }}>
              <TextKRBold style={styles.Label}>마감 기준</TextKRBold>
              <TextKRReg style={styles.Description}>
                모집 인원에 도달하면 모집이 완료됩니다
              </TextKRReg>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {endStandard === 'people' ? (
                  <>
                    <BtnActive
                      onPress={() => {
                        setEndStadard('people');
                      }}
                      text={'모집 인원'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStadard('price');
                      }}
                      text={'최소 주문'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStadard('time');
                      }}
                      text={'마감 시간'}
                    />
                  </>
                ) : endStandard === 'price' ? (
                  <>
                    <BtnDeactive
                      onPress={() => {
                        setEndStadard('people');
                      }}
                      text={'모집 인원'}
                    />
                    <BtnActive
                      onPress={() => {
                        setEndStadard('price');
                      }}
                      text={'최소 주문'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStadard('time');
                      }}
                      text={'마감 시간'}
                    />
                  </>
                ) : (
                  <>
                    <BtnDeactive
                      onPress={() => {
                        setEndStadard('people');
                      }}
                      text={'모집 인원'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStadard('price');
                      }}
                      text={'최소 주문'}
                    />
                    <BtnActive
                      onPress={() => {
                        setEndStadard('time');
                      }}
                      text={'마감 시간'}
                    />
                  </>
                )}
              </View>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
              }}>
              <TextKRBold style={styles.Label}>배달비 구간 설정</TextKRBold>
              <TextKRReg style={styles.Description}>
                주문금액 별 배달금액을 설정해주세요
              </TextKRReg>
              <View style={{}}>
                <RadioButton.Group
                  onValueChange={newCheck => setChecked(newCheck)}
                  value={checked}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Android
                        value={'true'}
                        // status={checked === 'true' ? 'checked' : 'unchecked'}
                        // onPress={() => setChecked('true')}
                        color={PRIMARY_COLOR}
                        uncheckedColor={MAIN_GRAY_COLOR}
                      />
                      <Text>무료배송</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Android
                        value={'false'}
                        // status={checked === 'false' ? 'checked' : 'unchecked'}
                        // onPress={() => setChecked('false')}
                        color={PRIMARY_COLOR}
                        uncheckedColor={MAIN_GRAY_COLOR}
                      />
                      <Text>무료배송이 아니에요</Text>
                    </View>
                  </View>
                </RadioButton.Group>
                {checked === 'true' ? (
                  <></>
                ) : (
                  <View>
                    {deliveryFeeComponent()}
                    <BtnAddDeliveryFee
                      onPress={() => {
                        setDeliveryFeeCnt(deliveryFeeCnt + 1);
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 15,
        }}>
        <BtnCreateFloating
          onPress={() => props.navigation.navigate('상세 설정2')}
          text={'다음으로'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: 18,
  },
  avoidingView: {
    flex: 1,
  },
});

export default CreateRecruit1;
