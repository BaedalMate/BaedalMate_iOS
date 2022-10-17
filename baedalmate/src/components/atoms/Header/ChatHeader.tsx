import {useNavigation} from '@react-navigation/native';
import {BoardListProps} from 'components/molecules/BoardList/BoardList';
import BtnHorizontal3 from 'components/molecules/Button/BtnHorizontal3';
import {
  chatRoomListI,
  eachChatRoomI,
  eachDetailChatRoomI,
} from 'components/utils/Chat';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  MARKER_BLACK,
  STORE_BLACK,
  WHITE_COLOR,
} from 'themes/theme';
import {GrayTag, OrangeTag} from '../BoardList/Tags';
import BtnHorizontalWhiteS from '../Button/BtnHorizontalWhiteS';

export const ChatHeader = ({item}: {item: eachDetailChatRoomI}) =>
  // { item }: { item: eachChatRoomI }
  {
    console.log(item);
    const navigation = useNavigation();
    const [colour, setColour] = useState(WHITE_COLOR);
    const handlePress = () => {
      setColour('#FFF3F0');
    };
    return (
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
            source={
              {
                // uri: item !== null ? item.image : '',
              }
            }
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
                <GrayTag item={item.recruit} />
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
            <BtnHorizontalWhiteS
              onPress={function (): void {
                throw new Error('Function not implemented.');
              }}
              text={'메뉴 변경'}
            />
          </View>
        </>
      </TouchableHighlight>
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
    backgroundColor: 'white',
    marginBottom: 10,
  },
  storeImg: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginRight: 15,
  },
});

export default ChatHeader;
