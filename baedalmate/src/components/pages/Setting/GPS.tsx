import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import BtnVerticalDeactive from 'components/atoms/Button/BtnVerticalDeactive';
import BtnVerticalGray from 'components/atoms/Button/BtnVerticalGray';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import {DormitoryDescriptionInput} from 'components/atoms/CreateRecruit/Input';
import {Map} from 'components/molecules/Setting/Map';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {WHITE_COLOR, BOTTOM_ARROW} from 'themes/theme';
import {dormitoryList} from '../CreateRecuit/second';

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

const DormitoryDropDown = ({setTarget}) => {
  // const {
  //   control,
  //   handleSubmit,
  //   setValue,
  //   formState: {errors},
  // } = useForm();
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
        {/* <DormitoryInput
                  error={errors}
                  name={'dormitory'}
                  control={control}
                  rules={{required: true}}
                  setValue={setValue}
                /> */}
        <SelectDropdown
          buttonStyle={{
            // borderWidth: errors.place ? 1 : 0,
            // borderColor: errors.place ? ERROR_COLOR : WHITE_COLOR,
            backgroundColor: WHITE_COLOR,
            borderRadius: 10,
            height: 45,
            flex: 1,
            // width: 255,
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
          defaultValueByIndex={0}
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
const GPS = props => {
  const [location, setLocation] = useState<LocationI>();
  const [target, setTarget] = useState<string | null>();
  const [targetLocation, setTargetLocation] = useState<LocationI>();
  const [distance, setDistance] = useState<number>();
  // const Authentication = (latitude: number, longitude: number) => {};

  const getTarget = async () => {
    const originTarget = await AsyncStorage.getItem('@BaedalMate_Dormitory');
    setTarget(originTarget);
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

  useEffect(() => {
    getTarget();
  }, []);
  useEffect(() => {
    console.log(target);
  }, [target]);
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
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <View>
      {location ? (
        <View style={{width: '100%', height: '100%'}}>
          <DormitoryDropDown setTarget={setTarget} />
          <View style={{flex: 6}}>
            <Map location={location} />
          </View>
          <View style={{flex: 1, justifyContent: 'center', margin: 10}}>
            {(distance && distance <= 0.2) || distance === 0 ? (
              <BtnVerticalOrange
                onPress={() => {}}
                text={'인증하기'}></BtnVerticalOrange>
            ) : (
              <BtnVerticalDeactive text="인증하기" onPress={() => {}} />
            )}
          </View>
        </View>
      ) : (
        // <>
        //   <Text>Latitude:{location.latitude}</Text>
        //   <Text>Longitude:{location.longitude}</Text>
        // </>
        <Text>Loading</Text>
      )}
    </View>
  );
};

export default GPS;
