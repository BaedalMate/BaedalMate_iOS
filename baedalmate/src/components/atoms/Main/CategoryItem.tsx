import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Slider from 'components/atoms/Main/Slider';
import ImageSlider from 'components/atoms/Main/Slider';
import TodayMenuItem from 'components/atoms/Main/Slider';
import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ALARM_WHITE,
  BLACK_COLOR,
  LIGHT_GRAY_COLOR,
  PRIMARY_COLOR,
  SEARCH_WHITE,
  WHITE_COLOR,
} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';

interface CategoryItemProps {
  // navigation: NavigationProp<any, any>;
  categoryName: string;
  img: string;
}

const CategoryItem: React.FunctionComponent<CategoryItemProps> = ({
  categoryName,
  img,
}) => {
  const [active, setActive] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(LIGHT_GRAY_COLOR);
  const [borderColor, setBorderColor] = useState(WHITE_COLOR);
  const onPress = () => {
    setActive(!active);
  };

  // const touchProps = {
  //   onPress: {onPress},
  //   style: {
  //     width: 75,
  //     height: 75,
  //     borderRadius: 10,
  //     alignItems: 'center',
  //     justifyContent: 'space-around',
  //     borderColor: {active} ? PRIMARY_COLOR : WHITE_COLOR,
  //     backgroundColor: {active} ? WHITE_COLOR : LIGHT_GRAY_COLOR,
  //   },
  // };

  return (
    <View style={{marginBottom: 15}}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={onPress}
        onPressOut={onPress}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: active ? PRIMARY_COLOR : WHITE_COLOR,
          backgroundColor: active ? WHITE_COLOR : LIGHT_GRAY_COLOR,
        }}>
        <View style={styles.itemStyle}>
          <Image
            source={{uri: img}}
            style={{width: 45, height: 45, borderRadius: 45 / 2}}></Image>
          <TextKRReg style={{}}>{categoryName}</TextKRReg>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    width: 75,
    height: 75,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default CategoryItem;
