import {useNavigation} from '@react-navigation/native';
import {url} from '../../../../App';
import {
  eachDetailChatRoomI,
  participantI,
  recruitParticipantsI,
} from 'components/utils/Chat';
import React, {useEffect, useState} from 'react';
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
import {MAX_USERNAME_LIMIT} from 'components/molecules/Chat/Message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postReviewAPI, reviewEachUserI} from 'components/utils/Review';
import {useForm, UseFormReturn} from 'react-hook-form';
// import {getReviewParticipantsAPI} from 'components/utils/Review';

export const ReviewMemberList = ({
  item,
  users,
  useForm,
}: {
  item: participantI;
  users: reviewEachUserI[];
  useForm: UseFormReturn;
}) => {
  // useEffect(() => {
  //   users.push({userId: item.userId, score: 0});
  // }, []);
  console.log(users);
  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        paddingHorizontal: 0,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: url + '/images/' + item.profileImage}}
          // source={{
          //   uri: item.profileImage.includes('https')
          //     ? item.profileImage
          //     : item.profileImage.replace('http', 'https'),
          // }}
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
          <Text style={{}}>
            {item.nickname.length >= MAX_USERNAME_LIMIT
              ? item.nickname.substring(0, MAX_USERNAME_LIMIT) + '...'
              : item.nickname}
          </Text>
        </View>
      </View>
      <View>
        <StarRatingComponent useForm={useForm} userId={item.userId} />
      </View>
    </View>
  );
};

export const ReviewModal = ({
  id,
  participants,
  modal,
  handleModal,
}: {
  id: number;
  participants: recruitParticipantsI;
  modal: boolean;
  handleModal: any;
}) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  // const getUserId = async () => {
  //   const userId = await AsyncStorage.getItem('@BaedalMate_UserId');
  //   userId && setUserId(userId);
  // };
  const [users, setUsers] = useState<reviewEachUserI[]>([]);
  const useFormReturn = useForm();
  const {register, handleSubmit} = useFormReturn;

  // useEffect(() => {
  //   participants.participants.map(v => {
  //     v.userId.toString() !== userId &&
  //       users.push({userId: v.userId, score: 0});
  //   });
  // }, [userId]);
  const onSubmit = (d: any) => {
    console.log('review', d);
    const submitReview = d.users.filter(v => v != null);
    console.log(submitReview);
    const postReviewData = {recruitId: id, users: submitReview};
    postReview(postReviewData);
  };
  const postReview = async postReviewData => {
    const result = await postReviewAPI(postReviewData);
    console.log(result.data);
    if (result.status === 200) {
      handleModal();
    }
  };
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
            {participants?.participants.map(
              v =>
                v.userId.toString() !== userId && (
                  <ReviewMemberList
                    item={v}
                    users={users}
                    useForm={useFormReturn}
                    key={v.userId}
                  />
                ),
            )}
          </View>
          <TouchableOpacity
            onPress={
              handleSubmit(onSubmit)
              // handleModal();
              // navigation.navigate('GPS 인증하기' as never);
            }
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

export const ChatHeader = ({
  item,
  participants,
  reviewUserList,
}: {
  item: eachDetailChatRoomI;
  participants: recruitParticipantsI;
  reviewUserList: recruitParticipantsI;
}) => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };
  return (
    <>
      <ReviewModal
        id={item.recruit.recruitId}
        participants={reviewUserList}
        modal={modal}
        handleModal={handleModal}
      />
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
