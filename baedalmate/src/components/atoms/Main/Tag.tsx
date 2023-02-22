import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {TextKRBold} from 'themes/text';
export type TagProps = {
  text: string;
};

const Tag = ({text}) => {
  return (
    <View style={styles.tagWrapper}>
      <TextKRBold style={styles.tagText}>#{text}</TextKRBold>
    </View>
  );
};

const styles = StyleSheet.create({
  tagWrapper: {
    alignSelf: 'center',
    height: 24,
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    margin: 3,
  },
  tagText: {
    color: PRIMARY_COLOR,
    fontSize: 12,
  },
});

export default Tag;
