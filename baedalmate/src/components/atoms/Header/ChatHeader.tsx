import {useNavigation} from '@react-navigation/native';
import {url} from '../../../../App';
import {eachDetailChatRoomI} from 'components/utils/Chat';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {DARK_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {OrangeTag} from '../BoardList/Tags';
import BtnHorizontalWhiteS from '../Button/BtnHorizontalWhiteS';
import StarRatingComponent from '../StarRating/StarRating';

export const ReviewMemberList = () => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{
            uri: 'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
          }}
          style={{
            width: 45,
            height: 45,
            backgroundColor: '#ffffff',
            borderRadius: 45 / 2,
            marginBottom: 6,
            marginRight: 15,
          }}
        />
        <View
          style={{height: 45, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{}}>김예빈</Text>
        </View>
      </View>
      <View>
        <StarRatingComponent />
      </View>
    </View>
  );
};

export const ReviewModal = ({modal, handleModal}) => {
  const navigation = useNavigation();
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
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onTouchEnd={handleModal}></View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingBottom: 45,
            backgroundColor: WHITE_COLOR,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 15,
          }}>
          <View
            style={{
              width: '100%',
              height: 35,
              marginBottom: 30,
              justifyContent: 'center',
            }}>
            <TextKRBold
              style={{
                fontSize: 18,
                lineHeight: 22,
                color: PRIMARY_COLOR,
              }}>
              후기 남기기
            </TextKRBold>
          </View>
          <View>
            <ReviewMemberList />
            <ReviewMemberList />
            <ReviewMemberList />
            <ReviewMemberList />
          </View>
          <TouchableOpacity
            onPress={() => {
              handleModal(), navigation.navigate('GPS 인증하기' as never);
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
  );
};

export const ChatHeader = ({item}: {item: eachDetailChatRoomI}) => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };
  return (
    <>
      <ReviewModal modal={modal} handleModal={handleModal} />
      <TouchableHighlight
        style={styles.chatHeaderWrapper}
        activeOpacity={0.6}
        underlayColor="#FFF3F0"
        onPress={() => {
          navigation.navigate(
            '글 상세 보기' as never,
            {
              id: item.recruit.recruitId,
            } as never,
          );
        }}>
        <>
          <Image
            source={{
              uri: url + '/images/' + item.recruit.recruitImage,
            }}
            style={styles.storeImg}
          />
          {/* <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}> */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
            }}>
            <View style={{}}>
              <TextKRReg
                style={{
                  fontSize: 14,
                  lineHeight: 24,
                  color: DARK_GRAY_COLOR,
                }}>
                {item.recruit.deadlineDate}
              </TextKRReg>
              <TextKRBold
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                }}>
                {item.recruit.title}
              </TextKRBold>
              {/* <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    }}> */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // flex: 1,
                }}>
                {/* <GrayTag item={item.recruit} /> */}
                <OrangeTag item={item.recruit} />
              </View>

              <TextKRReg
                style={{
                  fontSize: 14,
                  lineHeight: 24,
                  flex: 1,
                  color: DARK_GRAY_COLOR,
                }}>
                {/* {item.recruit.criteria === "TIME" ? } */}
                {item.recruit.minPrice}

                {/* <Image source={STORE_BLACK} /> {item.lastMessage.sendDate}{' '} */}
              </TextKRReg>
              {/* <TextKRReg
      style={{
        fontSize: 14,
        lineHeight: 24,
        flex: 1,
      }}>
      <Image source={MARKER_BLACK} /> {item.}
    </TextKRReg> */}
              {/* </View> */}
              {/* </View> */}
            </View>
          </View>
          <View
            style={{
              width: 75,
              height: 40,
            }}>
            <BtnHorizontalWhiteS onPress={handleModal} text={'후기 남기기'} />
          </View>
        </>
      </TouchableHighlight>
    </>
  );
};

const styles = StyleSheet.create({
  chatHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 15,
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#F7F8FA',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    // marginBottom: 10,
  },
  storeImg: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginRight: 15,
  },
});

export default ChatHeader;
