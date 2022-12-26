import React, {useEffect, useState} from 'react';
import DetailImage from 'components/atoms/Image/DetailImage';
import {
  ActionSheetIOS,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
} from 'components/utils/Recruit';
import {menuListI} from 'components/molecules/CreateRecruit/MenuList';
import {useForm} from 'react-hook-form';
import {
  DormitoryDescriptionInput,
  PriceInput,
  CntInput,
} from 'components/atoms/CreateRecruit/Input';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  ERROR_COLOR,
} from 'themes/theme';
import {Fonts} from 'assets/Fonts';
import MenuItem from 'components/atoms/CreateRecruit/MenuItem';
import BtnAddMenu from 'components/atoms/Button/BtnAddMenu';
import BtnVerticalDeactive from 'components/atoms/Button/BtnVerticalDeactive';
import PlatformImage from 'components/atoms/Image/PlatformImage';
import BtnMap from 'components/atoms/Button/BtnMap';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
export interface RecruitItemProps {
  active: boolean;
  cancel: boolean;
  coupon: number;
  currentPeople: number;
  currentPrice: number;
  deadlineDate: string;
  description: string;
  dormitory: string;
  host: boolean;
  image: string;
  minPeople: number;
  minPrice: number;
  participate: boolean;
  place: {
    addressName: string;
    name: string;
    roadAddressName: string;
    x: number;
    y: number;
  };
  platform: string;
  profileImage: string;
  recruitId: number;
  score: number;
  shippingFee: number;
  shippingFeeDetail: [
    {
      lowerPrice: number;
      shippingFee: number;
      upperPrice: number;
    },
  ];
  title: string;
  userDormitory: string;
  username: string;
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
    <ScrollView>
      {/* <View>
        <Modal
          transparent={true}
          visible={dropdownModal}
          animationType={'fade'}
          onRequestClose={handleDropdownModal}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.45)',
              flex: 1,
              // flexDirection: 'column',
              // justifyContent: 'flex-end',
              // alignItems: 'center',
            }}>
            <View
              onTouchStart={handleDropdownModal}
              style={{
                width: '100%',
                height: '100%',
                margin: 10,
                // backgroundColor: 'rgba(0,0,0,0.45)',
                flex: 1,
                // flexDirection: 'column',
                // justifyContent: 'flex-start',
                // alignItems: 'flex-start',
              }}
            /> */}

      {/* <FlatList
                data={hostDropdownModalListData}
                renderItem={item => (
                  <TouchableOpacity>
                    <Text>{item.item.text}</Text>
                  </TouchableOpacity>
                )}></FlatList> */}
      {/* 
            <View>
              <FlatList
                style={{
                  margin: 10,
                  paddingVertical: 10,
                  bottom: 0,
                  backgroundColor: WHITE_COLOR,
                  // backgroundColor: `rgba(255,255,255,0.9)`,
                  borderRadius: 10,
                }}
                data={
                  itemDetaildata?.host
                    ? hostDropdownModalListData
                    : particiPantsDropdownModalListData
                }
                renderItem={item => (
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 15,
                      borderBottomWidth: itemDetaildata?.host
                        ? item.index === hostDropdownModalListData.length - 1
                          ? 0
                          : 1
                        : item.index ===
                          particiPantsDropdownModalListData.length - 1
                        ? 0
                        : 1,
                      borderBottomColor: LINE_GRAY_COLOR,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: DARK_GRAY_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {item.item.text}
                    </Text>
                  </TouchableOpacity>
                )}
              /> */}
      {
        // itemDetaildata?.host
        // ?
        // hostDropdownModalListData.map(v => (
        //   <View
        //     style={{
        //       margin: 10,
        //       paddingVertical: 20,
        //       bottom: 0,
        //       backgroundColor: WHITE_COLOR,
        //       borderRadius: 10,
        //     }}>
        //     <TouchableOpacity
        //       style={{
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //       }}>
        //       <Text>{v.text}</Text>
        //     </TouchableOpacity>
        //   </View>
        // ))
        //   : particiPantsDropdownModalListData.map(v => (
        //       <View
        //         style={{
        //           // backgroundColor: 'rgba(255,255,255,0.)',
        //           // flex: 1,
        //           // flexDirection: 'column',
        //           // width: '100%',
        //           margin: 10,
        //           // padding: 0,
        //           paddingVertical: 20,
        //           // position: 'absolute',
        //           // top: statusBarHeight + 90,
        //           // right: 10,
        //           bottom: 0,
        //           backgroundColor: WHITE_COLOR,
        //           borderRadius: 10,
        //           // paddingBottom: 43,
        //           // marginBottom: 43,
        //         }}>
        //         <TouchableOpacity
        //           style={{
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //           }}>
        //           <Text>{v.text}</Text>
        //         </TouchableOpacity>
        //       </View>
        // ))
      }
      {/* </View> */}
      {/* <FlatList
                data={
                  itemDetaildata?.host
                    ? hostDropdownModalListData
                    : particiPantsDropdownModalListData
                }
                renderItem={item => (
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{item.item.text}</Text>
                  </TouchableOpacity>
                )}
              /> */}
      {/* <View
                style={{
                  margin: 10,
                  paddingVertical: 20,
                  bottom: 0,
                  backgroundColor: WHITE_COLOR,
                  borderRadius: 10,
                  marginBottom: 43,
                }}>
                <TouchableOpacity
                  style={{justifyContent: 'center', alignItems: 'center'}} onPressOut={handleDropdownModal}>
                  <Text>{'취소'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View> */}

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
        {itemDetaildata?.host === true ? (
          <BtnVerticalOrange onPress={handleModal} text="메뉴 변경하기" />
        ) : itemDetaildata?.participate ? (
          <BtnVerticalOrange onPress={handleModal} text="메뉴 변경하기" />
        ) : (
          <BtnVerticalOrange onPress={handleModal} text="모집 참여하기" />
        )}
      </View>
      <View>
        <Modal
          transparent={true}
          visible={modal}
          animationType={'slide'}
          onRequestClose={handleModal}>
          <View
            // onTouchStart={handleModal}
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
                  padding: 15,
                  position: 'relative',
                  bottom: 0,
                  width: '100%',
                  height: 500,
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
                    }}>
                    <TextKRBold
                      style={{
                        fontSize: 18,
                        lineHeight: 22,
                        color: PRIMARY_COLOR,
                      }}>
                      메뉴 추가하기
                    </TextKRBold>
                  </View>
                  <View>
                    <TextKRReg
                      style={{
                        fontSize: 14,
                        lineHeight: 24,
                        color: DARK_GRAY_COLOR,
                      }}>
                      추가할 메뉴를 적고 메뉴의 금액을 하단에 적어주세요
                    </TextKRReg>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: LINE_GRAY_COLOR,
                      paddingBottom: 30,
                      marginBottom: 10,
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
                          // rules={{required: true}}
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

                          // rules={{required: true}}
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
                        // rules={{required: true}}
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
                      +메뉴 추가하기
                    </TextKRBold>
                  </TouchableOpacity>
                  <ScrollView
                    horizontal={true}
                    style={{
                      height: 120,
                      paddingTop: 10,
                      backgroundColor: '#F7F8FA',
                    }}
                    contentContainerStyle={{
                      flexGrow: 1,
                    }}>
                    {/* <BtnAddMenu onPress={handleSubmit(onSubmitMenu)} /> */}
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
                  </ScrollView>
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                    }}>
                    <TextKRBold
                      style={{
                        textAlign: 'center',
                        paddingTop: 10,
                        fontWeight: '700',
                        fontSize: 16,
                        lineHeight: 19,
                      }}>
                      모집참여 완료하기
                    </TextKRBold>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View>
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
