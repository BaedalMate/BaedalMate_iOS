import React, {useEffect, useState} from 'react';

import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BtnSelectSort from '../Button/BtnSelectSort';
import BaedalMateRecommendationItem from 'components/atoms/Main/BaedalMateRecommendationItem';
import {eachMainRecruitListI, mainRecruitListURL} from 'components/pages/Main';
import axios from 'axios';
import {getJWTToken} from 'components/utils/api/Recruit';

const BaedalMateRecommendation = ({
  mainRecruitSortList,
  setMainRecruitSortList,
  option,
  setOption,
}: {
  mainRecruitSortList;
  setMainRecruitSortList;
  option;
  setOption;
}) => {
  // const [option, setOption] = useState(null);

  // const [mainRecruitSortList, setMainRecruitSortList] = useState<
  //   eachMainRecruitListI[]
  // >([]);
  // 메인 모집글 리스트 api
  // 모집글 리스트 Api 받아옴
  const getMainRecruitSortList = async () => {
    try {
      const JWTAccessToken = await getJWTToken();
      if (JWTAccessToken) {
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
          .then(response => {
            if (response.status === 200) {
              console.log(response);
              response.data &&
                response.data.recruitList &&
                setMainRecruitSortList(response.data.recruitList);
              return response.data.recruitList;
            }
            return response;
          })
          .catch(function (error) {
            console.log(error);
            return error;
          });
        return BoardListData;
      }
    } catch (error) {
      console.log(error);
      return error;
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
            <BaedalMateRecommendationItem item={v} key={v.recruitId} />
          ))}
      </ScrollView>
    </View>
  );
};

export default BaedalMateRecommendation;
