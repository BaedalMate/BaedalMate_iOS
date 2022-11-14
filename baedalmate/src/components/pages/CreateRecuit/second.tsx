import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {TextKRBold, TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {
  BOTTOM_ARROW,
  DARK_GRAY_COLOR,
  ERROR_COLOR,
  MAP_GRAY,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import BtnCreateFloating from 'components/atoms/Button/BtnCreateFloating';
import SelectDropdown from 'react-native-select-dropdown';
import {Controller, useForm} from 'react-hook-form';
import {
  DormitoryDescriptionInput,
  PriceInput,
} from 'components/atoms/CreateRecruit/Input';
import PlatformSelect from 'components/atoms/Button/BtnPlatform';
export type dormitory =
  | '누리학사'
  | '성림학사'
  | 'KB학사'
  | '불암학사'
  | '수림학사';
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
export const RESTAPI_KEY = '87b35370ef59bf008c5f34f627b1818b';
export const dormitoryList = [
  '누리학사',
  '성림학사',
  'KB학사',
  '불암학사',
  '수림학사',
];
const CreateRecruit2 = props => {
  const [platform, setPlatform] = useState('BAEMIN');
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      dormitory: '누리학사',
      description: '',
      platform: 'BAEMIN',
      coupon: 0,
      place: {
        name: '',
        addressName: '',
        roadAddressName: '',
        x: 0,
        y: 0,
      },
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  });
  console.log(props.route.params.data);

  const onSubmit = data => {
    console.log(data);
    console.log(props.route.params.data);
    props.navigation.navigate('상세 설정3', {
      data,
      categoryId: props.route.params.data.data.categoryId,
      criteria: props.route.params.data.data.data.criteria,
      freeShipping: props.route.params.data.data.data.freeShipping,
      minPeople: props.route.params.data.data.data.minPeople,
      minPrice: Number(props.route.params.data.data.data.minPrice),
      deadlineDate: props.route.params.data.data.deadlineDate,
      shippingFee: props.route.params.data.data.shippingFee,
    });
  };

  // const getPlace = async () => {
  //   // const place_name = await AsyncStorage.getItem('place_name');
  //   // const address_name = await AsyncStorage.getItem('address_name');
  //   // const road_address_name = await AsyncStorage.getItem('road_address_name');
  //   // const x = await AsyncStorage.getItem('x');
  //   // const y = await AsyncStorage.getItem('y');
  //   // console.log(location);
  //   const place = {
  //     addressName: address_name,
  //     name: place_name,
  //     roadAddressName: road_address_name,
  //     x: x,
  //     y: y,
  //   };
  //   console.log(place);
  //   return place;
  // };

  // useEffect(() => {
  //   getPlace();
  // });
  const [locationObj, setLocationObj] = useState();
  console.log(props.route.params);
  // const [location, setLocation] = useState();
  // const getLocalAPI = () => {
  //   const place = axios
  //     .get(`https://dapi.kakao.com/v2/local/search/keyword.${location}`, {
  //       headers: {Authorization: `KakaoAK ${RESTAPI_KEY}`},
  //     })
  //     .then(res => {
  //       const location = res.data.documents[0];
  //       console.log(location);
  //       setLocationObj({
  //         id: location.id,
  //         address_name: location.address_name,
  //         place_name: location.place_name,
  //         x: location.x,
  //         y: location.y,
  //       });
  //       return location;
  //     });
  //   console.log(place);
  // };
  // const

  useEffect(() => {
    setValue('place.name', props.route.params.name);
    setValue('place.addressName', props.route.params.addressName);
    setValue('place.roadAddressName', props.route.params.roadAddressName);
    setValue('place.x', props.route.params.x);
    setValue('place.y', props.route.params.y);
  }, [props.route.params.name]);
  const {StatusBarManager} = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
      }}>
      <KeyboardAvoidingView
        // style={styles.avoidingView}
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
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
              }}>
              <TextKRBold style={styles.Label}>배달 거점</TextKRBold>
              {/* <TextKRReg style={styles.Description}>
              모집 인원에 도달하면 모집이 완료됩니다
            </TextKRReg> */}
              <View
                style={{
                  paddingVertical: 15,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      marginRight: 30,
                    }}>
                    서울과기대
                  </Text>
                  {/* <DormitoryInput
                  error={errors}
                  name={'dormitory'}
                  control={control}
                  rules={{required: true}}
                  setValue={setValue}
                /> */}
                  <SelectDropdown
                    buttonStyle={{
                      // borderWidth: errors.place ? 1 : 0,
                      // borderColor: errors.place ? ERROR_COLOR : WHITE_COLOR,
                      backgroundColor: WHITE_COLOR,
                      borderRadius: 10,
                      height: 45,
                      flex: 1,
                      // width: 255,
                    }}
                    dropdownStyle={{
                      borderRadius: 10,
                      backgroundColor: WHITE_COLOR,
                    }}
                    buttonTextStyle={{
                      fontSize: 14,
                      lineHeight: 17,
                      fontWeight: '700',
                    }}
                    rowTextStyle={{
                      fontSize: 14,
                      lineHeight: 24,
                      fontWeight: '400',
                    }}
                    data={dormitoryList}
                    defaultValueByIndex={0}
                    defaultValue={''}
                    renderDropdownIcon={() => {
                      return <Image source={BOTTOM_ARROW} />;
                    }}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                      setValue('dormitory', selectedItem);
                    }}
                    buttonTextAfterSelection={selectedItem => {
                      return selectedItem;
                    }}
                    rowTextForSelection={item => {
                      return item;
                    }}
                  />
                </View>

                <DormitoryDescriptionInput
                  error={errors}
                  name={'description'}
                  control={control}
                  rules={{required: true}}
                  setValue={setValue}
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
              }}>
              <TextKRBold style={styles.Label}>
                배달 가게 <Image source={MAP_GRAY} />
              </TextKRBold>
              {/* {errors.place && (
              <Text style={styles.Validation}>
                배달 가게를 입력해주세요
              </Text>
            )} */}
              <View>
                <Controller
                  name="place.name"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  defaultValue={''}
                  render={() => {
                    return (
                      <View
                        style={
                          {
                            // borderWidth: errors.place. ? 1 : 0,
                            // borderColor: errors.place ? ERROR_COLOR : WHITE_COLOR,
                          }
                        }>
                        <TextInput
                          style={{
                            borderWidth: errors.place?.name ? 1 : 0,
                            borderColor: errors.place?.name
                              ? ERROR_COLOR
                              : WHITE_COLOR,

                            backgroundColor: WHITE_COLOR,
                            width: '100%',
                            height: 45,
                            borderRadius: 10,
                            padding: 15,
                          }}
                          value={
                            props.route.params.name
                              ? props.route.params.name
                              : ''
                          }
                          onTouchStart={() => {
                            props.navigation.navigate('배달 가게 선택', {
                              data: props.route.params,
                            });
                            setValue('place.name', props.route.params.name);
                            setValue(
                              'place.addressName',
                              props.route.params.addressName,
                            );
                            setValue(
                              'place.roadAddressName',
                              props.route.params.roadAddressName,
                            );
                            setValue('place.x', Number(props.route.params.x));
                            setValue('place.y', Number(props.route.params.y));
                          }}
                        />
                      </View>
                    );
                  }}
                />
                {/* <PlaceInput
                error={errors}
                name={'place'}
                control={control}
                rules={{required: true}}
                // setValue={setValue}
                value={props.route.params.name}
                navigation={props.navigation}
              /> */}
                {/* <TextInput
                style={{
                  backgroundColor: WHITE_COLOR,
                  width: '100%',
                  height: 45,
                  borderRadius: 10,
                  padding: 15,
                }}
                value={props.route.params.name ? props.route.params.name : ''}
                onTouchStart={() => props.navigation.navigate('배달 가게 선택')}
                {...register('place', {required: true})}
              /> */}
              </View>
            </View>
            <View
              style={{
                padding: 15,
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
              }}>
              <TextKRBold style={styles.Label}>배달 플랫폼</TextKRBold>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <PlatformSelect
                  setPlatform={setPlatform}
                  control={control}
                  name={'platform'}
                  rules={{required: true}}
                  setValue={setValue}
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
              }}>
              <TextKRBold style={styles.Label}>쿠폰 입력</TextKRBold>
              <TextKRReg style={styles.Description}>
                기존 금액에서 주최자의 쿠폰 사용금액만큼 할인된 후 배달비가
                나누기 됩니다.
              </TextKRReg>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
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
                  name={'coupon'}
                  control={control}
                  rules={{required: true}}
                  isLast={true}
                />
                {/* <TextInput
                style={{
                  backgroundColor: WHITE_COLOR,
                  width: 300,
                  height: 45,
                  borderRadius: 10,
                  padding: 15,
                  textAlign: 'right',
                }}
                keyboardType={'number-pad'}
                // ref={ref}
                value={
                  minPrice.toString().split('원')[0]
                  // priceFormat(minPrice.toString().split('원')[0])
                  // .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }>
                원
              </TextInput> */}
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
            id={2}
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
    // textAlign: 'center',
    textAlignVertical: 'center',
  },
  Label: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 15,
    // textAlign: 'center',
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
  },
});

export default CreateRecruit2;
