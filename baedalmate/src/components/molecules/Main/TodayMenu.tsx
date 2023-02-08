import Slider from 'components/atoms/Main/Slider';
import {mainTagRecruitListI} from 'components/pages/Main';
import React from 'react';

import {View} from 'react-native';
import {PRIMARY_COLOR} from 'themes/theme';
import Header from '../../atoms/Header/Header';
import UserInfoTitle from '../../atoms/Main/UserInfoTitle';

interface UserDataProps {
  dormitory: {id: number; name: string; value: string};
  nickname: string;
  mainTagRecruitList: mainTagRecruitListI;
}

const TodayMenu: React.FunctionComponent<UserDataProps> = ({
  dormitory,
  nickname,
  mainTagRecruitList,
}) => {
  return (
    <View
      style={{
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        height: 387,
        paddingHorizontal: '5%',
      }}>
      <Header />
      <UserInfoTitle userName={nickname} userAddress={dormitory} />

      <Slider mainTagRecruitList={mainTagRecruitList} />
    </View>
  );
};

export default TodayMenu;
