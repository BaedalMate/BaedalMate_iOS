import React, {useEffect, useState} from 'react';

import {View, Modal, FlatList, Image} from 'react-native';
import {
  BOTTOM_ARROW_MAIN_WIDE,
  BOTTOM_ARROW_WHITE,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {selectDormitoryState} from 'components/utils/recoil/atoms/User';
import {dormitoryList} from 'components/pages/CreateRecuit/second';

export type UserAddressProps = {
  onPress(): void;
  text: string;
};
// export const DormitoryList = [
//   {id: 0, value: '성림학사'},
//   {id: 1, value: 'KB학사'},
//   {id: 2, value: '불암학사'},
//   {id: 3, value: '누리학사'},
//   {id: 4, value: '수림학사'},
// ];
const UserInfoTitle = ({
  userName,
  userAddress,
}: {
  userName: string;
  userAddress: {id: number; name: string; value: string};
}) => {
  const [modal, setModal] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState(userAddress);
  const [selectedAddress, setSelectedAddress] =
    useRecoilState(selectDormitoryState);
  const resetSelectedAddress = useResetRecoilState(selectDormitoryState);
  useEffect(() => {
    setSelectedAddress(userAddress);
  }, []);
  const handleModal = (confirm: boolean) => {
    confirm === false && resetSelectedAddress();
    modal ? setModal(false) : setModal(true);
  };
  const navigation = useNavigation();

  const renderItem = ({
    item,
  }: {
    item: {id: number; name: string; value: string};
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedAddress(item);
        }}
        style={{
          height: 52,
          width: '100%',
          paddingHorizontal: 15,
          justifyContent: 'space-between',
          borderBottomColor: LINE_GRAY_COLOR,
          borderBottomWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextKRReg
          style={{
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 24,
            color:
              selectedAddress.value === item.value ? PRIMARY_COLOR : '#666666',
          }}>
          {item.name}
        </TextKRReg>
        {selectedAddress.value === item.value && (
          <Image
            source={BOTTOM_ARROW_MAIN_WIDE}
            style={{width: 18, height: 9, resizeMode: 'contain'}}
          />
        )}
      </TouchableOpacity>
    );
  };

  // useEffect(() => {
  //   console.log(userAddress, selectedAddress);
  //   setSelectedAddress(userAddress);
  // }, []);
  return (
    <>
      <View
        style={{
          minWidth: 180,
          height: 90,
          flexDirection: 'row',
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <TextKRBold
          style={{
            color: WHITE_COLOR,
            fontSize: 24,
            fontWeight: 'bold',
            lineHeight: 34,
            paddingLeft: 3,
          }}>
          <View
            style={{
              backgroundColor: WHITE_COLOR,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextKRBold
              style={{
                paddingTop: 3,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 24,
                color: PRIMARY_COLOR,
                fontWeight: 'bold',
                lineHeight: 34,
              }}>
              {userName}
            </TextKRBold>
          </View>
          님을 위한{'\n'}오늘의 메뉴
        </TextKRBold>
      </View>
      <View
        style={{
          marginVertical: 5,
          alignSelf: 'flex-start',
          justifyContent: 'center',
          alignItems: 'center',
          height: 24,
        }}>
        <TextKRBold
          style={{
            color: WHITE_COLOR,
            fontWeight: '400',
            fontSize: 14,
            lineHeight: 24,
          }}>
          배달 거점{'\t'}
          <TouchableOpacity
            onPress={() => handleModal(false)}
            style={{
              height: 20,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <TextKRBold
              style={{
                fontSize: 14,
                color: WHITE_COLOR,
                fontWeight: 'bold',
              }}>
              서울과기대 {selectedAddress.name}
            </TextKRBold>
            <Image
              source={BOTTOM_ARROW_WHITE}
              style={{
                marginLeft: 7,
                width: 10,
                height: 5,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </TextKRBold>
        <View>
          <Modal
            transparent={true}
            visible={modal}
            animationType={'slide'}
            onRequestClose={() => handleModal(false)}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.45)',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onTouchEnd={() => handleModal(false)}></View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 383,
                backgroundColor: WHITE_COLOR,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  height: 35,
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: LINE_GRAY_COLOR,
                }}>
                <TextKRReg
                  style={{
                    textAlign: 'center',
                    fontWeight: '400',
                    fontSize: 14,
                    lineHeight: 24,
                  }}>
                  배달거점
                </TextKRReg>
              </View>
              <View>
                <FlatList data={dormitoryList} renderItem={renderItem} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleModal(true),
                    navigation.navigate(
                      '거점 인증' as never,
                      {target: selectedAddress} as never,
                    );
                }}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <TextKRBold
                  style={{
                    textAlign: 'center',
                    paddingTop: 11,
                    fontWeight: '400',
                    fontSize: 16,
                    lineHeight: 22,
                  }}>
                  확인
                </TextKRBold>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
};

export default UserInfoTitle;
