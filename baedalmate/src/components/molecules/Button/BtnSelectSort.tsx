import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LINE_ORANGE_COLOR, WHITE_COLOR} from 'themes/theme';
import BtnRadio from 'components/atoms/Button/BtnRadio';
export type TagProps = {
  text: string;
  active: boolean;
};

const BtnSelectSort = ({option, setOption}) => {
  const data = [
    {name: '인기순', value: 'view'},
    {name: '평점순', value: 'score'},
    {name: '마감순', value: 'deadlineDate'},
  ];
  // const [option, setOption] = useState(null);

  return (
    <View>
      <BtnRadio data={data} onSelect={value => setOption(value)} />
    </View>
  );
};

const styles = StyleSheet.create({
  tagWrapper: {
    width: 55,
    height: 28,
    backgroundColor: LINE_ORANGE_COLOR,
    borderRadius: 10,
  },
  tagText: {
    color: WHITE_COLOR,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default BtnSelectSort;
