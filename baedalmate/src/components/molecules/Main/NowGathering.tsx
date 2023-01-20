import {eachMainRecruitListI, mainRecruitListI} from 'components/pages/Main';
import React from 'react';

import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import NowGatheringItem from '../../atoms/Main/NowGatheringItem';

const NowGathering = ({
  mainRecruitList,
}: {
  mainRecruitList: eachMainRecruitListI[];
}) => {
  return (
    <View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        {mainRecruitList.map((v, i) => (
          <NowGatheringItem item={v} key={i}></NowGatheringItem>
        ))}
      </ScrollView>
    </View>
  );
};

export default NowGathering;
