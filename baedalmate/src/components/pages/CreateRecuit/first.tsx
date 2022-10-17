import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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
  TimeInput,
} from 'components/atoms/CreateRecruit/Input';

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
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      minPeople: 1,
      minPrice: '',
      orderHour: '',
      orderMinute: '',
      criteria: 'NUMBER',
      freeShipping: true,
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
  const onSubmit = data => {
    console.log(data);
    const now = new Date();
    const deadline = new Date(now);
    deadline.setHours(now.getHours() + Number(data.orderHour));
    deadline.setMinutes(now.getMinutes() + Number(data.orderMinute));

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
    console.log('shippingFee', shippingFee);
    props.navigation.navigate('상세 설정2', {
      data,
      deadlineDate: deadline.toISOString(),
      shippingFee: shippingFee,
      categoryId: props.route.params.categoryId,
    });
  };

  // const [selection, setSelection] = useState({start: 0, end: 0});
  // const [minPrice, setMinPrice] = useState('');
  // const [minPeople, setMinPeople] = useState(1);
  // const [orderHour, setOrderHour] = useState('');
  // const [orderMinute, setOrderMinute] = useState('');
  // const [title, setTitle] = useState('');
  const [endStandard, setEndStadard] = useState<endStandardType>('people');
  const [checked, setChecked] = useState('true');
  // const ref = useRef(null);
  // const priceFormat = value => {
  //   return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // };
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [shippingFeeCnt, setShippingFeeCnt] = useState<number>(0);
  useEffect(() => {
    Platform.OS == 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  // const shippingFeeComponent = () => {
  //   const ret: JSX.Element[] = [];
  //   for (let i = 0; i < shippingFeeCnt + 1; i++) {
  //     ret.push(
  //       <DeliveryFee
  //         i={i}
  //         cnt={shippingFeeCnt}
  //         setCnt={setShippingFeeCnt}
  //         setShippingFeeList={setShippingFeeList}
  //         error={errors}
  //         name={'shippingFee'}
  //         control={control}
  //         rules={{
  //           required: checked === 'false' && true,
  //         }}
  //       />,
  //     );
  //   }
  //   return ret;
  // };

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
                error={errors}
                name={'minPeople'}
                control={control}
                rules={{required: true}}
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
                />
              </View>
              {/* <View
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
                <Controller
                  control={control}
                  rules={{required: true}}
                  name={'minPrice'}
                  render={({field: {onChange, onBlur, value}}) => (
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
                      value={value.toString().split('원')[0]}
                      onChangeText={onChange}>
                      원
                    </TextInput>
                  )}
                />
                {errors.minPrice && <Text>최소 주문 금액을 입력해주세요</Text>}
              </View> */}
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
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TimeInput
                  error={errors}
                  name={'orderHour'}
                  control={control}
                  rules={{required: true, min: 0}}
                />
                <TimeInput
                  error={errors}
                  name={'orderMinute'}
                  control={control}
                  rules={{required: true, min: 0, max: 59}}
                />
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
                {endStandard === 'people'
                  ? '모집 인원에 도달하면 '
                  : endStandard === 'price'
                  ? '최소 주문 금액에 도달하면 '
                  : '마감 시간이 되면 '}
                모집이 완료됩니다{' '}
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
                        setValue('criteria', 'NUMBER');
                      }}
                      text={'모집 인원'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStadard('price');
                        setValue('criteria', 'PRICE');
                      }}
                      text={'최소 주문'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStadard('time');
                        setValue('criteria', 'TIME');
                      }}
                      text={'마감 시간'}
                    />
                  </>
                ) : endStandard === 'price' ? (
                  <>
                    <BtnDeactive
                      onPress={() => {
                        setEndStadard('people');
                        setValue('criteria', 'NUMBER');
                      }}
                      text={'모집 인원'}
                    />
                    <BtnActive
                      onPress={() => {
                        setEndStadard('price');
                        setValue('criteria', 'PRICE');
                      }}
                      text={'최소 주문'}
                    />
                    <BtnDeactive
                      onPress={() => {
                        setEndStadard('time');
                        setValue('criteria', 'TIME');
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
                                rules={{required: checked === 'false' && true}}
                              />
                            </View>
                            {/* ))}
                          {shippingFeeFields.map((data, index) => ( */}
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
                                rules={{required: checked === 'false' && true}}
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
                        shippingFeeAppend({
                          name: `shippingFee[${shippingFeeCnt + 1}].name`,
                          value: '',
                        });
                        shippingFeeRangeAppend({
                          name: `shippingFeeRange[${shippingFeeCnt + 1}].name`,
                          value: '',
                        });
                        setValue(`shippingFee.${shippingFeeCnt + 1}.name`, '');
                        setValue(
                          `shippingFeeRange.${shippingFeeCnt + 1}.name`,
                          '',
                        );
                        setShippingFeeCnt(shippingFeeCnt + 1);
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
            onPress={
              handleSubmit(onSubmit)

              // (handleSubmit(onSubmit),
              //   () => props.navigation.navigate('상세 설정2')
              // )
            }
            //   () => {
            //   // handleSubmit(onSubmit);
            //   props.navigation.navigate('상세 설정2');
            // }

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
});

export default CreateRecruit1;
