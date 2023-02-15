import {useNavigation} from '@react-navigation/native';
import {url} from '../../../../App';
import {
  eachDetailChatRoomI,
  formDate,
  formDateWithDot,
  formDateWithTwoDigit,
  formDateWithTwoDigitDot,
  formTime,
  formTime24,
  participantI,
  recruitParticipantsI,
} from 'components/utils/api/Chat';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  DARK_GRAY_COLOR,
  OVERLAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {OrangeChatTag} from '../BoardList/Tags';
import BtnHorizontalWhiteS from '../Button/BtnHorizontalWhiteS';
import StarRatingComponent from '../StarRating/StarRating';
import {MAX_USERNAME_LIMIT} from 'components/molecules/Chat/Message';
import {postReviewAPI, reviewEachUserI} from 'components/utils/api/Review';
import {useForm, UseFormReturn} from 'react-hook-form';
import {
  formPrice,
  getUserMenuAPI,
  userMenuI,
} from 'components/utils/api/Recruit';
import BtnVerticalOrange from '../Button/BtnVerticalOrange';
import MenuModal from 'components/molecules/Menu/MenuModal';

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
          <TextKRBold style={{fontSize: 14, lineHeight: 17}}>
            {item.nickname.length >= MAX_USERNAME_LIMIT
              ? item.nickname.substring(0, MAX_USERNAME_LIMIT) + '...'
              : item.nickname}
          </TextKRBold>
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
        animationType={'fade'}
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
              height: 30,
              marginBottom: 10,
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
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: 40,
            }}>
            <BtnVerticalOrange
              onPress={
                handleSubmit(onSubmit)
                // handleModal();
                // navigation.navigate('거점 인증' as never);
              }
              text={'평가 완료'}
            />
          </View>
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
  const [menuModal, setMenuModal] = useState(false);
  const handleMenuModal = () => {
    menuModal ? setMenuModal(false) : setMenuModal(true);
  };
  const [defaultMenuList, setDefaultMenuList] = useState<userMenuI>();
  const getDefaultMenu = async () => {
    const result = await getUserMenuAPI(item.recruit.recruitId);
    setDefaultMenuList(result);
  };
  useEffect(() => {
    getDefaultMenu();
  }, []);
  const now = new Date();
  const text =
    item?.recruit.deadlineDate.split(' ')[0] +
    'T' +
    item?.recruit.deadlineDate.split(' ')[1];
  const deadline = new Date(text);
  const time = deadline.getTime() - now.getTime();
  const durationYear = deadline.getFullYear() - now.getFullYear();
  const durationMonth = deadline.getMonth() - now.getMonth();
  const durationDate = deadline.getDate() - now.getDate();
  const durationHour = deadline.getHours() - now.getHours();
  const durationMinutes = deadline.getMinutes() - now.getMinutes();
  const durationSeconds = deadline.getSeconds() - now.getSeconds();
  const timeText =
    time < 0
      ? '마감'
      : durationYear > 0
      ? durationYear + '년'
      : durationMonth > 0
      ? durationMonth + '달'
      : durationDate > 0
      ? durationDate + '일'
      : durationHour > 0
      ? durationHour + '시간'
      : durationMinutes > 0
      ? durationMinutes + '분'
      : '마감 임박';
  return (
    <>
      <MenuModal
        id={item.recruit.recruitId}
        defaultMenuList={defaultMenuList?.menu}
        modal={menuModal}
        handleModal={handleMenuModal}
      />
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
          <View
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
              flex: 1,
              alignItems: 'stretch',
              marginHorizontal: 15,
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  lineHeight: 22,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                <Text
                  style={{
                    color: item.recruit.active
                      ? PRIMARY_COLOR
                      : item.recruit.cancel
                      ? OVERLAY_COLOR
                      : item.recruit.fail
                      ? OVERLAY_COLOR
                      : PRIMARY_COLOR,
                  }}>
                  [모집
                  {item.recruit.active
                    ? '중'
                    : item.recruit.cancel
                    ? '취소'
                    : item.recruit.fail
                    ? '실패'
                    : '완료'}
                  ]{' '}
                </Text>
                {item.recruit.title}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <OrangeChatTag item={item.recruit} />
              <TextKRReg
                style={{
                  fontSize: 14,
                  lineHeight: 24,
                  color: DARK_GRAY_COLOR,
                  textAlignVertical: 'center',
                }}>
                {
                  item.recruit.criteria === 'PRICE'
                    ? formPrice(item.recruit.minPrice) + '원'
                    : item.recruit.criteria === 'NUMBER'
                    ? item.recruit.minPeople + '인'
                    : timeText
                  // formDateWithDot(item.recruit.deadlineDate) +
                  // ' ' +
                  // formTime24(item.recruit.deadlineDate)
                }
              </TextKRReg>
            </View>
          </View>
          <View
            style={{
              // width: 85,
              height: 40,
            }}>
            {item.recruit.active ? (
              <BtnHorizontalWhiteS
                onPress={handleMenuModal}
                text={'메뉴변경'}
              />
            ) : (
              <BtnHorizontalWhiteS
                disabled={item.reviewed}
                onPress={handleModal}
                text={'후기 작성하기'}
              />
            )}
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
  },
  storeImg: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
  },
});

export default ChatHeader;
