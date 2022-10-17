import React, {useState} from 'react';
import {FlatList, Modal, TouchableOpacity, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {LINE_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';

export const DormitoryList = [
  {id: 0, value: '성림학사'},
  {id: 1, value: 'KB학사'},
  {id: 2, value: '불암학사'},
  {id: 3, value: '누리학사'},
  {id: 4, value: '수림학사'},
];
const AddMenu = userDormitory => {
  const [modal, setModal] = useState(false);
  const [selectedDormitory, setSelectedDormitory] = useState(userDormitory);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  // const renderItem = ({item}) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         setSelectedAddress(item.value);
  //       }}
  //       style={{
  //         height: 52,
  //         width: '100%',
  //         paddingHorizontal: 15,
  //         justifyContent: 'center',
  //         borderBottomColor: LINE_GRAY_COLOR,
  //         borderBottomWidth: 1,
  //       }}>
  //       <TextKRReg
  //         style={{
  //           fontWeight: '400',
  //           fontSize: 16,
  //           lineHeight: 24,
  //           color: selectedAddress === item.value ? PRIMARY_COLOR : '#666666',
  //         }}>
  //         {item.value}
  //       </TextKRReg>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <View>
      {/* <Modal
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
              <FlatList data={AddressData} renderItem={renderItem} />
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
      </Modal> */}
    </View>
  );
};

export default AddMenu;
