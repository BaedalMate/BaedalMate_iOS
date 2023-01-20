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

const DormitoryDropDown = ({target, setTarget}) => {
  const [dormIndex, setDormIndex] = useState<number>();
  useEffect(() => {
    target === 'NURI' || target === '누리학사'
      ? setDormIndex(0)
      : target === 'SUNGLIM' || target === '성림학사'
      ? setDormIndex(1)
      : target === 'KB' || target === 'KB학사'
      ? setDormIndex(2)
      : target === 'BURAM' || target === '불암학사'
      ? setDormIndex(3)
      : setDormIndex(4);
  }, [target]);

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
          defaultValueByIndex={dormIndex}
          defaultValue={''}
          renderDropdownIcon={() => {
            return <Image source={BOTTOM_ARROW} />;
          }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            if (selectedItem === '누리학사') {
              setTarget('NURI');
            } else if (selectedItem === '성림학사') {
              setTarget('SUNGLIM');
            } else if (selectedItem === 'KB학사') {
              setTarget('KB');
            } else if (selectedItem === '불암학사') {
              setTarget('BURAM');
            } else if (selectedItem === '수림학사') {
              setTarget('SULIM');
            }
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem;
          }}
          rowTextForSelection={item => {
            return item;
          }}
        />
      </View>
    </View>
  );
};

const changeTargetToDormitory = target => {
  let changedDormitory =
    target === 'KB' || target === 'KB학사'
      ? 'KB학사'
      : target === 'SUNGLIM' || target === '성림학사'
      ? '성림학사'
      : target === 'SULIM' || target === '수림학사'
      ? '수림학사'
      : target === 'BURAM' || target === '불암학사'
      ? '불암학사'
      : '누리학사';
  return changedDormitory;
};
const GPS = props => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<LocationI>();
  const [dormitory, setDormitory] = useRecoilState(userDormitoryState);
  const [target, setTarget] = useRecoilState(selectDormitoryState);
  const [targetLocation, setTargetLocation] = useState<LocationI>();
  const [distance, setDistance] = useState<number>();
  // const Authentication = (latitude: number, longitude: number) => {};

  const getTarget = async () => {
    // const originTarget = await AsyncStorage.getItem('@BaedalMate_Dormitory');
    props.route.params && props.route.params.target
      ? setTarget(props.route.params.target)
      : setTarget(dormitory);
  };

  const success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({latitude, longitude});

    // if (latitude === target.latitude && longitude === target.longitude) {
    //   Authentication(latitude, longitude);
    // }
  };
  const error = error => {
    console.error(error);
  };
  // const options = {
  //   enableHiAccuracy: true,
  // };
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
    let changedDormitory =
      target === 'KB학사' || target === 'KB'
        ? 'KB'
        : target === '성림학사' || target === 'SUNGLIM'
        ? 'SUNGLIM'
        : target === '수림학사' || target === 'SULIM'
        ? 'SULIM'
        : target === '불암학사' || target === 'BURAM'
        ? 'BURAM'
        : 'NURI';
    const JWTAccessToken = await getJWTToken();
    console.log(changedDormitory, JWTAccessToken);
    try {
      const data = await axios
        .put(
          userURL,
          {},
          {
            params: {
              dormitory: changedDormitory,
            },
            headers: {
              Authorization: 'Bearer ' + JWTAccessToken,
            },
          },
        )
        .then(function (response) {
          console.log('put dormitory', response);
          console.log(response);
          // AsyncStorage에 유저 이름과 배달 거점 저장
          // AsyncStorage.setItem('@BaedalMate_Dormitory', changedDormitory);
          // 해당 페이지는 렌더링 문제로 state 설정 후 사용
          if (response.status === 200) {
            setDormitory(changeTargetToDormitory(changedDormitory));
            setTarget(dormitory);
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
          }

          return response;
        })
        .catch(function (error) {
          console.log('put dormitory', error);
          return false;
        });
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    getTarget();
  }, []);

  useEffect(() => {
    switch (target) {
      case 'SUNGLIM' || '성림학사':
        setTargetLocation(DORMITORY_SUNGLIM_LOCATION);
        break;
      case 'KB' || 'KB학사':
        setTargetLocation(DORMITORY_KB_LOCATION);
        break;
      case 'BURAM' || '불암학사':
        setTargetLocation(DORMITORY_BURAM_LOCATION);
        break;
      case 'NURI' || '누리학사':
        setTargetLocation(DORMITORY_NURI_LOCATION);
        break;
      case 'SULIM' || '수림학사':
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
  // useEffect(() => {
  //   handleModal();
  // }, [location]);
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
          {(distance && distance <= 0.2) || distance === 0 ? (
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
                현재 위치가 '{changeTargetToDormitory(target)}'에 있지 않습니다.
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
        // <>
        //   <Text>Latitude:{location.latitude}</Text>
        //   <Text>Longitude:{location.longitude}</Text>
        // </>
        // <Text>Loading</Text>
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
