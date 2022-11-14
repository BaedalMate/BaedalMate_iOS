import {Fonts} from 'assets/Fonts';
import BtnAddMenu from 'components/atoms/Button/BtnAddMenu';
import {
  CntInput,
  DormitoryDescriptionInput,
  PriceInput,
} from 'components/atoms/CreateRecruit/Input';
import MenuItem from 'components/atoms/CreateRecruit/MenuItem';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';

import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TextKRReg, TextKRBold} from 'themes/text';
import {
  WHITE_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  DARK_GRAY_COLOR,
  ERROR_COLOR,
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

const MenuList = (props: menuListProps) => {
  // const menuCnt = props?.menuList.length;
  // const {StatusBarManager} = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  // const renderItem = () => {
  //   let result =
  //     props.menuList &&
  //     props?.menuList.map((menu, index) => {
  //       return (
  //         <MenuItem
  //           key={index}
  //           menu={menu.name}
  //           price={menu.price}
  //           cnt={menu.quantity}
  //           onPress={() => {}}
  //         />
  //       );
  //     });
  //   return result;
  // };
  const deleteMenu = id => {
    props?.setMenuList(
      props.menuList?.filter((v, i) => {
        return id !== i;
      }),
    );
  };

  const [modal, setModal] = useState(false);
  // const [newMenu, setNewMenu] = useState();
  // const [menuList, setMenuList] = useState<menuListI[]>();
  const onSubmit = (data: menuListI) => {
    console.log(data);
    props?.menuList
      ? props.setMenuList([...props.menuList, data])
      : props?.setMenuList([data]);
    handleModal();
  };
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
      <ScrollView
        horizontal={true}
        style={{height: 120, paddingTop: 10}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <BtnAddMenu onPress={handleModal} />

        {props?.menuList?.map((v, i) => {
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
              <KeyboardAvoidingView
                // style={styles.avoidingView}
                behavior={Platform.select({ios: 'padding'})}
                keyboardVerticalOffset={statusBarHeight + 44}>
                <View
                  style={{
                    padding: 15,
                    position: 'relative',
                    bottom: 0,
                    width: '100%',
                    height: 383,
                    backgroundColor: WHITE_COLOR,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
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
                        추가하기
                      </TextKRBold>
                    </TouchableOpacity>
                  </KeyboardAvoidingView>
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </View>

        {/* {renderItem} */}
      </ScrollView>
    </View>
  );
};

export default MenuList;

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
