import {useNavigation} from '@react-navigation/native';
import {UserProfileImage} from 'components/atoms/Image/UserImage';
import {RecruitItemProps} from 'components/pages/Detail';
import React, {useEffect, useState} from 'react';
import {
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import {TextKRBold} from 'themes/text';
import {
  BLACK_COLOR,
  DARK_GRAY_COLOR,
  MARKER_BLACK,
  PRIMARY_COLOR,
} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const UserInfo = ({item}: {item: RecruitItemProps | undefined}) => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  useEffect(() => {
    item?.userInfo.score && setRating(item?.userInfo.score);
  }, [item]);

  return (
    <View
      style={{
        top: -19,
        height: 72,
        width: '100%',
        backgroundColor: '#F7F8FA',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderColor: BLACK_COLOR,
      }}>
      <UserProfileImage item={item} />
      <View
        style={{
          height: 41,
          marginLeft: 11,
          justifyContent: 'space-around',
        }}>
        <TextKRBold style={{fontSize: 16}}>
          {item?.userInfo.nickname}
        </TextKRBold>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
          }}>
          <StarRating
            rating={rating}
            onChange={() => {}}
            starSize={20}
            color={PRIMARY_COLOR}
            starStyle={{
              width: 14,
              marginRight: 3,
              display: 'flex',
              // borderWidth: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
            animationConfig={{
              scale: 1,
              duration: 0,
              delay: 0,
              easing: Easing.elastic(1),
            }}
          />
          <TextKRBold
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlignVertical: 'center',
              fontSize: 14,
              lineHeight: 20,
            }}>
            {item?.userInfo.score
              ? Math.round(item?.userInfo.score * 10) / 10
              : 0}
          </TextKRBold>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          right: 15,
          height: 41,
          marginLeft: 11,
          // justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
        <Text>
          <Image source={MARKER_BLACK} />
          {' ' + item?.dormitory}
        </Text>
        {/* {!item?.host && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                '게시글 신고하기' as never,
                {
                  item: item,
                  userInfo: item?.userInfo,
                } as never,
              );
            }}
            style={{
              borderBottomWidth: 1,
              borderColor: DARK_GRAY_COLOR,
            }}>
            <Text
              style={{
                color: DARK_GRAY_COLOR,
              }}>
              신고하기
            </Text>
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserInfo;
