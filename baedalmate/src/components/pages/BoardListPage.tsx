import React from 'react';
import {View} from 'react-native';
import {WHITE_COLOR} from 'themes/theme';
import BoardList from 'components/molecules/BoardList/BoardList';
import Sort from 'components/molecules/BoardList/Sort';
import {CategoryList} from 'components/atoms/BoardList/CategoryItem';
import BtnFloating from 'components/atoms/Button/BtnFloating';

const BoardListPage = props => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: WHITE_COLOR,
      }}>
      <CategoryList />
      <Sort />
      <BoardList />
      <BtnFloating
        onPress={() => {
          props.navigation.navigate('상세 설정');
          // 임시 값. 변경 필요
        }}
      />
    </View>
  );
};

export default BoardListPage;
