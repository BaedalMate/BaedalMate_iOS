import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {View, Image, TouchableOpacity} from 'react-native';
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
      <TouchableOpacity
        onPressOut={() => {
          navigation.navigate('알림' as never);
        }}>
        <Image
          source={ALARM_WHITE}
          style={{
            margin: 13,
            marginBottom: 0,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
