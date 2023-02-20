import React, {useEffect, useState} from 'react';
import DetailImage from 'components/atoms/Image/DetailImage';
import {
  ActionSheetIOS,
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
  detailRecruitI,
  getJWTToken,
  getRecruitDetailDataForUpdateAPI,
  postParticipateRecruitAPI,
} from 'components/utils/api/Recruit';
import {menuListI} from 'components/molecules/CreateRecruit/MenuList';
import {useForm} from 'react-hook-form';
import {
  WHITE_COLOR,
  PRIMARY_COLOR,
  DARK_GRAY_COLOR,
  ERROR_COLOR,
  LINE_GRAY_COLOR,
  BLACK_COLOR,
} from 'themes/theme';
import {Fonts} from 'assets/Fonts';
import PlatformImage from 'components/atoms/Image/PlatformImage';
import BtnMap from 'components/atoms/Button/BtnMap';
import {useNavigation} from '@react-navigation/native';
import BtnVerticalWhite from 'components/atoms/Button/BtnVerticalWhite';
import BtnVerticalGray from 'components/atoms/Button/BtnVerticalGray';
import {UserInfoI} from 'components/utils/api/User';
import {
  DormitoryDescriptionInput,
  PriceInput,
  CntInput,
} from 'components/atoms/CreateRecruit/Input';
import {TextKRBold, TextKRReg} from 'themes/text';
import MenuItem from 'components/atoms/CreateRecruit/MenuItem';
import {UsePopup, popupProps} from 'components/utils/usePopup';
import {postBlockAPI, postUnBlockAPI} from 'components/utils/api/Block';
import Toast from 'react-native-root-toast';
import {getChatRoomAPI} from 'components/utils/api/Chat';
import {refreshAPI} from 'components/utils/api/Login';
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
  // console.log(props.route.params, props.route.params.id);
  // const [recruitId, setRecruitId] = useState(-1);
  const navigation = useNavigation();
  // const [detailURL, setDetailURL] = useState(
  //   url + `/api/v1/recruit/${props.route.params.id}`,
  // );
  const detailURL = url + `/api/v1/recruit/${props.route.params.id}`;

  useEffect(() => {
    // setRecruitId(props.route.params.id);
    // setDetailURL(url + `/api/v1/recruit/${recruitId}`);
    console.log(props.route.params.id);
    getDetailData();
  }, [props.route.params.id]);

  const [itemDetaildata, setItemDetailData] = useState<RecruitItemProps>();
  const [modal, setModal] = useState(false);
  const [popupModal, setPopupModal] = useState(false);
  const handlePopupModal = () => {
    popupModal ? setPopupModal(false) : setPopupModal(true);
  };
  const [modalData, setModalData] = useState<popupProps>();
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
  const [dropdownModal, setDropdownModal] = useState(false);

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
  const closeRecruitModalData = {
    title: '모집을 마감하시겠습니까?',
    description:
      '모집 마감 시, 다른 참여자들이 해당 모집에 더 이상 참여할 수 없습니다.',
    modal: popupModal,
    handleModal: handlePopupModal,
    confirmEvent: closeRecruit,
    choiceCnt: 2,
  };
  const cancelRecruitModalData = {
    title: '모집을 취소하시겠습니까?',
    description: '모집 취소 시, 지금까지 진행된 모집이 중단됩니다.',
    modal: popupModal,
    handleModal: handlePopupModal,
    confirmEvent: cancelRecruit,
    choiceCnt: 2,
  };
  const cancelParticipateModalData = {
    title: '모집을 나가시겠습니까?',
    description: '',
    modal: popupModal,
    handleModal: handlePopupModal,
    confirmEvent: cancelParticipate,
    choiceCnt: 2,
  };
  const blockUser = async () => {
    if (itemDetaildata?.userInfo.userId) {
      console.log(itemDetaildata);
      console.log(itemDetaildata.userInfo.userId);
      const result = await postBlockAPI(itemDetaildata.userInfo.userId);
      if (result.result === 'success') {
        Toast.show('차단이 완료되었습니다.');
      } else {
        Toast.show('차단에 실패하였습니다.');
      }
      // if (result) {
      //   console.log('block user', result);
      // }
    }
  };
  const unblockUser = async () => {
    if (itemDetaildata?.userInfo.userId) {
      console.log(itemDetaildata);
      console.log(itemDetaildata.userInfo.userId);
      const result = await postUnBlockAPI(itemDetaildata.userInfo.userId);
      if (result.result === 'success') {
        Toast.show('차단 해제가 완료되었습니다.');
      } else {
        Toast.show('차단 해제에 실패하였습니다.');
      }
    }
  };
  const blockModalData = {
    title: itemDetaildata?.userInfo?.nickname + '님을 차단 하시겠습니까?',
    description:
      '차단하더라도, 해당 사용자가 주최자 역할이 아닌 참여하고 있는 모집글과 채팅방은 정상적으로 보여지게 됩니다.',
    modal: popupModal,
    handleModal: handlePopupModal,
    confirmEvent: blockUser,
    choiceCnt: 2,
  };
  const unblockModalData = {
    title: '차단을 해제하시겠습니까?',
    description: '해당 유저가 주최하는 모집글을 다시 볼 수 있게 됩니다.',
    modal: popupModal,
    handleModal: handlePopupModal,
    confirmEvent: unblockUser,
    choiceCnt: 2,
  };

  useEffect(() => {
    if (dropdownModal) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['취소', '차단하기', '신고하기'],
          // destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
          userInterfaceStyle: 'light',
          tintColor: BLACK_COLOR,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            handleDropdownModal();
          } else if (buttonIndex === 1) {
            setModalData(blockModalData);
            handlePopupModal();
            handleDropdownModal();
          } else if (buttonIndex === 2) {
            navigation.navigate(
              '게시글 신고하기' as never,
              {
                item: itemDetaildata,
                userInfo: itemDetaildata?.userInfo,
              } as never,
            );
            handleDropdownModal();
          } else {
            handleDropdownModal();
          }
        },
      );
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
    // const [accessToken, setJWTAccessToken] =
    //   useRecoilState(JWTAccessTokenState);
    // const [refreshToken, setJWTRefreshToken] =
    //   useRecoilState(JWTRefreshTokenState);
    // const [FCMToken, setFCMToken] = useRecoilState(FCMTokenState);

    const JWTAccessToken = await getJWTToken();
    try {
      const DetailData = axios
        .get(detailURL, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        })
        .then(async function (response) {
          if (response.status === 200) {
            response.data && setItemDetailData(response.data);
            return response.data;
          } else if (response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            if (result.status == 200) {
              const tokens = await result.data;
              const token = tokens.accessToken;
              const refToken = tokens.refreshToken;
              // setJWTAccessToken(token);
              // setJWTRefreshToken(refToken);

              if (result.status === 200) {
                getChatRoomAPI();
              }
              return result;
            }
          }
          return response;
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
  const [defaultItem, setDefaultItem] = useState<detailRecruitI>();

  const getDefaultItem = async () => {
    if (itemDetaildata?.host) {
      const id = itemDetaildata ? itemDetaildata.recruitId : -1;
      const result = await getRecruitDetailDataForUpdateAPI(id);
      console.log(result);
      setDefaultItem(result);
    }
  };

  useEffect(() => {
    getDetailData();
  }, []);
  useEffect(() => {
    getDefaultItem();
  }, [itemDetaildata]);
  // const particiPantsDropdownModalListData = [
  //   {id: 0, text: '모집 나가기', onclick: () => {}},
  // ];
  // const hostDropdownModalListData = [
  //   {id: 0, text: '모집 마감하기'},
  //   {id: 1, text: '모집 취소하기'},
  // ];

  return (
    <ScrollView style={{backgroundColor: WHITE_COLOR}}>
      {modalData && (
        <UsePopup
          title={modalData.title}
          description={modalData.description}
          modal={popupModal}
          handleModal={handlePopupModal}
          confirmEvent={modalData.confirmEvent}
          choiceCnt={modalData.choiceCnt}
        />
      )}
      <DetailImage item={itemDetaildata} />
      <PlatformImage item={itemDetaildata} />
      <BtnMap item={itemDetaildata} />
      <UserInfo item={itemDetaildata} />
      <Title item={itemDetaildata} />
      <ItemInfo item={itemDetaildata} />
      <Description item={itemDetaildata} defaultItem={defaultItem} />
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
                <BtnVerticalWhite
                  onPress={() => {
                    setModalData(cancelParticipateModalData);
                    handlePopupModal();
                    // cancelRecruit();
                  }}
                  text="모집 취소"
                />
              </View>
              <View style={{width: 10}} />
              <View style={{flex: 3}}>
                <BtnVerticalOrange
                  onPress={() => {
                    setModalData(closeRecruitModalData);
                    handlePopupModal();
                    // closeRecruit();
                  }}
                  text="모집 마감하기"
                />
              </View>
            </View>
          ) : itemDetaildata?.participate ? (
            <BtnVerticalOrange
              onPress={() => {
                setModalData(cancelParticipateModalData);
                handlePopupModal();
                // cancelParticipate();
              }}
              text="모집 나가기"
            />
          ) : (
            <BtnVerticalOrange
              onPress={() => {
                handleModal();
              }}
              text="모집 참여하기"
            />
          )
        ) : (
          <BtnVerticalGray onPress={() => {}} text="마감된 모집글입니다" />
        )}
      </View>
      <View>
        <Modal
          transparent={true}
          visible={modal}
          animationType={'fade'}
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
              keyboardVerticalOffset={-175}>
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
                <ScrollView>
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
                          // setValue={setValue}
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
                        // error={errors}
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
                </ScrollView>
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
