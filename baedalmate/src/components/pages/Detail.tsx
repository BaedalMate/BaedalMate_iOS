import React, {useEffect, useState} from 'react';
import DetailImage from 'components/atoms/Image/DetailImage';
import {ActionSheetIOS, ScrollView, StyleSheet, View} from 'react-native';
import UserInfo from 'components/molecules/Detail/UserInfo';
import Title from 'components/molecules/Detail/Title';
import ItemInfo from 'components/molecules/Detail/ItemInfo';
import Description from 'components/molecules/Detail/Description';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import axios from 'axios';
import {url} from '../../../App';
import {
  cancelRecruitAPI,
  closeRecruitAPI,
  deleteRecruitOrderAPI,
  getJWTToken,
  postParticipateRecruitAPI,
} from 'components/utils/api/Recruit';
import {menuListI} from 'components/molecules/CreateRecruit/MenuList';
import {useForm} from 'react-hook-form';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  DARK_GRAY_COLOR,
  ERROR_COLOR,
} from 'themes/theme';
import {Fonts} from 'assets/Fonts';
import PlatformImage from 'components/atoms/Image/PlatformImage';
import BtnMap from 'components/atoms/Button/BtnMap';
import {useNavigation} from '@react-navigation/native';
import BtnVerticalWhite from 'components/atoms/Button/BtnVerticalWhite';
import BtnVerticalGray from 'components/atoms/Button/BtnVerticalGray';
import {UserInfoI} from 'components/utils/api/User';
export interface RecruitItemProps {
  recruitId: number;
  image: string;
  title: string;
  description: string;
  place: {
    name: string;
    addressName: string;
    roadAddressName: string;
    x: number;
    y: number;
  };
  platform: string;
  deadlineDate: string;
  shippingFee: number;
  shippingFeeDetail: {
    lowerPrice: number;
    shippingFee: number;
    upperPrice: number;
  }[];
  coupon: number;
  currentPeople: number;
  minPeople: number;
  currentPrice: number;
  minPrice: number;
  dormitory: string;
  active: boolean;
  cancel: boolean;
  host: boolean;
  participate: boolean;
  userInfo: UserInfoI;
}
export interface DetailProps {
  onPress(): void;
  route: {
    params: {
      id: number;
    };
  };
}

const BoardItemDetail = props => {
  const navigation = useNavigation();
  const detailURL = url + `/api/v1/recruit/${props.route.params.id}`;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [itemDetaildata, setItemDetailData] = useState<RecruitItemProps>();
  const [modal, setModal] = useState(false);
  const [dropdownModal, setDropdownModal] = useState(false);
  const [menuList, setMenuList] = useState<menuListI[]>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      quantity: 1,
    },
  });
  const onSubmitMenu = (data: menuListI) => {
    menuList ? setMenuList([...menuList, data]) : setMenuList([data]);
    // handleModal();
  };
  const onSubmit = async () => {
    // console.log(data);
    // menuList ? setMenuList([...menuList, data]) : setMenuList([data]);
    const result: any = await postParticipateRecruitAPI(
      menuList ? menuList : [],
      props.route.params.id,
    );
    console.log('post new recruit', result);
    if (result.status === 200) {
      handleModal();

      navigation.navigate(
        '채팅방' as never,
        {
          id: props.route.params.id,
        } as never,
      );
    }
  };
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };
  const handleDropdownModal = () => {
    dropdownModal
      ? (setDropdownModal(false), props.navigation.setParams({modal: false}))
      : (setDropdownModal(true), props.navigation.setParams({modal: true}));
  };
  const cancelRecruit = async () => {
    try {
      if (itemDetaildata) {
        const result = await cancelRecruitAPI(itemDetaildata?.recruitId);
        console.log('cancel Recruit', result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const closeRecruit = async () => {
    try {
      if (itemDetaildata) {
        const result = await closeRecruitAPI(itemDetaildata.recruitId);
        console.log('close Recruit', result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelParticipate = async () => {
    try {
      if (itemDetaildata) {
        const result = await deleteRecruitOrderAPI(itemDetaildata.recruitId);
        console.log('cancel Participate Recruit', result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (dropdownModal) {
      if (itemDetaildata?.host) {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['취소', '모집 마감하기', '모집 취소하기'],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
            userInterfaceStyle: 'light',
          },
          buttonIndex => {
            if (buttonIndex === 0) {
              handleDropdownModal();
            } else if (buttonIndex === 1) {
              closeRecruit();
              handleDropdownModal();
            } else if (buttonIndex === 2) {
              cancelRecruit();
              handleDropdownModal();
            } else {
              handleDropdownModal();
            }
          },
        );
      } else if (itemDetaildata?.participate) {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['취소', '모집 나가기'],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
            userInterfaceStyle: 'light',
          },
          buttonIndex => {
            if (buttonIndex === 0) {
              handleDropdownModal();
            } else if (buttonIndex === 1) {
              cancelParticipate();
              handleDropdownModal();
            } else {
              handleDropdownModal();
            }
          },
        );
      } else {
      }
    }
  }, [dropdownModal]);
  useEffect(() => {
    console.log(props.route.params.modal);
    props.route.params.modal && setDropdownModal(props.route.params.modal);
  }, [props.route.params]);

  const deleteMenu = id => {
    setMenuList(
      menuList?.filter((v, i) => {
        return id !== i;
      }),
    );
  };
  const getDetailData = async () => {
    const JWTAccessToken = await getJWTToken();
    try {
      const DetailData = axios
        .get(detailURL, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        })
        .then(function (response) {
          setItemDetailData(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
      return DetailData;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    getDetailData();
  }, []);

  // const particiPantsDropdownModalListData = [
  //   {id: 0, text: '모집 나가기', onclick: () => {}},
  // ];
  // const hostDropdownModalListData = [
  //   {id: 0, text: '모집 마감하기'},
  //   {id: 1, text: '모집 취소하기'},
  // ];
  return (
    <ScrollView style={{backgroundColor: WHITE_COLOR}}>
      <DetailImage item={itemDetaildata} />
      <PlatformImage item={itemDetaildata} />
      <BtnMap item={itemDetaildata} />
      <UserInfo item={itemDetaildata} />
      <Title item={itemDetaildata} />
      <ItemInfo item={itemDetaildata} />
      <Description item={itemDetaildata} />
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 30,
          marginBottom: 62,
        }}>
        {itemDetaildata?.active ? (
          itemDetaildata?.host === true ? (
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View style={{flex: 1}}>
                <BtnVerticalWhite onPress={() => {}} text="모집 취소" />
              </View>
              <View style={{width: 10}} />
              <View style={{flex: 4}}>
                <BtnVerticalOrange onPress={() => {}} text="모집 마감하기" />
              </View>
            </View>
          ) : itemDetaildata?.participate ? (
            <BtnVerticalOrange onPress={() => {}} text="모집 나가기" />
          ) : (
            <BtnVerticalOrange onPress={() => {}} text="모집 참여하기" />
          )
        ) : (
          <BtnVerticalGray onPress={() => {}} text="마감된 모집글입니다" />
        )}
      </View>
      {/* <View>
        <Modal
          transparent={true}
          visible={modal}
          animationType={'slide'}
          onRequestClose={handleModal}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.45)',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <View
              onTouchStart={handleModal}
              style={{
                width: '100%',
                height: '100%',
                flex: 1,
              }}
            />
            <KeyboardAvoidingView
              style={styles.avoidingView}
              behavior={Platform.select({ios: 'padding'})}
              keyboardVerticalOffset={statusBarHeight}>
              <View
                style={{
                  paddingVertical: 15,
                  position: 'relative',
                  bottom: 0,
                  width: '100%',
                  height: menuList && menuList?.length > 0 ? 620 : 420,
                  backgroundColor: WHITE_COLOR,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  paddingBottom: 30,
                }}>
                <KeyboardAvoidingView
                  behavior={Platform.select({ios: 'padding'})}
                  keyboardVerticalOffset={statusBarHeight + 44}>
                  <View
                    style={{
                      marginTop: 10,
                      marginBottom: 8,
                      paddingHorizontal: 15,
                    }}>
                    <TextKRBold
                      style={{
                        fontSize: 18,
                        lineHeight: 22,
                        color: PRIMARY_COLOR,
                      }}>
                      주문 메뉴 추가
                    </TextKRBold>
                  </View>
                  <View>
                    <TextKRReg
                      style={{
                        fontSize: 14,
                        lineHeight: 24,
                        color: DARK_GRAY_COLOR,
                        paddingHorizontal: 15,
                      }}>
                      추가할 메뉴와 금액을 작성하여, 모든 메뉴를 추가한 뒤{'\n'}
                      모집에 참여하세요
                    </TextKRReg>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: LINE_GRAY_COLOR,
                      paddingBottom: 30,
                      marginBottom: 10,
                      paddingHorizontal: 15,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <TextKRReg style={styles.Label}>메뉴</TextKRReg>
                      <View style={{width: '90%'}}>
                        <DormitoryDescriptionInput
                          error={errors}
                          name="name"
                          control={control}
                          setValue={setValue}
                          rules={{}}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 15,
                      }}>
                      <TextKRReg style={styles.Label}>금액</TextKRReg>
                      <View
                        style={{
                          width: '85%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: 15,
                        }}>
                        <PriceInput
                          error={errors}
                          name="price"
                          control={control}
                          rules={{}}
                          isLast={true}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 15,
                      }}>
                      <TextKRBold style={styles.Label}>수량</TextKRBold>
                      <CntInput
                        error={errors}
                        name={'quantity'}
                        control={control}
                        setValue={setValue}
                        rules={{}}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmitMenu)}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      paddingBottom: 15,
                    }}>
                    <TextKRBold
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        fontWeight: '700',
                        fontSize: 16,
                        lineHeight: 19,
                      }}>
                      메뉴 추가하기
                    </TextKRBold>
                  </TouchableOpacity>
                  {menuList && menuList.length > 0 && (
                    <ScrollView
                      horizontal={true}
                      style={{
                        height: 175,
                        backgroundColor: '#F7F8FA',
                        paddingBottom: 23,
                        marginBottom: 28,
                      }}
                      contentContainerStyle={{
                        flexGrow: 1,
                      }}>
                      <View style={{}}>
                        <TextKRBold
                          style={{
                            marginVertical: 15,
                            fontSize: 18,
                            lineHeight: 22,
                            color: PRIMARY_COLOR,
                            paddingHorizontal: 15,
                          }}>
                          현재 작성 메뉴
                        </TextKRBold>
                        <View style={{flexDirection: 'row'}}>
                          {menuList?.map((v, i) => {
                            return (
                              <MenuItem
                                key={i}
                                menu={v.name}
                                price={v.price}
                                cnt={v.quantity}
                                onPress={() => {
                                  deleteMenu(i);
                                }}
                              />
                            );
                          })}
                        </View>
                      </View>
                    </ScrollView>
                  )}
                  <View style={{paddingHorizontal: 15}}>
                    <BtnVerticalOrange
                      onPress={handleSubmit(onSubmit)}
                      text={'모집참여 완료하기'}></BtnVerticalOrange>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View> */}
    </ScrollView>
  );
};

export default BoardItemDetail;

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
