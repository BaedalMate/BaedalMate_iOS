import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
  TouchableHighlight,
} from 'react-native';
import {LIGHT_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {TextKRReg} from 'themes/text';

interface CategoryItemProps {
  // navigation: NavigationProp<any, any>;
  navigation: any;
  category: {
    categoryId: number;
    categoryName: string;
    categoryImg: ImageSourcePropType;
  };
  // img: string;
}

const CategoryItem: React.FunctionComponent<CategoryItemProps> = ({
  category,
  // img,
  navigation,
  // onPress
}) => {
  const [active, setActive] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(LIGHT_GRAY_COLOR);
  const [borderColor, setBorderColor] = useState(WHITE_COLOR);

  const goToCategory = () => {
    // setActive(!active);
    navigation.navigate('카테고리', {
      categoryId: category.categoryId,
    });
  };
  const onPress = () => {
    setActive(!active);
    // navigation.navigate('BoardStackComponent');
  };

  return (
    <View style={{marginBottom: 15}}>
      <TouchableHighlight
        underlayColor={WHITE_COLOR}
        // activeOpacity={1}
        // onPressIn={onPress}
        onPressIn={onPress}
        onPressOut={onPress}
        onPress={goToCategory}
        style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: active ? PRIMARY_COLOR : WHITE_COLOR,
          backgroundColor: active ? WHITE_COLOR : LIGHT_GRAY_COLOR,
        }}>
        <View style={styles.itemStyle}>
          <Image
            source={category.categoryImg}
            style={{width: 45, height: 45, borderRadius: 45 / 2}}></Image>
          <TextKRReg style={{}}>{category.categoryName}</TextKRReg>
        </View>
      </TouchableHighlight>
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
