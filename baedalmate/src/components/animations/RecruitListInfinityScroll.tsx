import React from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';

export const RecruitListInfinityScroll = () => (
  <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <LottieView
      source={require('../../assets/animations/lf30_editor_wurihikr.json')}
      autoPlay
      loop
      style={{
        width: 50,
        height: 50,
        // position: 'absolute',
        // bottom: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}
    />
  </View>
);
