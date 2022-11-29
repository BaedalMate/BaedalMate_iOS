import React, {useEffect, useState} from 'react';

import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BtnSelectSort from '../Button/BtnSelectSort';
import BaedalMateRecommendationItem from 'components/atoms/Main/BaedalMateRecommendationItem';
import {
  eachMainRecruitListI,
  mainRecruitListI,
  mainRecruitListURL,
} from 'components/pages/Main';
import axios from 'axios';
import {getJWTToken} from 'components/utils/Main';

const BaedalMateRecommendation = ({}: {}) => {
  const [option, setOption] = useState(null);

  const [mainRecruitSortList, setMainRecruitSortList] =
    useState<eachMainRecruitListI[]>();
  // 메인 모집글 리스트 api
  // 모집글 리스트 Api 받아옴
  const getMainRecruitSortList = async () => {
    try {
      const JWTAccessToken = await getJWTToken();

      const BoardListData = await axios
        .get(mainRecruitListURL, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
          params: {
            page: 0,
            size: 5,
            sort: option,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data.recruitList);
            setMainRecruitSortList(response.data.recruitList);
            return response.data.recruitList;
          }
          return false;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
      return BoardListData;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    getMainRecruitSortList();
  }, [option]);

  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          marginRight: 15,
        }}>
        <BtnSelectSort option={option} setOption={setOption} />
      </View>

      <ScrollView
        horizontal={true}
        style={
          {
            // justifyContent: 'space-between',
          }
        }
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        {mainRecruitSortList &&
          mainRecruitSortList.map((v, i) => (
            <BaedalMateRecommendationItem item={mainRecruitSortList[0]} />
          ))}
      </ScrollView>
    </View>
  );
};

export default BaedalMateRecommendation;
