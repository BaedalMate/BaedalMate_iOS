import React, {useEffect, useState} from 'react';
import DetailImage from 'components/atoms/Image/DetailImage';
import {ScrollView, View} from 'react-native';
import UserInfo from 'components/molecules/Detail/UserInfo';
import Title from 'components/molecules/Detail/Title';
import ItemInfo from 'components/molecules/Detail/ItemInfo';
import Description from 'components/molecules/Detail/Description';
import {BtnWithTextProps} from 'components/atoms/Button/BtnHorizontalGray';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import axios from 'axios';
import {recruitListURL} from './Main';
import {url} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const BoardItemDetail: React.FC<BtnWithTextProps> = props => {
  const detailURL = url + '/api/1v / recruit / {recruitId}';
  const getJWTToken = async () => {
    const JWTAccessToken = await AsyncStorage.getItem(
      '@BaedalMate_JWTAccessToken',
    );
    return String(JWTAccessToken);
  };
  const [itemDetaildata, setItemDetailData] = useState<RecruitItemProps>();
  const getDetailData = async () => {
    const JWTAccessToken = await getJWTToken();
    console.log(JWTAccessToken);
    try {
      const DetailData = axios
        .get(detailURL, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
          params: {
            recruitId: 3,
          },
        })
        .then(function (response) {
          setItemDetailData(response.data);
          console.log(itemDetaildata);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
      return DetailData;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <ScrollView>
      <DetailImage item={itemDetaildata} />
      <UserInfo item={itemDetaildata} />
      <Title item={itemDetaildata} />
      <ItemInfo item={itemDetaildata} />
      <Description item={itemDetaildata} />
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 30,
          marginBottom: 62,
        }}>
        <BtnVerticalOrange
          onPress={props.onPress}
          text="모집 참여하기"></BtnVerticalOrange>
      </View>
    </ScrollView>
  );
};

export default BoardItemDetail;
