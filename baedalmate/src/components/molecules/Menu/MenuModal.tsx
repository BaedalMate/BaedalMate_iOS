import {Fonts} from 'assets/Fonts';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import {
  DormitoryDescriptionInput,
  PriceInput,
  CntInput,
} from 'components/atoms/CreateRecruit/Input';
import MenuItem from 'components/atoms/CreateRecruit/MenuItem';
import {RecruitItemProps} from 'components/pages/Detail';
import {
  formPrice,
  postParticipateRecruitAPI,
  updateParticipateRecruitAPI,
} from 'components/utils/api/Recruit';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
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

const MenuModal = ({id, defaultMenuList, modal, handleModal}) => {
  const [menuList, setMenuList] = useState<menuListI[]>(defaultMenuList);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
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
    setValue('name', '');
    setValue('price', 0);
    setValue('quantity', 1);
    // handleModal();
  };
  const onSubmit = async () => {
    console.log(defaultMenuList);
    // menuList ? setMenuList([...menuList, data]) : setMenuList([data]);
    const result: any =
      defaultMenuList.length > 0
        ? await updateParticipateRecruitAPI(menuList ? menuList : [], id)
        : await postParticipateRecruitAPI(menuList ? menuList : [], id);
    defaultMenuList.length > 0
      ? console.log('update menu', result)
      : console.log('participate menu', result);
    if (result.status === 200) {
      handleModal();
      // navigation.navigate(
      //   '채팅방' as never,
      //   {
      //     id: props.route.params.id,
      //   } as never,
      // );
    }
  };
  const deleteMenu = id => {
    setMenuList(
      menuList?.filter((v, i) => {
        return id !== i;
      }),
    );
  };

  useEffect(() => {
    setMenuList(defaultMenuList);
  }, [defaultMenuList]);
  return (
    <View>
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
          {/* <View> */}
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
                height: menuList && menuList?.length > 0 ? 620 : 450,
                backgroundColor: WHITE_COLOR,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingBottom: 30,
              }}>
              <ScrollView>
                {/* <KeyboardAvoidingView
                behavior={Platform.select({ios: 'padding'})}
                keyboardVerticalOffset={statusBarHeight}> */}
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
                {/* </KeyboardAvoidingView> */}

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
                    text={
                      defaultMenuList ? '메뉴 변경하기' : '모집참여 완료하기'
                    }></BtnVerticalOrange>
                </View>
              </ScrollView>
              {/* </KeyboardAvoidingView> */}
            </View>
            {/* </View> */}
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default MenuModal;

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
