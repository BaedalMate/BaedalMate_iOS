import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextKRReg} from 'themes/text';
import {
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
  X_PRIMARY_ICON,
} from 'themes/theme';

const RecruitTag = ({
  tagList,
  setTagList,
  text,
  id,
}: {
  tagList: {tagname: string}[];
  setTagList: Function;
  text: string;
  id: number;
}) => {
  const deleteTag = id => {
    setTagList(
      tagList.filter((v, i) => {
        return id !== i;
      }),
    );
  };
  return (
    <View
      style={{
        height: 24,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 7,
        backgroundColor: WHITE_COLOR,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        borderRadius: 11,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
      }}>
      <TextKRReg
        style={{
          fontWeight: '400',
          fontSize: 14,
          lineHeight: 24,
          color: PRIMARY_COLOR,
        }}>
        {text[0] === '#' ? text : '#' + text}{' '}
      </TextKRReg>
      <TouchableOpacity
        style={{justifyContent: 'center'}}
        onPress={() => deleteTag(id)}>
        <Image
          source={X_PRIMARY_ICON}
          style={{
            width: 10,
            height: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boardItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 15,
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: LINE_GRAY_COLOR,
    alignItems: 'stretch',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  storeImg: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginRight: 15,
  },
});

export default RecruitTag;
