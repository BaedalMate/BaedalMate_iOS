import {SortActive, SortDefault} from 'components/atoms/BoardList/SortItem';
import React from 'react';
import {View} from 'react-native';

const Sort = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 10,
      }}>
      <SortActive />
      <SortDefault text="마감순" />
      <SortDefault text="평점순" />
    </View>
  );
};

export default Sort;
