import React from 'react';

import {StyleSheet, View, Image} from 'react-native';
import {ALARM_WHITE, SEARCH_WHITE} from 'themes/theme';

const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <Image
        source={SEARCH_WHITE}
        style={{
          margin: 13,
          marginBottom: 0,
        }}
      />
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
