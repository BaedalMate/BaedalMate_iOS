import {url} from '../../../../App';
import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const DetailImage = ({item}: {item: RecruitItemProps | undefined}) =>
  // props: BtnWithoutTextProps
  {
    return (
      <View>
        {/* <View
          style={{
            width: '100%',
            height: 214,
            backgroundColor: '#444444',
          }}></View> */}
        <Image
          source={{
            uri: url + '/images/' + item?.image,
          }}
          style={{
            width: '100%',
            height: 267,
            backgroundColor: '#FB6C1C',
          }}></Image>
      </View>
    );
  };

const styles = StyleSheet.create({});

export default DetailImage;
