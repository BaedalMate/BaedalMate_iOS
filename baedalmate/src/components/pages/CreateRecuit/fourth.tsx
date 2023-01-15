import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

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
  menuI,
  postRecruitAPI,
  postRecruitI,
  shippingFeeI,
} from 'components/utils/api/Recruit';

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

const dummyMenu = [
  {
    name: '하와이안 피자 (L, 콜라 500ml 추가)',
    price: 12400,
    quantity: 1,
  },
];

const CreateRecruit4 = props => {
  const [menuList, setMenuList] = useState<menuI[]>();
  const [menuTotalPrice, setMemuTotalPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState<shippingFeeI[]>(
    props.route.params.shippingFee,
  );
  const [couponPrice, setCouponPrice] = useState(
    props.route.params.data.coupon,
  );
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    let price = 0;
    menuList?.map((v, i) => {
      price += v.price * v.quantity;
    });
    setMemuTotalPrice(price);

    props.route.params.shippingFee?.map((v, i) => {
      if (
        (v.upperPrice > price && price >= v.lowerPrice) ||
        (v.upperPrice === 0 && price >= v.lowerPrice)
      ) {
        setShippingFee(v.shippingFee);
      }
    });
    setCouponPrice(props.route.params.data.coupon);
  }, [menuList, deliveryFee]);
  console.log(menuList);
  const [shippingFee, setShippingFee] = useState(0);

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
                    {menuTotalPrice} 원
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
                    {shippingFee} 원
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
                    {menuTotalPrice + shippingFee} 원
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
                    {couponPrice} 원
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
                    {menuTotalPrice + shippingFee - couponPrice} 원
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
                      {menuTotalPrice + shippingFee - couponPrice}
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
            let dorm =
              props.route.params.data.dormitory === '누리학사'
                ? 'NURI'
                : props.route.params.data.dormitory === '성림학사'
                ? 'SUNGLIM'
                : props.route.params.data.dormitory === '수림학사'
                ? 'SULIM'
                : props.route.params.data.dormitory === '불암학사'
                ? 'BURAM'
                : 'KB';
            let data: postRecruitI = {
              categoryId: props.route.params.categoryId,
              criteria: props.route.params.criteria,
              coupon: props.route.params.data.coupon,
              dormitory: dorm,
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
              props.route.params.categoryId,
              props.route.params.data.coupon,
              props.route.params.criteria,
              props.route.params.deadlineDate,
              props.route.params.description,
              dorm,
              props.route.params.freeShipping,
              menuList ? menuList : [],
              props.route.params.minPeople,
              props.route.params.minPrice,
              props.route.params.data.place,
              props.route.params.data.platform,
              props.route.params.shippingFee,
              props.route.params.tags,
              props.route.params.title,
            );
            console.log('post new recruit', result);
            props.navigation.navigate('홈');
          }}
          text={'다음으로'}
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
