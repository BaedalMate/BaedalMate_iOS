/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BtnFloating from './src/components/atoms/BtnFloating';
import BtnHorizontal2 from './src/components/molecules/BtnHorizontal2';
import BtnHorizontal3 from './src/components/molecules/BtnHorizontal3';
import BtnVertical from './src/components/molecules/BtnVertical';
import {Fonts} from './src/assets/Fonts';
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: '#fff',
        }}
        screenOptions={{}}>
        <Tab.Screen name="BtnHorizontal2" component={BtnHorizontal2} />
        <Tab.Screen name="BtnHorizontal3" component={BtnHorizontal3} />
        <Tab.Screen name="BtnVertical" component={BtnVertical} />
        <Tab.Screen name="BtnFloating" component={BtnFloating} />
        <Tab.Screen name="BtnFloating2" component={BtnFloating} />
      </Tab.Navigator>
      {/* <View>
        <View style={styles.sectionContainer}>
          <BtnHorizontal2></BtnHorizontal2>
        </View>
        <View style={styles.sectionContainer}>
          <BtnHorizontal3></BtnHorizontal3>
        </View>
        <View style={styles.sectionContainer}>
          <BtnVertical></BtnVertical>
        </View>
        <View style={styles.floatingBtn}>
          <BtnFloating></BtnFloating>
        </View>
      </View> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  floatingBtn: {
    bottom: -100,
    marginHorizontal: '5%',
  },
});

export default App;
