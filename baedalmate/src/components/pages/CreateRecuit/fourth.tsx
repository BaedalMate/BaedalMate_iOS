import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {TextKRBold, TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {
  DARK_GRAY_COLOR,
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
} from 'components/utils/api/Recruit';
import Toast from 'react-native-root-toast';

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

// const dummyMenu = [
//   {
//     name: '하와이안 피자 (L, 콜라 500ml 추가)',
//     price: 12400,
//     quantity: 1,
//   },
// ];

const CreateRecruit4 = props => {
  const [menuList, setMenuList] = useState<menuI[]>();
  const [menuTotalPrice, setMemuTotalPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState<shippingFeeI[]>(
    props.route.params.shippingFee,
  );
  const [shippingFee, setShippingFee] = useState(0);
  const [couponPrice, setCouponPrice] = useState(
    props.route.params.data.coupon,
  );

  useEffect(() => {
    let price = 0;
    menuList?.map((v, i) => {
      price += v.price * v.quantity;
    });
    setMemuTotalPrice(price);
    // setShippingFee(
    //   props.route.params.shippingFee[props.route.params.shippingFee - 1]
    //     .shippingFee,
    // );
    props.route.params.shippingFee?.map((v, i) => {
      if (
        (v.upperPrice > price && price >= v.lowerPrice) ||
        (v.upperPrice === 0 && price >= v.lowerPrice)
      ) {
        setShippingFee(Number(v.shippingFee));
      }
    });
    setCouponPrice(props.route.params.data.coupon);
  }, [menuList, deliveryFee]);
  console.log(menuList);

  useEffect(() => {
    props.route.params.shippingFee?.sort((a, b) => {
      return a.lowerPrice - b.lowerPrice;
    });
    !props.route.params.freeShipping &&
      props.route.params.shippingFee &&
      setShippingFee(props.route.params.shippingFee[0].shippingFee);
  }, []);

  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
      }}>
      {/* <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={statusBarHeight + 44}> */}
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
              <TextKRBold style={styles.Title}>추가 메뉴</TextKRBold>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
              }}>
              <TextKRBold style={styles.Label}>배달 메뉴</TextKRBold>
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
              <TextKRBold style={styles.Title}>합산 금액</TextKRBold>
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
              <TextKRBold style={styles.Label}>현재 금액</TextKRBold>
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
                    배달팁
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
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    쿠폰 사용 금액
                  </TextKRReg>
                  <TextKRReg
                    style={{
                      fontSize: 16,
                      lineHeight: 24,
                      fontStyle: 'normal',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    - {formPrice(couponPrice)} 원
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
                    {formPrice(menuTotalPrice + shippingFee - couponPrice)} 원
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
                  <TextKRBold style={styles.Label}>
                    현재 결제 예정 금액
                  </TextKRBold>

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
                      {formPrice(menuTotalPrice + shippingFee - couponPrice)}
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
            if (menuList?.length === 0) {
              Toast.show('메뉴를 추가해 주세요.');
              return;
            } else if (
              // props.route.params.criteria === 'PRICE' &&
              menuTotalPrice >= props.route.params.minPrice
            ) {
              Toast.show(
                '모집기준이 금액인 경우, 메뉴의 총 금액이 최소금액보다 작아야 합니다.',
              );
              return;
            } else {
              let data: postRecruitI = {
                categoryId: props.route.params.categoryId,
                criteria: props.route.params.criteria,
                coupon: Number(props.route.params.data.coupon),
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
              const result = await postRecruitAPI(
                data,
                // props.route.params.categoryId,
                // props.route.params.data.place,
                // props.route.params.data.dormitory,
                // props.route.params.criteria,
                // props.route.params.minPrice,
                // props.route.params.minPeople,
                // props.route.params.shippingFee,
                // Number(props.route.params.data.coupon),
                // props.route.params.data.platform,
                // props.route.params.deadlineDate,
                // props.route.params.title,
                // props.route.params.description,
                // props.route.params.freeShipping,
                // menuList ? menuList : [],
                // props.route.params.tags,
              );
              console.log('post new recruit', result);
              if (result.status == 200) {
                Toast.show('모집글을 성공적으로 올렸습니다.');
                props.navigation.reset({
                  index: 0,
                  routes: [{name: '홈' as never}],
                });

                props.navigation.navigate(
                  '글 상세 보기' as never,
                  {
                    id: result.data.recruitId,
                  } as never,
                );
                // props.navigation.reset({
                //   index: 1,
                //   routes: [
                //     {
                //       name: '글 상세 보기' as never,
                //       params: {id: result.data.recruitId},
                //     },
                //   ],
                // });
              } else {
                Toast.show('모집글 올리기에 실패하였습니다.');
                return;
              }
            }
            // props.navigation.navigate('홈');
          }}
          text={'모집글 올리기'}
          id={4}
        />
      </View>
      {/* </KeyboardAvoidingView> */}
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
    paddingBottom: 15,
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
