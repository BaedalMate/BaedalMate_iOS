import React, {useEffect, useState} from 'react';

import {View, Modal, FlatList} from 'react-native';
import {LINE_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ChangeDormitory, {
  DormitoryList,
} from '../BottomSheet/ChangeDormitoryBottomSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {userURL} from 'components/pages/Main';
import {getJWTToken} from 'components/utils/Main';

const Item = ({title}) => null;
export type UserAddressProps = {
  onPress(): void;
  text: string;
};

const UserInfoTitle = ({userName, userAddress, setDormitory}) => {
  const [modal, setModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(userAddress);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  // User dormitory 변경
  const putUserDormitory = async () => {
    let changedDormitory =
      selectedAddress === 'KB학사'
        ? 'KB'
        : selectedAddress === '성림학사'
        ? 'SUNGLIM'
        : selectedAddress === '수림학사'
        ? 'SULIM'
        : selectedAddress === '불암학사'
        ? 'BURAM'
        : 'NURI';
    const JWTAccessToken = await getJWTToken();
    console.log(changedDormitory, JWTAccessToken);
    try {
      const {data} = await axios
        .put(
          userURL,
          {},
          {
            params: {
              dormitory: changedDormitory,
            },
            headers: {
              Authorization: 'Bearer ' + JWTAccessToken,
            },
          },
        )
        .then(function (response) {
          console.log('put dormitory', response);
          console.log(response);
          // AsyncStorage에 유저 이름과 배달 거점 저장
          AsyncStorage.setItem('@BaedalMate_Dormitory', changedDormitory);
          // 해당 페이지는 렌더링 문제로 state 설정 후 사용
          setDormitory(changedDormitory);
          return response.data;
        })
        .catch(function (error) {
          console.log('put dormitory', error);
          return false;
        });
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedAddress(item.value);
        }}
        style={{
          height: 52,
          width: '100%',
          paddingHorizontal: 15,
          justifyContent: 'center',
          borderBottomColor: LINE_GRAY_COLOR,
          borderBottomWidth: 1,
        }}>
        <TextKRReg
          style={{
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 24,
            color: selectedAddress === item.value ? PRIMARY_COLOR : '#666666',
          }}>
          {item.value}
        </TextKRReg>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    putUserDormitory();
  }, [selectedAddress]);

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
            onPress={handleModal}
            style={{
              height: 20,
              justifyContent: 'center',
            }}>
            <TextKRBold
              style={{
                fontSize: 14,
                color: WHITE_COLOR,
                fontWeight: 'bold',
              }}>
              서울과기대 {selectedAddress}
            </TextKRBold>
          </TouchableOpacity>
        </TextKRBold>
        {/* <ChangeDormitory userAddress={userAddress} /> */}
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
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
                  <FlatList data={DormitoryList} renderItem={renderItem} />
                </View>
                <TouchableOpacity
                  onPress={handleModal}
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
            </View>
          </Modal>
        </View>

        {/* 해당 부분 화살표가 선택지인지 혹은 그냥 디자인인지 확인 필요 */}
      </View>
    </>
  );
};

export default UserInfoTitle;
