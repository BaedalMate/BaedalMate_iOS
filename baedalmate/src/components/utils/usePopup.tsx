import React, {useState} from 'react';
import Modal from 'react-native-modal/dist/modal';
import {View, TouchableOpacity, TouchableHighlight} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  WHITE_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  DARK_GRAY_COLOR,
} from 'themes/theme';

export const UsePopup = ({
  title,
  description,
  modal,
  handleModal,
  confirmEvent,
}) => {
  return (
    <View>
      <Modal isVisible={modal} style={{margin: 0}}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View onTouchStart={handleModal} />
          <View
            style={{
              marginHorizontal: 53,
              backgroundColor: WHITE_COLOR,
              borderRadius: 10,
            }}>
            <View
              style={{
                // padding: 15,
                paddingTop: 28,
                // marginBottom: 10,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: LINE_GRAY_COLOR,
                  paddingHorizontal: 15,
                }}>
                <View style={{}}>
                  <TextKRBold
                    style={{
                      fontSize: 16,
                      lineHeight: 19,
                      color: PRIMARY_COLOR,
                      textAlign: 'center',
                      marginBottom: 8,
                    }}>
                    {title}
                  </TextKRBold>
                </View>
                <View>
                  <TextKRReg
                    style={{
                      fontSize: 14,
                      lineHeight: 24,
                      color: DARK_GRAY_COLOR,
                      marginBottom: 16,
                    }}>
                    {description}
                  </TextKRReg>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <TouchableHighlight
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    paddingTop: 8,
                    paddingBottom: 10,
                    borderBottomLeftRadius: 10,
                  }}
                  onPress={() => {
                    handleModal();
                  }}
                  underlayColor={LINE_GRAY_COLOR}>
                  <TextKRReg style={{fontSize: 16, lineHeight: 24}}>
                    취소
                  </TextKRReg>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    paddingTop: 8,
                    paddingBottom: 10,
                    borderBottomRightRadius: 10,
                  }}
                  onPress={() => {
                    confirmEvent();
                    handleModal();
                  }}
                  underlayColor={LINE_GRAY_COLOR}>
                  <TextKRReg style={{fontSize: 16, lineHeight: 24}}>
                    확인
                  </TextKRReg>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
