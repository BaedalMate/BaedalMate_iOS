import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
// export type dormitory =
//   | '누리학사'
//   | '성림학사'
//   | 'KB학사'
//   | '불암학사'
//   | '수림학사';
export interface RecruitItemProps {
  createDate: string;
  deadlineDate: string;
  deliveryFee: number;
  description: string;
  dormitory: string;
  id: number;
  minPeople: number;
  minPrice: number;
  participate: false;
  platform: string;
  thumbnailImage: string;
  title: string;
  userImage: string;
  userScore: number;
  username: string;
}
export const RESTAPI_KEY = '87b35370ef59bf008c5f34f627b1818b';
// const dormitoryList = [
//   '누리학사',
//   '성림학사',
//   'KB학사',
//   '불암학사',
//   '수림학사',
// ];
interface LocationList {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}
const PlaceSearch = props => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      place: {},
    },
  });
  // const {place} = route.params;
  // const {setLocationObj} = props;
  // const [locationObj, setLocationObj] = useState({
  //   si: '',
  //   gu: '',
  //   dong: '',
  //   locationX: '',
  //   locationY: '',
  // });
  const [location, setLocation] = useState({
    address_name: '',
    road_address_name: '',
    place_name: '',
    x: '',
    y: '',
  });
  const [locationList, setLocationList] = useState<{
    documents: LocationList[];
    meta: {};
  }>();

  // const getLocalAPI = () => {
  //   const place = axios
  //     .get(`https://dapi.kakao.com/v2/local/search/keyword.${location}`, {
  //       headers: {Authorization: `KakaoAK ${RESTAPI_KEY}`},
  //     })
  //     .then(res => {
  //       const location = res.data.documents[0];
  //       console.log(location);
  //       setLocationObj({
  //         si: location.address.region_1depth_name,
  //         gu: location.address.region_2depth_name,
  //         dong: location.address.region_3depth_name,
  //         locationX: location.address.x,
  //         locationY: location.address.y,
  //       });
  //       return location;
  //     });
  //   console.log(place);
  // };
  async function placeSearch(location) {
    let url = `https://dapi.kakao.com/v2/local/search/keyword.json`;
    let result = await axios
      .get(url, {
        headers: {
          ContentType: `application/json`,
          Authorization: `KakaoAK ${RESTAPI_KEY}`, //KakaoAK하고 한 칸 띄워야합니다.
        },
        params: {
          query: location,
        },
      })
      .then(response => response.data)
      .then(responseData => {
        console.log(responseData); //responseData가 최종 값입니다.
        // if ('error' in responseData) {
        //   return;
        // }
        setLocationList(responseData);
      })
      .catch(errors => console.log(errors));
    console.log(result);
  }
  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
        padding: 15,
        height: '100%',
      }}>
      <TextKRBold style={styles.Label}>배달 가게 선택 </TextKRBold>
      <View style={{marginBottom: 15}}>
        <TextInput
          style={{
            backgroundColor: LINE_GRAY_COLOR,
            width: '100%',
            height: 45,
            borderRadius: 10,
            padding: 15,
          }}
          onChangeText={text => {
            placeSearch(text);
          }}
        />
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: DARK_GRAY_COLOR,
          marginBottom: 15,
          paddingBottom: 5,
        }}>
        <Text
          style={{
            color: DARK_GRAY_COLOR,
          }}>
          장소결과
        </Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: WHITE_COLOR,
          // marginBottom: 150,
        }}>
        {locationList &&
          locationList.documents &&
          locationList.documents.map((v, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: LINE_GRAY_COLOR,
                }}>
                <View>
                  <TextKRBold
                    style={{
                      fontSize: 16,
                      lineHeight: 30,
                    }}>
                    {v.place_name}
                  </TextKRBold>
                  <TextKRReg
                    style={{
                      color: DARK_GRAY_COLOR,
                    }}>
                    {v.address_name}
                  </TextKRReg>
                </View>
                <View style={{backgroundColor: WHITE_COLOR, width: 60}}>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: LINE_GRAY_COLOR,
                    }}
                    onPress={() => {
                      console.log(locationList.documents[i]),
                        setLocation({
                          address_name: locationList.documents[i].address_name,
                          road_address_name:
                            locationList.documents[i].road_address_name,
                          place_name: locationList.documents[i].place_name,
                          x: locationList.documents[i].x,
                          y: locationList.documents[i].y,
                        });
                      // AsyncStorage.setItem(
                      //   'place_name',
                      //   locationList.documents[i].place_name,
                      // );
                      // AsyncStorage.setItem(
                      //   'address_name',
                      //   locationList.documents[i].address_name,
                      // );
                      // AsyncStorage.setItem(
                      //   'road_address_name',
                      //   locationList.documents[i].road_address_name,
                      // );
                      // AsyncStorage.setItem('x', locationList.documents[i].x);
                      // AsyncStorage.setItem('y', locationList.documents[i].y);
                      props.navigation.navigate('상세 설정2', {
                        name: locationList.documents[i].place_name,
                        addressName: locationList.documents[i].address_name,
                        roadAddressName:
                          locationList.documents[i].road_address_name,
                        x: locationList.documents[i].x,
                        y: locationList.documents[i].y,
                        data: props.route.params.data,
                      });
                    }}>
                    <TextKRBold>선택</TextKRBold>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginLeft: 10,
  },
  Title: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlignVertical: 'center',
    color: PRIMARY_COLOR,
  },
  TitleInput: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    // textAlign: 'center',
    textAlignVertical: 'center',
  },
  Label: {
    color: PRIMARY_COLOR,
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 15,
    // textAlign: 'center',
    textAlignVertical: 'center',
  },
  Description: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    alignItems: 'center',
    textAlignVertical: 'center',
    color: DARK_GRAY_COLOR,
  },
});

export default PlaceSearch;
