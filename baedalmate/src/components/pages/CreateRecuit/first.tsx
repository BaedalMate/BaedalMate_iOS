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

import {useFieldArray, useForm} from 'react-hook-form';
import BtnRemoveDeliveryFee from 'components/atoms/Button/BtnRemoveDeliveryFee';
import BtnAddDeliveryFee from 'components/atoms/Button/BtnAddDeliveryFee';
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
  const [shippingFeeCnt, setShippingFeeCnt] = useState<number>(0);
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
    // time.getHours() < data.getHours() && data.setDate(data.getDate() + 1);

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
      shippingFeeRange: [{name: ``, value: ''}],
      shippingFee: [{name: '', value: ''}],
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  });
  const {
    fields: shippingFeeFields,
    append: shippingFeeAppend,
    remove: shippingFeeRemove,
  } = useFieldArray({
    control,
    name: 'shippingFee',
  });
  const {
    fields: shippingFeeRangeFields,
    append: shippingFeeRangeAppend,
    remove: shippingFeeRangeRemove,
  } = useFieldArray({
    control,
    name: 'shippingFeeRange',
  });
  useEffect(() => {
    if (defaultItem) {
      const defaultShippingFee = defaultItem.shippingFee;
      shippingFeeRemove();
      shippingFeeRangeRemove();

      defaultShippingFee.map((item, idx) => {
        shippingFeeAppend({
          name: `${item.shippingFee}`,
          value: '',
        });
        shippingFeeRangeAppend({
          name: `${item.lowerPrice}`,
          value: '',
        });
      });
      setValue(`shippingFee.${defaultShippingFee.length}.name`, '');
      setValue(`shippingFeeRange.${defaultShippingFee.length}.name`, '');
      setShippingFeeCnt(defaultShippingFee.length);
    }
    defaultItem &&
      defaultItem.criteria &&
      setEndStandard(
        defaultItem.criteria === 'NUMBER'
          ? 'NUMBER'
          : defaultItem.criteria === 'PRICE'
          ? 'PRICE'
          : 'TIME',
      );
  }, [defaultItem]);
  const onSubmit = data => {
    console.log(data);
    const deadline = time;

    const shippingFee: {
      lowerPrice: number;
      shippingFee: number;
      upperPrice: number;
    }[] = [];
    if (!data.freeShipping) {
      for (let i = 0; i < data.shippingFee.length - 1; i++) {
        shippingFee.push({
          lowerPrice: Number(data.shippingFeeRange[i].name),
          shippingFee: Number(data.shippingFee[i].name),
          upperPrice: Number(data.shippingFeeRange[i + 1].name),
        });
      }
      shippingFee.push({
        lowerPrice: Number(
          data.shippingFeeRange[data.shippingFee.length - 1].name,
        ),
        shippingFee: Number(data.shippingFee[data.shippingFee.length - 1].name),
        upperPrice: Number(0),
      });
    }
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

  useEffect(() => {
    console.log(shippingFeeFields, shippingFeeRangeFields);
  }, [shippingFeeFields, shippingFeeRangeFields]);
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
              <TextKRBold style={styles.Title}>주문 조건</TextKRBold>
            </View>
            {errors.minPeople && (
              <Text style={styles.Validation}>
                모집 인원이 마감 기준인 경우 2명 이상이어야 합니다.
              </Text>
            )}
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
              <CntInput
                name={'minPeople'}
                control={control}
                rules={{required: true, min: endStandard === 'NUMBER' ? 2 : 1}}
                setValue={setValue}
              />
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
                <PriceInput
                  error={errors}
                  name="minPrice"
                  control={control}
                  rules={{required: true}}
                  isLast={true}
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
                마감시간이 되면 모집이 완료됩니다
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
                <TextKRBold style={styles.Label}>배달비 구간 설정</TextKRBold>
                {(errors.shippingFee || errors.shippingFeeRange) && (
                  <Text style={styles.Validation}>
                    올바른 구간 설정이 아닙니다
                  </Text>
                )}
              </View>
              <TextKRReg style={styles.Description}>
                주문금액 별 배달금액을 설정해주세요
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
                      <Text>무료배송</Text>
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
                      <Text>무료배송이 아니에요</Text>
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
                      {shippingFeeRangeFields.map((data, index) => (
                        <View
                          key={index}
                          style={{
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: 15,
                          }}>
                          <View
                            style={{
                              width: '100%',
                            }}>
                            <View
                              style={{
                                width: '95%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                              <TextKRReg
                                style={{
                                  width: '20%',
                                  fontSize: 14,
                                  lineHeight: 24,
                                  fontStyle: 'normal',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}>
                                구간 {index + 1}
                              </TextKRReg>
                              <PriceInput
                                error={errors}
                                name={`shippingFeeRange[${index}].name`}
                                control={control}
                                rules={{
                                  required: checked === 'false' && true,
                                  validate: v =>
                                    shippingFeeRangeFields.length > 0
                                      ? Number(v) >= 0
                                      : Number(v) >
                                        Number(
                                          shippingFeeRangeFields[
                                            shippingFeeRangeFields.length - 1
                                          ],
                                        ),
                                }}
                                isLast={
                                  shippingFeeRangeFields.length - 1 === index
                                    ? true
                                    : false
                                }
                              />
                            </View>
                            <View
                              style={{
                                width: '95%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: 15,
                              }}>
                              <TextKRReg
                                style={{
                                  width: '20%',
                                  fontSize: 14,
                                  lineHeight: 20,
                                  fontStyle: 'normal',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}>
                                배달비
                              </TextKRReg>
                              <PriceInput
                                error={errors}
                                name={`shippingFee[${index}].name`}
                                control={control}
                                rules={{
                                  required: checked === 'false' && true,
                                }}
                                isLast={
                                  shippingFeeRangeFields.length - 1 === index
                                    ? true
                                    : false
                                }
                              />
                            </View>
                          </View>
                          {shippingFeeCnt > 0 && index > 0 && (
                            <BtnRemoveDeliveryFee
                              onPress={() => {
                                setShippingFeeCnt(shippingFeeCnt - 1);
                                shippingFeeRemove(shippingFeeCnt);
                                shippingFeeRangeRemove(shippingFeeCnt);
                              }}
                            />
                          )}
                        </View>
                      ))}
                    </View>
                    <BtnAddDeliveryFee
                      onPress={() => {
                        const values = getValues([
                          `shippingFee`,
                          `shippingFeeRange`,
                        ]);
                        if (
                          values[0][shippingFeeCnt].name && shippingFeeCnt > 0
                            ? values[1][shippingFeeCnt].name >
                              values[1][shippingFeeCnt - 1].name
                            : values[1][shippingFeeCnt].name
                        ) {
                          shippingFeeAppend({
                            name: `shippingFee.${shippingFeeCnt + 1}.name`,
                            value: '',
                          });
                          shippingFeeRangeAppend({
                            name: `shippingFeeRange.${shippingFeeCnt + 1}.name`,
                            value: '',
                          });

                          setValue(
                            `shippingFee.${shippingFeeCnt + 1}.name`,
                            '',
                          );
                          setValue(
                            `shippingFeeRange.${shippingFeeCnt + 1}.name`,
                            '',
                          );
                          setShippingFeeCnt(shippingFeeCnt + 1);
                          // if (
                          //   shippingFeeRangeFields[shippingFeeCnt].name &&
                          //   shippingFeeFields[shippingFeeCnt].name
                          // ) {
                          //   setShippingFeeCnt(shippingFeeCnt - 1);
                          //   shippingFeeRemove(shippingFeeCnt);
                          //   shippingFeeRangeRemove(shippingFeeCnt);
                          // }
                        }
                      }}
                    />
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
