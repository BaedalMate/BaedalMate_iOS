import {SortActive, SortDefault} from 'components/atoms/BoardList/SortItem';
import {sortData} from 'components/pages/BoardListPage';
import React, {useState} from 'react';
import {View} from 'react-native';

const Sort = ({selectedSort, setSelectedSort}) => {
  // const [selectedSort, setSelectedSort] = useState(sortData[0].value);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 10,
        justifyContent: 'flex-end',
      }}>
      {sortData.map((v, i) => (
        <SortDefault
          key={i}
          item={v}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
      ))}
      {/* <SortDefault text="마감순" /> */}
      {/* <Default text="평점순" />
      <SortDefault text="인기순" /> */}
    </View>
  );
};

export default Sort;
