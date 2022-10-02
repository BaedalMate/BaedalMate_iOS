import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';

import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {LIGHT_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {TextKRReg} from 'themes/text';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

interface CategoryItemProps {
  // navigation: NavigationProp<any, any>;
  navigation: any;
  categoryName: string;
  img: string;
}

const CategoryItem: React.FunctionComponent<CategoryItemProps> = ({
  categoryName,
  img,
  navigation,
  // onPress
}) => {
  const [active, setActive] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(LIGHT_GRAY_COLOR);
  const [borderColor, setBorderColor] = useState(WHITE_COLOR);

  const goToCategory = () => {
    setActive(!active);
    navigation.navigate('카테고리');
  };
  const onPress = () => {
    setActive(!active);
    // navigation.navigate('BoardStackComponent');
  };

  return (
    <View style={{marginBottom: 15}}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={goToCategory}
        onPressOut={goToCategory}
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
