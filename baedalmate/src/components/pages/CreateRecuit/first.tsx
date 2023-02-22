import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {
  DARK_GRAY_COLOR,
  ERROR_COLOR,
  MAIN_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {BtnActive, BtnDeactive} from 'components/atoms/Button/BtnEndStandard';
import BtnCreateFloating from 'components/atoms/Button/BtnCreateFloating';
import {RadioButton} from 'react-native-paper';

import {useForm} from 'react-hook-form';
import {
  endStandardType,
  CntInput,
  PriceInput,
} from 'components/atoms/CreateRecruit/Input';
import {detailRecruitI, formDigitTwo} from 'components/utils/api/Recruit';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

const CreateRecruit1 = props => {
  console.log(props);

  const defaultItem: detailRecruitI =
    props.route.params && props.route.params.defaultItem
      ? props.route.params.defaultItem
      : undefined;
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [endStandard, setEndStandard] = useState<endStandardType>('NUMBER');
  const [checked, setChecked] = useState('true');
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const now = new Date();
  useEffect(() => {
    defaultItem &&
      (setTime(new Date(defaultItem.deadlineDate)),
      setChecked(defaultItem.freeShipping === true ? 'true' : 'false'));
  }, [defaultItem]);
  const showTimePicker = () => {
    setTimePicker(true);
  };
  const hideTimePicker = () => {
    setTimePicker(false);
  };
  const handleConfirm = data => {
    setTime(data);
    console.log(time.getTime(), now.getTime());
    time.getTime() < now.getTime() && time.setDate(time.getDate() + 1);
    hideTimePicker();
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      minPeople:
        defaultItem && defaultItem.minPeople ? defaultItem.minPeople : 1,
      minPrice: defaultItem && defaultItem.minPrice ? defaultItem.minPrice : '',
      criteria:
        defaultItem && defaultItem.criteria ? defaultItem.criteria : 'NUMBER',
      freeShipping:
        defaultItem && defaultItem.freeShipping === true ? true : false,
      shippingFee:
        defaultItem && defaultItem.shippingFee ? defaultItem.shippingFee : '',
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  useEffect(() => {
    defaultItem &&
      defaultItem.criteria &&
      setEndStandard(
        defaultItem.criteria === 'NUMBER'
          ? 'NUMBER'
          : defaultItem.criteria === 'PRICE'
          ? 'PRICE'
          : 'TIME',
      );
    defaultItem && setShippingFee(Number(defaultItem.shippingFee));
  }, [defaultItem]);
  const onSubmit = data => {
    console.log(data);
    const deadline = time;

    props.navigation.navigate('상세 설정2', {
      data,
      deadlineDate: new Date(
        deadline.getTime() - deadline.getTimezoneOffset() * 60000,
      ).toISOString(),
      shippingFee: shippingFee,
      categoryId: props.route.params.item.categoryId,
    });
  };

  useEffect(() => {
    Platform.OS == 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
      }}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={statusBarHeight + 44}>
        <ScrollView
          style={{
            backgroundColor: WHITE_COLOR,
            marginBottom: 150,
          }}>
          <View style={{}}>
            <View
              style={{
                padding: 15,
                display: 'flex',
              }}>
              <TextKRBold style={styles.Title}>모집 조건 작성하기</TextKRBold>
            </View>
            <View
              style={{
                backgroundColor: '#F7F8FA',
                borderBottomColor: WHITE_COLOR,

                borderBottomWidth: 5,
                paddingBottom: errors.minPeople ? 6 : 30,
              }}>
              <View
                style={{
                  padding: 15,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TextKRBold style={styles.Label}>최소 모집 인원</TextKRBold>
                <CntInput
                  name={'minPeople'}
                  control={control}
                  rules={{
                    required: true,
                    min: endStandard === 'NUMBER' ? 2 : 1,
                  }}
                  setValue={setValue}
                />
              </View>
              {errors.minPeople && (
                <Text style={styles.Validation}>
                  모집 인원이 마감 기준인 경우 2명 이상이어야 합니다
                </Text>
              )}
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
              <View style={{flexDirection: 'row'}}>
                <TextKRBold style={styles.Label}>최소 주문 금액</TextKRBold>
                {errors.minPrice && (
                  <Text style={styles.Validation}>
                    최소 주문 금액을 입력해주세요
                  </Text>
                )}
              </View>
              <TextKRReg style={styles.Description}>
                내가 배달 시키려는 금액보다 높게 설정해주세요
              </TextKRReg>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // paddingTop: 15,
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
                <PriceInput
                  error={errors}
                  name="minPrice"
                  control={control}
                  rules={{required: true}}
                />
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
                모집 시간에 도달하면 모집이 종료됩니다. 현재 시각 이전으로
                설정시, 다음 날 해당 시각으로 마감시간이 설정됩니다.{' '}
              </TextKRReg>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  margin: 'auto',
                  // marginHorizontal: 15,
                }}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 45,
                    borderRadius: 10,
                    backgroundColor: WHITE_COLOR,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={showTimePicker}>
                  <Text style={{fontSize: 16}}>
                    <Text style={{color: MAIN_GRAY_COLOR}}>
                      {formDigitTwo(time.getHours())}
                    </Text>{' '}
                    시{' '}
                    <Text style={{color: MAIN_GRAY_COLOR}}>
                      {formDigitTwo(time.getMinutes())}
                    </Text>{' '}
                    분
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={timePicker}
                  mode="time"
                  is24Hour={true}
                  confirmTextIOS="확인"
                  onConfirm={handleConfirm}
                  cancelTextIOS="취소"
                  onCancel={hideTimePicker}
                />
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
                {endStandard === 'NUMBER'
                  ? '최소 모집인원이 마감시간 내에 충족된 경우, 최소주문 금액에 관계없이 자동으로 모집이 종료됩니다. (모집성공) 마감시간 까지 최소 모집인원이 충족되지 못한경우, 모집이 취소됩니다. (모집실패)'
                  : endStandard === 'PRICE'
                  ? '최소 주문금액이 마감시간 내에 충족된 경우, 최소주문 금액에 관계없이 자동으로 모집이 종료됩니다. (모집성공) 마감시간 까지 최소 모집인원이 충족되지 못한경우, 모집이 취소됩니다. (모집실패)'
                  : '최소 모집인원과 최소주문 금액 목표에 관계없이 마감시간이 된 경우에만 모집이 종료됩니다.'}
              </TextKRReg>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                {endStandard === 'NUMBER' ? (
                  <>
                    <BtnActive
                      onPress={() => {
                        setEndStandard('NUMBER');
                        setValue('criteria', 'NUMBER');
                      }}
                      text={'모집 인원'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStandard('PRICE');
                        setValue('criteria', 'PRICE');
                      }}
                      text={'최소 주문'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStandard('TIME');
                        setValue('criteria', 'TIME');
                      }}
                      text={'마감 시간'}
                    />
                  </>
                ) : endStandard === 'PRICE' ? (
                  <>
                    <BtnDeactive
                      onPress={() => {
                        setEndStandard('NUMBER');
                        setValue('criteria', 'NUMBER');
                      }}
                      text={'모집 인원'}
                    />
                    <BtnActive
                      onPress={() => {
                        setEndStandard('PRICE');
                        setValue('criteria', 'PRICE');
                      }}
                      text={'최소 주문'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStandard('TIME');
                        setValue('criteria', 'TIME');
                      }}
                      text={'마감 시간'}
                    />
                  </>
                ) : (
                  <>
                    <BtnDeactive
                      onPress={() => {
                        setEndStandard('NUMBER');
                        setValue('criteria', 'NUMBER');
                      }}
                      text={'모집 인원'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStandard('PRICE');
                        setValue('criteria', 'PRICE');
                      }}
                      text={'최소 주문'}
                    />
                    <BtnActive
                      onPress={() => {
                        setEndStandard('TIME');
                        setValue('criteria', 'TIME');
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
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TextKRBold style={styles.Label}>예상 배달비</TextKRBold>
                {errors.shippingFee && (
                  <Text style={styles.Validation}>
                    예상 배달비를 작성해주세요
                  </Text>
                )}
              </View>
              <TextKRReg style={styles.Description}>
                최소 주문금액이상 주문시, 예상되는 배달비를 작성해주세요{' '}
              </TextKRReg>
              <View style={{}}>
                <RadioButton.Group
                  onValueChange={newCheck => {
                    setChecked(newCheck),
                      setValue(
                        'freeShipping',
                        newCheck === 'true' ? true : false,
                      );
                  }}
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
                        color={PRIMARY_COLOR}
                        uncheckedColor={MAIN_GRAY_COLOR}
                      />
                      <Text>무료배달</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Android
                        value={'false'}
                        color={PRIMARY_COLOR}
                        uncheckedColor={MAIN_GRAY_COLOR}
                      />
                      <Text>무료배달이 아니에요</Text>
                    </View>
                  </View>
                </RadioButton.Group>
                {checked === 'true' ? (
                  <></>
                ) : (
                  <View>
                    <View
                      style={{
                        padding: 15,
                        width: '100%',
                      }}>
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
                          예상 배달비
                        </TextKRReg>
                        <PriceInput
                          error={errors}
                          name="shippingFee"
                          control={control}
                          rules={{
                            required: checked === 'false' && true,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            marginHorizontal: 15,
          }}>
          <BtnCreateFloating
            onPress={handleSubmit(onSubmit)}
            text={'다음으로'}
            id={1}
          />
        </View>
      </KeyboardAvoidingView>
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
    marginLeft: 15,
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
    paddingBottom: 18,
  },
  avoidingView: {
    // flex: 1,
  },
  datePicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: PRIMARY_COLOR,
    textDecorationColor: PRIMARY_COLOR,
    backgroundColor: WHITE_COLOR,
  },
});

export default CreateRecruit1;
