import React from 'react';
import Modal from 'react-native-modal/dist/modal';
import {View, TouchableHighlight, Image} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  WHITE_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  DARK_GRAY_COLOR,
  LOADING_PRIMARY_ICON,
} from 'themes/theme';

export interface popupProps {
  title: string;
  description?: string;
  modal: boolean;
  handleModal: any;
  confirmEvent?: any;
  choiceCnt: number;
  icon?;
}
export const UsePopup = ({
  title,
  description,
  modal,
  handleModal,
  choiceCnt,
  confirmEvent,
  icon,
}: {
  title;
  modal;
  handleModal;
  choiceCnt;
  confirmEvent?;
  description?;
  icon?;
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
              width: 270,
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
                  borderBottomWidth: icon ? 0 : 1,
                  borderColor: LINE_GRAY_COLOR,
                  paddingHorizontal: 15,
                }}>
                {icon && (
                  <View style={{marginBottom: 24}}>
                    <Image
                      source={LOADING_PRIMARY_ICON}
                      style={{width: 50, height: 50}}
                    />
                  </View>
                )}
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
                      textAlign: 'center',
                    }}>
                    {description}
                  </TextKRReg>
                </View>
              </View>
              {confirmEvent && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  {choiceCnt > 1 && (
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
                  )}
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
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
