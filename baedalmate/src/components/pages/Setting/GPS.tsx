import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import BtnVerticalDeactive from 'components/atoms/Button/BtnVerticalDeactive';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import {Map} from 'components/molecules/Setting/Map';
import {getJWTToken} from 'components/utils/api/Recruit';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {WHITE_COLOR, BOTTOM_ARROW, LINE_ORANGE_COLOR} from 'themes/theme';
import {dormitoryList} from '../CreateRecuit/second';
import {userURL} from '../Main';
import {UsePopup} from 'components/utils/usePopup';
import {useRecoilState} from 'recoil';
import {
  selectDormitoryState,
  userDormitoryState,
} from 'components/utils/recoil/atoms/User';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import {refreshAPI} from 'components/utils/api/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const dormitoryURL = userURL + '/dormitory';
export const DORMITORY_SUNGLIM_LOCATION = {
  longitude: 127.07597,
  latitude: 37.63556,
};

export const DORMITORY_KB_LOCATION = {
  longitude: 127.076126,
  latitude: 37.635994,
};

export const DORMITORY_BURAM_LOCATION = {
  longitude: 127.07612,
  latitude: 37.63636,
};

export const DORMITORY_NURI_LOCATION = {
  longitude: 127.07709,
  latitude: 37.634426,
};

export const DORMITORY_SULIM_LOCATION = {
  longitude: 127.078285,
  latitude: 37.636044,
};

export interface LocationI {
  latitude: number;
  longitude: number;
}
export type DormitoryType = 'SUNGLIM' | 'KB' | 'BURAM' | 'NURI' | 'SULIM';

const DormitoryDropDown = ({
  target,
  setTarget,
}: {
  target: {id: number; name: string; value: string};
  setTarget: any;
}) => {
  return (
    <View
      style={{
        padding: 15,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            marginRight: 30,
          }}>
          서울과기대
        </Text>
        <SelectDropdown
          buttonStyle={{
            backgroundColor: WHITE_COLOR,
            borderRadius: 10,
            height: 45,
            flex: 1,
          }}
          dropdownStyle={{
            borderRadius: 10,
            backgroundColor: WHITE_COLOR,
          }}
          buttonTextStyle={{
            fontSize: 14,
            lineHeight: 17,
            fontWeight: '700',
          }}
          rowTextStyle={{
            fontSize: 14,
            lineHeight: 24,
            fontWeight: '400',
          }}
          data={dormitoryList}
          defaultButtonText="거점을 선택하세요"
          defaultValueByIndex={target.id}
          defaultValue={target}
          renderDropdownIcon={() => {
            return <Image source={BOTTOM_ARROW} />;
          }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setTarget(selectedItem);
            // if (selectedItem === '누리학사') {
            //   setTarget('NURI');
            // } else if (selectedItem === '성림학사') {
            //   setTarget('SUNGLIM');
            // } else if (selectedItem === 'KB학사') {
            //   setTarget('KB');
            // } else if (selectedItem === '불암학사') {
            //   setTarget('BURAM');
            // } else if (selectedItem === '수림학사') {
            //   setTarget('SULIM');
            // }
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.name;
          }}
          rowTextForSelection={item => {
            return item.name;
          }}
        />
      </View>
    </View>
  );
};

const GPS = props => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<LocationI>();
  const [dormitory, setDormitory] = useRecoilState(userDormitoryState);
  const [target, setTarget] = useRecoilState(selectDormitoryState);
  const [targetLocation, setTargetLocation] = useState<LocationI>();
  const [distance, setDistance] = useState<number>();

  const getTarget = () => {
    props.route.params && props.route.params.target
      ? setTarget(props.route.params.target)
      : setTarget(dormitory);
  };

  const success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({latitude, longitude});
  };
  const error = error => {
    console.error(error);
  };
  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };
  const getDistance = (
    currentLocation: LocationI,
    targetLocation: LocationI,
  ) => {
    var R = 6371;
    var dLat = deg2rad(targetLocation.latitude - currentLocation.latitude);
    var dLon = deg2rad(targetLocation.longitude - currentLocation.longitude);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(currentLocation.latitude)) *
        Math.cos(deg2rad(targetLocation.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  };

  // User dormitory 변경
  const putUserDormitory = async () => {
    const JWTAccessToken = await getJWTToken();
    console.log(target, JWTAccessToken);
    try {
      const data = await axios
        .put(
          dormitoryURL,
          {dormitory: target.value},
          {
            headers: {
              Authorization: 'Bearer ' + JWTAccessToken,
            },
          },
        )
        .then(async function (response) {
          console.log('put dormitory', response);
          console.log(response);
          // AsyncStorage에 유저 이름과 배달 거점 저장
          // AsyncStorage.setItem('@BaedalMate_Dormitory', changedDormitory);
          // 해당 페이지는 렌더링 문제로 state 설정 후 사용
          if (response.status === 200) {
            setDormitory(target);
            // setTarget(dormitory);
            Toast.show('거점 인증이 완료되었습니다.');
            navigation.navigate(
              'BoardStackComponent' as never,
              {
                token: JWTAccessToken,
              } as never,
            );
            navigation.reset({
              index: 0,
              routes: [{name: 'BoardStackComponent' as never}],
            });
          } else if (response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            if (result.status == 200) {
              const tokens = await result.data;
              const token = tokens.accessToken;
              const refToken = tokens.refreshToken;
              AsyncStorage.multiSet([
                ['@BaedalMate_JWTAccessToken', token],
                ['@BaedalMate_JWTRefreshToken', refToken],
              ]);

              if (result.status === 200) {
                putUserDormitory();
              }
              return result;
            }
          }

          return response;
        })
        .catch(async function (error) {
          console.log('put dormitory', error);
          if (error.response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            if (result.status == 200) {
              const tokens = await result.data;
              const token = tokens.accessToken;
              const refToken = tokens.refreshToken;
              AsyncStorage.multiSet([
                ['@BaedalMate_JWTAccessToken', token],
                ['@BaedalMate_JWTRefreshToken', refToken],
              ]);

              if (result.status === 200) {
                putUserDormitory();
              }
              return result;
            }
          } else {
            Toast.show('거점 인증에 실패했습니다.');
          }

          return false;
        });
      return data;
    } catch (error) {
      console.log(error);
      Toast.show('거점 인증에 실패했습니다.');

      return false;
    }
  };

  useEffect(() => {
    getTarget();
  }, []);

  useEffect(() => {
    switch (target.value) {
      case 'SUNGLIM':
        setTargetLocation(DORMITORY_SUNGLIM_LOCATION);
        break;
      case 'KB':
        setTargetLocation(DORMITORY_KB_LOCATION);
        break;
      case 'BURAM':
        setTargetLocation(DORMITORY_BURAM_LOCATION);
        break;
      case 'NURI':
        setTargetLocation(DORMITORY_NURI_LOCATION);
        break;
      case 'SULIM':
        setTargetLocation(DORMITORY_SULIM_LOCATION);
        break;
      default:
        break;
    }
    console.log(target, targetLocation);
  }, [target]);
  useEffect(() => {
    location &&
      targetLocation &&
      setDistance(getDistance(location, targetLocation));
  }, [targetLocation, location]);
  useEffect(() => {
    console.log('distance', distance);
  }, [distance]);
  useEffect(() => {
    const getCurrentPosition = Geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
    const watchId = Geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
    });

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [location]);

  useEffect(() => {
    console.log(location);
  }, [location]);
  const [modal, setModal] = useState(true);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };
  const loadingModalData = {
    title: '잠시만 기다려주세요!',
    description: '',
    modal: modal,
    handleModal: handleModal,
    confirmEvent: handleModal,
    choiceCnt: 1,
  };
  const [modalData, setModalData] = useState<{
    title: string;
    modal: boolean;
    handleModal: () => void;
    confirmEvent: any;
    choiceCnt: number;
    description?: string;
  }>(loadingModalData);

  return (
    <View>
      {location ? (
        <View style={{width: '100%', height: '100%'}}>
          <DormitoryDropDown setTarget={setTarget} target={target} />
          <View style={{flex: 6}}>
            {location ? (
              <Map location={location} handleModal={handleModal} />
            ) : (
              modalData && (
                <UsePopup
                  title={modalData.title}
                  modal={modal}
                  handleModal={handleModal}
                  choiceCnt={modalData.choiceCnt}
                  icon={true}
                />
              )
            )}
          </View>
          {target.id === -1 ||
          (distance && distance <= 0.2) ||
          distance === 0 ? (
            <></>
          ) : (
            <View
              style={{
                width: '100%',
                height: 40,
                backgroundColor: LINE_ORANGE_COLOR,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 24,
                  textAlign: 'center',
                  color: 'white',
                }}>
                현재 위치가 '{target.name}'에 있지 않습니다.
              </Text>
            </View>
          )}
          <View style={{flex: 1, margin: 15}}>
            {(distance && distance <= 0.2) || distance === 0 ? (
              <BtnVerticalOrange
                onPress={() => {
                  putUserDormitory();
                }}
                text={'거점 인증하기'}></BtnVerticalOrange>
            ) : (
              <BtnVerticalDeactive text="거점 인증하기" onPress={() => {}} />
            )}
          </View>
        </View>
      ) : (
        <UsePopup
          title={modalData?.title}
          modal={modal}
          handleModal={handleModal}
          choiceCnt={modalData?.choiceCnt}
          icon={true}
        />
      )}
    </View>
  );
};

export default GPS;
