import {Fonts} from 'assets/Fonts';
import {RecruitItemProps} from 'components/pages/Detail';
import {formPrice} from 'components/utils/api/Recruit';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextKRReg, TextKRBold} from 'themes/text';
import {
  WHITE_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  DARK_GRAY_COLOR,
  ERROR_COLOR,
  QUESTION_MARK,
} from 'themes/theme';

interface menuListProps {
  menuList: menuListI[] | undefined;
  setMenuList: Function;
  children?: React.ReactNode;
}

export interface menuListI {
  name: string;
  price: number;
  quantity: number;
}

const DeliveryFeeModal = ({item}: {item: RecruitItemProps | undefined}) => {
  console.log(item);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const [modal, setModal] = useState(false);
  // const [newMenu, setNewMenu] = useState();
  // const [menuList, setMenuList] = useState<menuListI[]>();

  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };
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
  return (
    <View>
      <Text
        style={{
          color: DARK_GRAY_COLOR,
          fontSize: 14,
          lineHeight: 22,
          textAlign: 'center',
        }}>
        배달비
        <TouchableOpacity
          style={{
            paddingLeft: 3,
          }}
          onPress={handleModal}>
          <Image
            source={QUESTION_MARK}
            style={{
              paddingLeft: 3,
            }}
          />
        </TouchableOpacity>
      </Text>
      <View>
        <Modal
          transparent={true}
          visible={modal}
          animationType={'fade'}
          onRequestClose={handleModal}>
          <View
            // onTouchStart={handleModal}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.45)',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                padding: 15,

                width: 270,

                backgroundColor: WHITE_COLOR,
                borderRadius: 10,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: LINE_GRAY_COLOR,
                // borderBottomColor: LINE_GRAY_COLOR,
              }}>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  // paddingBottom: 30,
                  borderBottomWidth: 1,
                  borderBottomColor: LINE_GRAY_COLOR,
                }}>
                <TextKRBold
                  style={{
                    fontSize: 18,
                    lineHeight: 22,
                    color: PRIMARY_COLOR,
                    marginBottom: 8,
                  }}>
                  배달비 상세정보
                </TextKRBold>
                <TextKRReg style={styles.Description}>
                  해당 모집글의 총 주문금액에 따른 배달팁 구간이 강조되어
                  표시됩니다.
                </TextKRReg>
              </View>
              <View>
                {item?.shippingFeeDetail && item?.shippingFeeDetail.length > 0 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <TextKRReg style={styles.Label}>주문금액</TextKRReg>
                    <TextKRReg style={styles.Label}>배달팁</TextKRReg>
                  </View>
                )}

                {item?.shippingFeeDetail &&
                item?.shippingFeeDetail.length > 0 &&
                !(
                  item.shippingFeeDetail[0].lowerPrice === 0 &&
                  item.shippingFeeDetail[0].shippingFee === 0
                ) ? (
                  item?.shippingFeeDetail.map((v, i) => {
                    let isCurrent = false;
                    if (v.shippingFee === item.shippingFee) isCurrent = true;
                    return (
                      <View
                        key={i}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextKRReg
                          style={[
                            styles.Description,
                            isCurrent && {color: PRIMARY_COLOR},
                          ]}>
                          {formPrice(v.lowerPrice)}원 이상
                        </TextKRReg>
                        <TextKRReg
                          style={[
                            styles.Description,
                            isCurrent && {color: PRIMARY_COLOR},
                          ]}>
                          {formPrice(v.shippingFee)}원
                        </TextKRReg>
                      </View>
                    );
                  })
                ) : (
                  <View
                    style={{
                      height: 120,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextKRBold
                      style={{
                        fontSize: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      배달비 없음
                    </TextKRBold>
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                padding: 15,
                width: 270,
                backgroundColor: WHITE_COLOR,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomWidth: 1,
                borderBottomColor: LINE_GRAY_COLOR,
              }}>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: LINE_GRAY_COLOR,
                }}>
                <TextKRBold
                  style={{
                    paddingBottom: 10,
                    fontSize: 18,
                    lineHeight: 22,

                    color: PRIMARY_COLOR,
                  }}>
                  쿠폰 사용 금액
                </TextKRBold>
                <TextKRReg style={styles.Description}>
                  기존 금액에서 주최자의 쿠폰 사용금액만큼 할인된 후 배달비가
                  나누기 됩니다.
                </TextKRReg>
              </View>
              <View
                style={{
                  marginBottom: 10,
                }}>
                <TextKRReg style={styles.Label}>쿠폰사용금액</TextKRReg>
                <TextKRReg style={styles.Description}>
                  {item?.coupon ? formPrice(item?.coupon) : 0}원
                </TextKRReg>
              </View>
            </View>
            <View
              style={{
                padding: 15,
                width: 270,
                backgroundColor: WHITE_COLOR,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <TouchableOpacity
                onPress={handleModal}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.Confirm}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default DeliveryFeeModal;

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
    marginVertical: 10,
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
  Confirm: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'center',
  },
  avoidingView: {
    // flex: 1,
  },
});
