import {eachMainRecruitListI, mainRecruitListI} from 'components/pages/Main';
import React from 'react';

import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import NowGatheringItem from '../../atoms/Main/NowGatheringItem';

// interface CategoryProps {
//   navigation: NavigationProp<any, any>;
//   user: {
//     userName: string;
//     userAddress: string;
//   };
// }

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
          <NowGatheringItem item={v}></NowGatheringItem>
          // <NowGatheringItem item={mainRecruitList[1]}></NowGatheringItem>
          // <NowGatheringItem item={mainRecruitList[2]}></NowGatheringItem>
          // <NowGatheringItem item={mainRecruitList[3]}></NowGatheringItem>
          // <NowGatheringItem item={mainRecruitList[4]}></NowGatheringItem>
        ))}
      </ScrollView>
    </View>
  );
};

export default NowGathering;
