import React, {useEffect, useState} from 'react';
import {
  ActionSheetIOS,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CAMERA_GRAY_FILLED_BIG_ICON,
  DEFAULT_PROFILE_IMG,
  LIGHT_GRAY_COLOR,
  LINE_GRAY_COLOR,
  MAIN_GRAY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {TextKRBold} from 'themes/text';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import {url} from '../../../../App';
import {useController, useForm} from 'react-hook-form';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {updateUserInfoAPI} from 'components/utils/api/User';
import {useRecoilState} from 'recoil';
import {
  userNicknameState,
  userProfileImageState,
} from 'components/utils/recoil/atoms/User';

export interface MyPageI {
  userId: number;
  nickname: string;
  profileImage: string;
  dormitory: string;
  score: number;
}
export const MyPageUserDummyData = {
  profileImage:
    'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
  userName: '김예빈',
  score: '4.3',
  dormitory: '성림학사',
};

const NicknameInput = ({nickname, name, control, rules, setValue}) => {
  const {field} = useController({
    control,
    defaultValue: nickname,
    name,
    rules,
  });
  console.log(field);

  return (
    <TextInput
      placeholder="5자 이내로 닉네임을 작성해 주세요"
      style={{
        fontSize: 14,
        // lineHeight: 24,
        borderWidth: 1,
        borderColor: LINE_GRAY_COLOR,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        textAlignVertical: 'center',
        marginTop: 7,
      }}
      maxLength={7}
      onChangeText={field.onChange}
      value={field.value.length > 5 ? field.value.slice(0, 5) : field.value}
      placeholderTextColor={MAIN_GRAY_COLOR}></TextInput>
  );
};
const SetProfile = ({route, navigation}) => {
  const [nickname, setNickname] = useRecoilState(userNicknameState);
  const [profileImage, setProfileImage] = useRecoilState(userProfileImageState);
  const [isDefaultImage, setIsDefaultImage] = useState(true);

  const useFormReturn = useForm({
    defaultValues: {
      nickname: nickname,
    },
  });
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useFormReturn;

  const [image, setImage] = useState<any>(null);
  const onTakeCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 100,
        maxHeight: 100,
        includeBase64: true,
      },
      res => {
        console.log(res);
        if (res.didCancel) {
          console.log('user cancelled image picker');
          return;
        } else if (res.errorCode) {
          console.log(res.errorMessage);
        } else {
          res.assets && setImage(res.assets[0]);
        }
      },
    );
  };
  const onSelectImageFromLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 100,
        maxHeight: 100,
        includeBase64: true,
      },
      res => {
        console.log(res);
        if (res.didCancel) {
          console.log('user cancelled image picker');
          return;
        } else if (res.errorCode) {
          console.log(res.errorMessage);
        } else {
          res.assets && setImage(res.assets[0]);
        }
      },
    );
  };

  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          '취소',
          '카메라로 찍기',
          '앨범에서 선택',
          '기본 이미지로 설정',
        ],
        // destructiveButtonIndex: 3,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
        } else if (buttonIndex === 1) {
          onTakeCamera();
          setIsDefaultImage(false);
        } else if (buttonIndex === 2) {
          onSelectImageFromLibrary();
          setIsDefaultImage(false);
        } else if (buttonIndex === 3) {
          setIsDefaultImage(true);
          setImage(null);
        } else {
        }
      },
    );
  };
  const onSubmit = async () => {
    const result = image
      ? await updateUserInfoAPI(isDefaultImage, watch('nickname'), image)
      : await updateUserInfoAPI(isDefaultImage, watch('nickname'));
    if (result.status === 200) {
      console.log(result);
      setNickname(result.nickname);
      setProfileImage(result.profileImage);
      navigation.navigate('내 위치 인증');
    }
  };
  useEffect(() => {
    if (nickname !== '') navigation.navigate('내 위치 인증');
  }, [nickname]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 15,
        backgroundColor: WHITE_COLOR,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{marginTop: 48, marginBottom: 75}}
        onPress={() => onPress()}>
        {isDefaultImage ? (
          <Image
            source={DEFAULT_PROFILE_IMG}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              backgroundColor: '#8F939B',
              borderWidth: 1,
              borderColor: LIGHT_GRAY_COLOR,
            }}
          />
        ) : (
          <Image
            source={{
              uri: image === null ? url + '/images/' + profileImage : image.uri,
            }}
            resizeMode="cover"
            resizeMethod="scale"
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              backgroundColor: '#8F939B',
              borderWidth: 1,
              borderColor: LIGHT_GRAY_COLOR,
            }}
          />
        )}
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderWidth: 1,
            borderColor: LINE_GRAY_COLOR,
            borderRadius: 30 / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={CAMERA_GRAY_FILLED_BIG_ICON}
            style={{width: 18, height: 14}}
          />
        </View>
      </TouchableOpacity>
      <View style={{width: '100%'}}>
        <TextKRBold style={{fontSize: 14, lineHeight: 17}}>닉네임</TextKRBold>
        <NicknameInput
          nickname={nickname}
          name={'nickname'}
          control={control}
          setValue={setValue}
          rules={{maxLength: 5, required: true}}
        />
      </View>
      <View style={{width: '100%', position: 'absolute', bottom: 45}}>
        <BtnVerticalOrange
          onPress={() => {
            onSubmit();
          }}
          text={'다음으로'}
        />
      </View>
    </View>
  );
};

export default SetProfile;
