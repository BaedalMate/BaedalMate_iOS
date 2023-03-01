import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {TextKRBold, TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {
  DARK_GRAY_COLOR,
  ERROR_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import BtnCreateFloating from 'components/atoms/Button/BtnCreateFloating';
import MenuList from 'components/molecules/CreateRecruit/MenuList';
import {
  formPrice,
  menuI,
  postRecruitAPI,
  postRecruitI,
  shippingFeeI,
  updateRecruitAPI,
} from 'components/utils/api/Recruit';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshAPI} from 'components/utils/api/Login';

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

export interface menuProps {
  id: number;
  menu: string;
  price: number;
  cnt: number;
}

const CreateRecruit4 = props => {
  const defaultItem = props.route.params.defaultItem;

  console.log(props.route.params);
  const [menuList, setMenuList] = useState<menuI[]>();
  const [menuTotalPrice, setMemuTotalPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState<shippingFeeI[]>(
    props.route.params.shippingFee,
  );
  const [shippingFee, setShippingFee] = useState(0);
  // const [couponPrice, setCouponPrice] = useState(
  //   props.route.params.data.coupon,
  // );

  useEffect(() => {
    let price = 0;
    menuList?.map((v, i) => {
      price += v.price * v.quantity;
    });
    setMemuTotalPrice(price);
    setShippingFee(props.route.params.shippingFee);
    // setCouponPrice(props.route.params.data.coupon);
  }, [menuList, deliveryFee]);
  console.log(menuList);

  useEffect(() => {
    !props.route.params.freeShipping &&
      props.route.params.shippingFee &&
      setShippingFee(props.route.params.shippingFee);
  }, []);
  useEffect(() => {
    defaultItem && defaultItem.tags && setMenuList(defaultItem.menu);
  }, [defaultItem]);

  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
        height: '100%',
      }}>
      <ScrollView
        style={{
          backgroundColor: WHITE_COLOR,
          marginBottom: 150,
        }}>
        <View style={{}}>
          <View>
            <View
              style={{
                padding: 15,
                display: 'flex',
              }}>
              <TextKRBold style={styles.Title}>주문할 메뉴 고르기</TextKRBold>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TextKRBold style={styles.Label}>내가 주문할 메뉴들</TextKRBold>
                {props.route.params.criteria === 'PRICE' &&
                  menuTotalPrice >= props.route.params.minPrice && (
                    <Text style={styles.Validation}>
                      {formPrice(props.route.params.minPrice)} 원 보다 적게
                      시켜야 해요
                    </Text>
                  )}
              </View>
              <TextKRReg style={styles.Description}>
                내가 시킬 메뉴들을 작성해주세요!
              </TextKRReg>
              <View>
                <MenuList menuList={menuList} setMenuList={setMenuList} />
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                padding: 15,
                display: 'flex',
              }}>
              <TextKRBold style={styles.Title}>주문 예정 금액</TextKRBold>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
              }}>
              <TextKRBold style={styles.Label}>현재 주문예정 금액</TextKRBold>
              <View
                style={{
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                  borderBottomWidth: 1,
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
                      lineHeight: 19,
                      fontStyle: 'normal',
                    }}>
                    {formPrice(menuTotalPrice)} 원
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
                    + {formPrice(shippingFee)} 원
                  </TextKRReg>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                  }}>
                  <TextKRBold
                    style={{
                      fontSize: 16,
                      lineHeight: 19,
                      fontStyle: 'normal',
                    }}>
                    {formPrice(menuTotalPrice + shippingFee)} 원
                  </TextKRBold>
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextKRBold style={styles.Label}>결제 예정 금액</TextKRBold>

                  <TextKRBold
                    style={{
                      fontSize: 24,
                      lineHeight: 29,
                      fontStyle: 'normal',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <TextKRBold
                      style={{
                        color: PRIMARY_COLOR,
                        fontSize: 24,
                        lineHeight: 29,
                      }}>
                      {formPrice(menuTotalPrice + shippingFee)}
                    </TextKRBold>
                    원
                  </TextKRBold>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          marginHorizontal: 15,
        }}>
        <BtnCreateFloating
          onPress={async () => {
            // const result = await postRecruitAPI();
            // let dorm =
            //   props.route.params.data.dormitory === '누리학사'
            //     ? 'NURI'
            //     : props.route.params.data.dormitory === '성림학사'
            //     ? 'SUNGLIM'
            //     : props.route.params.data.dormitory === '수림학사'
            //     ? 'SULIM'
            //     : props.route.params.data.dormitory === '불암학사'
            //     ? 'BURAM'
            //     : 'KB';
            console.log(
              props.route.params.criteria === 'PRICE',
              menuTotalPrice >= props.route.params.minPrice,
            );
            if (!menuList || (menuList && menuList?.length <= 0)) {
              Toast.show('메뉴를 추가해 주세요.');
              return;
            } else if (
              props.route.params.criteria === 'PRICE' &&
              menuTotalPrice >= props.route.params.minPrice
            ) {
              // Toast.show(
              //   '모집기준이 금액인 경우, 메뉴의 총 금액이 최소금액보다 작아야 합니다.',
              // );
              return;
            } else {
              if (props.route.params.type === 'UPDATE') {
                let data: postRecruitI = {
                  categoryId: props.route.params.categoryId,
                  criteria: props.route.params.criteria,
                  // coupon: 주Number(props.route.params.data.coupon),
                  dormitory: props.route.params.data.dormitory,
                  deadlineDate: props.route.params.deadlineDate,
                  description: props.route.params.description,
                  freeShipping: props.route.params.freeShipping,
                  menu: menuList ? menuList : [],
                  place: props.route.params.data.place,
                  platform: props.route.params.data.platform,
                  title: props.route.params.title,
                  tags: props.route.params.tags,
                  shippingFee: props.route.params.shippingFee,
                  minPrice: props.route.params.minPrice,
                  minPeople: props.route.params.minPeople,
                };
                console.log('data', data);
                const result = await updateRecruitAPI(
                  defaultItem.recruitId,
                  data,
                );
                console.log('update recruit', result);
                if (result.status == 200) {
                  Toast.show('모집글을 성공적으로 수정했습니다.');
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: '홈' as never}],
                  }),
                    props.navigation.reset({
                      index: 1,
                      routes: [
                        {
                          name: '글 상세 보기' as never,
                          params: {id: result.data.id},
                        },
                      ],
                    });
                } else if (result.status == 401) {
                  const result = await refreshAPI();
                  console.log(result);
                  const tokens = await result.data;
                  const token = tokens.accessToken;
                  const refToken = tokens.refreshToken;

                  AsyncStorage.multiSet([
                    ['@BaedalMate_JWTAccessToken', token],
                    ['@BaedalMate_JWTRefreshToken', refToken],
                  ]);
                  // setJWTAccessToken(token);
                  // setJWTRefreshToken(refToken);
                  const reResult = await updateRecruitAPI(
                    defaultItem.recruitId,
                    data,
                  );
                  console.log(reResult);
                  if (reResult.status == 200) {
                    Toast.show('모집글을 성공적으로 수정했습니다.');
                    props.navigation.reset({
                      index: 0,
                      routes: [{name: '홈' as never}],
                    }),
                      props.navigation.reset({
                        index: 1,
                        routes: [
                          {
                            name: '글 상세 보기' as never,
                            params: {id: reResult.data.recruitId},
                          },
                        ],
                      });
                  } else {
                    Toast.show('모집글 수정에 실패하였습니다.');
                    return;
                  }
                } else {
                  Toast.show('모집글 수정에 실패하였습니다.');
                  return;
                }
              } else {
                let data: postRecruitI = {
                  categoryId: props.route.params.categoryId,
                  criteria: props.route.params.criteria,
                  // coupon: Number(props.route.params.data.coupon),
                  dormitory: props.route.params.data.dormitory,
                  deadlineDate: props.route.params.deadlineDate,
                  description: props.route.params.description,
                  freeShipping: props.route.params.freeShipping,
                  menu: menuList ? menuList : [],
                  place: props.route.params.data.place,
                  platform: props.route.params.data.platform,
                  title: props.route.params.title,
                  tags: props.route.params.tags,
                  shippingFee: props.route.params.shippingFee,
                  minPrice: props.route.params.minPrice,
                  minPeople: props.route.params.minPeople,
                };
                console.log('data', data);
                const result = await postRecruitAPI(data);
                console.log('post new recruit', result);
                if (result.status == 200) {
                  Toast.show('모집글을 성공적으로 올렸습니다.');
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: '홈' as never}],
                  }),
                    props.navigation.reset({
                      index: 1,
                      routes: [
                        {
                          name: '글 상세 보기' as never,
                          params: {id: result.data.recruitId},
                        },
                      ],
                    });
                } else if (result.status == 401) {
                  const result = await refreshAPI();
                  console.log(result);
                  const tokens = await result.data;
                  const token = tokens.accessToken;
                  const refToken = tokens.refreshToken;

                  AsyncStorage.multiSet([
                    ['@BaedalMate_JWTAccessToken', token],
                    ['@BaedalMate_JWTRefreshToken', refToken],
                  ]);
                  // setJWTAccessToken(token);
                  // setJWTRefreshToken(refToken);
                  const reResult = await updateRecruitAPI(
                    defaultItem.recruitId,
                    data,
                  );
                  console.log(reResult);
                  if (reResult.status == 200) {
                    Toast.show('모집글을 성공적으로 수정했습니다.');
                    props.navigation.reset({
                      index: 0,
                      routes: [{name: '홈' as never}],
                    }),
                      props.navigation.reset({
                        index: 1,
                        routes: [
                          {
                            name: '글 상세 보기' as never,
                            params: {id: reResult.data.recruitId},
                          },
                        ],
                      });
                  } else {
                    Toast.show('모집글 수정에 실패하였습니다.');
                    return;
                  }
                } else {
                  Toast.show('모집글 올리기에 실패하였습니다.');
                  return;
                }
              }
            }
          }}
          text={
            props.route.params.type === 'UPDATE'
              ? '모집글 수정하기'
              : '모집글 올리기'
          }
          id={4}
        />
      </View>
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
    // textAlign: 'center',
    textAlignVertical: 'center',
  },
  Label: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    // textAlign: 'center',
    textAlignVertical: 'center',
    // paddingBottom: 15,
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

export default CreateRecruit4;
