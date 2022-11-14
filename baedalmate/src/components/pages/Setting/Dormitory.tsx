import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {DormitoryList} from 'components/atoms/BottomSheet/ChangeDormitoryBottomSheet';
import BtnCreateFloating from 'components/atoms/Button/BtnCreateFloating';
import {BtnActive} from 'components/atoms/Button/BtnEndStandard';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import Description from 'components/molecules/Detail/Description';
import {Map} from 'components/molecules/Setting/Map';
import {getJWTToken} from 'components/utils/Main';
import React, {useEffect, useState} from 'react';
import {
  AsyncStorage,
  Button,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {userURL} from '../Main';

export interface LocationI {
  latitude: number;
  longitude: number;
}
const Dormitory = props => {
  const [location, setLocation] = useState<LocationI>();
  const [modal, setModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(props.userAddress);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };

  // User dormitory 변경
  const putUserDormitory = async () => {
    let changedDormitory =
      selectedAddress === 'KB학사'
        ? 'KB'
        : selectedAddress === '성림학사'
        ? 'SUNGLIM'
        : selectedAddress === '수림학사'
        ? 'SULIM'
        : selectedAddress === '불암학사'
        ? 'BURAM'
        : 'NURI';
    const JWTAccessToken = await getJWTToken();
    console.log(changedDormitory, JWTAccessToken);
    try {
      const {data} = await axios
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
          AsyncStorage.setItem('@BaedalMate_Dormitory', changedDormitory);
          // 해당 페이지는 렌더링 문제로 state 설정 후 사용
          props.setDormitory(changedDormitory);
          return response.data;
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
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedAddress(item.value);
        }}
        style={{
          height: 52,
          width: '100%',
          paddingHorizontal: 15,
          justifyContent: 'center',
          borderBottomColor: LINE_GRAY_COLOR,
          borderBottomWidth: 1,
        }}>
        <TextKRReg
          style={{
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 24,
            color: selectedAddress === item.value ? PRIMARY_COLOR : '#666666',
          }}>
          {item.value}
        </TextKRReg>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    putUserDormitory();
  }, [selectedAddress]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  return (
    <View style={{backgroundColor: WHITE_COLOR, width: '100%', height: '100%'}}>
      {location ? (
        <View style={{width: '100%', height: '100%', padding: 10}}>
          <View style={{marginVertical: 10, flex: 1}}>
            <TextKRBold
              style={{
                fontSize: 18,
                justifyContents: 'center',
                alignItems: 'center',
                textAlign: 'center',
                marginVertical: 10,
              }}>
              거점 선택
            </TextKRBold>
            <TextKRReg
              style={{
                color: DARK_GRAY_COLOR,
              }}>
              거점을 선택한 뒤 'GPS 인증하기'에서 거점 인증을 완료해주세요.
            </TextKRReg>
          </View>
          <View style={{width: '100%', flex: 4}}>
            <FlatList data={DormitoryList} renderItem={renderItem} />
          </View>
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
            }}>
            <BtnVerticalOrange
              onPress={() => {}}
              text={'거점 설정하기'}></BtnVerticalOrange>
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

export default Dormitory;
