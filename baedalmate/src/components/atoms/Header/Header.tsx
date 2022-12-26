import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {ALARM_WHITE, SEARCH_WHITE} from 'themes/theme';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <TouchableOpacity
        onPressOut={() => {
          navigation.navigate('검색' as never);
        }}>
        <Image
          source={SEARCH_WHITE}
          style={{
            margin: 13,
            marginBottom: 0,
          }}
        />
      </TouchableOpacity>
      {/* <Image
        source={ALARM_WHITE}
        style={{
          margin: 13,
          marginBottom: 0,
        }}
      /> */}
    </View>
  );
};

export default Header;
