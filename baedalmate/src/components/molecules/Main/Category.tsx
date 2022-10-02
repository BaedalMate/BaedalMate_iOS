import React from 'react';

import {View} from 'react-native';
import CategoryItem from '../../atoms/Main/CategoryItem';
import {TextKRBold} from 'themes/text';

// interface CategoryProps {
//   navigation: NavigationProp<any, any>;
//   user: {
//     userName: string;
//     userAddress: string;
//   };
// }

const Category = ({navigation}) => {
  return (
    <View
      style={{
        height: 200,
        marginTop: 30,
        paddingHorizontal: '5%',
      }}>
      <TextKRBold
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 12,
          color: '#212123',
        }}>
        메뉴 둘러보기
      </TextKRBold>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <CategoryItem
          categoryName="전체보기"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"
          navigation={navigation}></CategoryItem>
        <CategoryItem
          categoryName="1인분"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"
          navigation={navigation}></CategoryItem>
        <CategoryItem
          categoryName="치킨"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"
          navigation={navigation}></CategoryItem>
        <CategoryItem
          categoryName="한식"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"
          navigation={navigation}></CategoryItem>
        <CategoryItem
          categoryName="전체보기"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"
          navigation={navigation}></CategoryItem>
        <CategoryItem
          categoryName="1인분"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"
          navigation={navigation}></CategoryItem>
        <CategoryItem
          categoryName="치킨"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"
          navigation={navigation}></CategoryItem>
        <CategoryItem
          categoryName="한식"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"
          navigation={navigation}></CategoryItem>
      </View>
    </View>
  );
};

export default Category;
