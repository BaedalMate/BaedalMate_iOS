import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
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
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import BtnCreateFloating from 'components/atoms/Button/BtnCreateFloating';
import SelectDropdown from 'react-native-select-dropdown';
import {Controller, useForm} from 'react-hook-form';
import PlatformSelect from 'components/atoms/Button/BtnPlatform';
import {userDormitoryState} from 'components/utils/recoil/atoms/User';
import {useRecoilState} from 'recoil';

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
  {id: 0, name: '누리학사', value: 'NURI'},
  {id: 1, name: '성림학사', value: 'SUNGLIM'},
  {id: 2, name: 'KB학사', value: 'KB'},
  {id: 3, name: '불암학사', value: 'BURAM'},
  {id: 4, name: '수림학사', value: 'SULIM'},
];
const CreateRecruit2 = props => {
  const defaultItem = props.route.params.defaultItem;
  const [dormitory, setDormitory] = useRecoilState(userDormitoryState);

  const getDormitoryIdx = dormitory => {
    let idx = -1;
    dormitoryList.forEach(element => {
      if (element.value === dormitory) {
        idx = element.id;
      }
    });
    return idx;
  };
  const [platform, setPlatform] = useState('BAEMIN');
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      dormitory:
        defaultItem && defaultItem.dormitory
          ? defaultItem.dormitory
          : dormitory.value,
      description:
        defaultItem && defaultItem.description ? defaultItem.description : '',
      platform:
        defaultItem && defaultItem.platform ? defaultItem.platform : 'BAEMIN',
      place: {
        name:
          defaultItem && defaultItem.place.name ? defaultItem.place.name : '',
        addressName:
          defaultItem && defaultItem.place.addressName
            ? defaultItem && defaultItem.place.addressName
            : '',
        roadAddressName:
          defaultItem && defaultItem.place.roadAddressName
            ? defaultItem && defaultItem.place.roadAddressName
            : '',
        x: defaultItem && defaultItem.place.x ? defaultItem.place.x : 0,
        y: defaultItem && defaultItem.place.y ? defaultItem.place.y : 0,
      },
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  });

  console.log(props.route.params);

  const onSubmit = data => {
    console.log(data);
    console.log(props.route.params);
    defaultItem
      ? props.navigation.navigate('상세 설정3', {
          data,
          name:
            data.place && data.place.name
              ? data.place.name
              : defaultItem.place.name
              ? defaultItem.place.name
              : '',
          addressName:
            data.place && data.place.addressName
              ? data.place.addressName
              : defaultItem.place.addressName
              ? defaultItem.place.addressName
              : '',
          roadAddressName:
            data.place && data.place.roadAddressName
              ? data.place.roadAddressName
              : defaultItem.place.roadAddressName
              ? defaultItem.place.roadAddressName
              : '',
          x:
            data.place && data.place.x
              ? data.place.x
              : defaultItem.place.x
              ? defaultItem.place.x
              : 0,
          y:
            data.place && data.place.y
              ? data.place.y
              : defaultItem.place.y
              ? defaultItem.place.y
              : 0,
          categoryId: props.route.params.data.data.categoryId,
          criteria: props.route.params.data.data.data.criteria,
          freeShipping: props.route.params.data.data.data.freeShipping,
          minPeople: props.route.params.data.data.data.minPeople,
          minPrice: Number(props.route.params.data.data.data.minPrice),
          deadlineDate: props.route.params.data.data.deadlineDate,
          shippingFee: props.route.params.data.data.shippingFee,
        })
      : props.navigation.navigate('상세 설정3', {
          data,
          categoryId: props.route.params.data.categoryId,
          criteria: props.route.params.data.data.criteria,
          freeShipping: props.route.params.data.data.freeShipping,
          minPeople: props.route.params.data.data.minPeople,
          minPrice: Number(props.route.params.data.data.minPrice),
          deadlineDate: props.route.params.data.deadlineDate,
          shippingFee: props.route.params.data.shippingFee,
        });
  };

  // const [locationObj, setLocationObj] = useState();

  useEffect(() => {
    setValue('place.name', props.route.params.name);
    setValue('place.addressName', props.route.params.addressName);
    setValue('place.roadAddressName', props.route.params.roadAddressName);
    setValue('place.x', props.route.params.x);
    setValue('place.y', props.route.params.y);
  }, [props.route.params.name]);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    defaultItem && defaultItem.platform && setPlatform(defaultItem.platform);
  }, [defaultItem]);
  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
        height: '100%',
      }}>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={statusBarHeight + 44}
        style={{height: '100%'}}>
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
              <TextKRBold style={styles.Title}>배달 내용 작성하기</TextKRBold>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
              }}>
              <TextKRBold style={styles.Label}>모이는 곳</TextKRBold>
              <TextKRReg style={styles.Description}>
                배달 받고 다른 사람들과 만날 건물을 선택해 주세요
              </TextKRReg>
              <View
                style={{
                  paddingVertical: 15,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{}}>서울과기대</Text>
                  <View
                    style={{
                      marginLeft: 30,
                      backgroundColor: WHITE_COLOR,
                      borderRadius: 10,
                      height: 45,
                      flex: 1,
                      // width: 50,
                      alignItems: 'flex-end',
                    }}>
                    <SelectDropdown
                      buttonStyle={{
                        backgroundColor: WHITE_COLOR,
                        borderRadius: 10,
                        height: 45,
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
                      defaultValueByIndex={
                        defaultItem && defaultItem.dormitory
                          ? getDormitoryIdx(defaultItem.dormitory)
                          : dormitory.id
                      }
                      renderDropdownIcon={() => {
                        return <Image source={BOTTOM_ARROW} />;
                      }}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setValue('dormitory', selectedItem.value);
                      }}
                      buttonTextAfterSelection={selectedItem => {
                        return selectedItem.name;
                      }}
                      rowTextForSelection={item => {
                        return item.name;
                      }}
                    />
                  </View>
                </View>
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
              <TextKRBold style={styles.Label}>배달 가게</TextKRBold>
              <View>
                <Controller
                  name="place.name"
                  control={control}
                  rules={{
                    required:
                      defaultItem && defaultItem.place.name ? false : true,
                  }}
                  defaultValue={''}
                  render={() => {
                    return (
                      <View style={{}}>
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
                              : defaultItem && defaultItem.place.name
                              ? defaultItem.place.name
                              : ''
                          }
                          onTouchStart={() => {
                            props.navigation.navigate('배달 가게 선택', {
                              data: props.route.params,
                            });
                          }}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                padding: 15,
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
                width: '100%',
              }}>
              <TextKRBold style={styles.Label}>이용할 배달 플랫폼</TextKRBold>
              <View style={{}}>
                <PlatformSelect
                  platform={platform}
                  setPlatform={setPlatform}
                  control={control}
                  name={'platform'}
                  rules={{required: true}}
                  setValue={setValue}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
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
