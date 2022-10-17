import React from 'react';

import {View} from 'react-native';
import CategoryItem from '../../atoms/Main/CategoryItem';
import {TextKRBold} from 'themes/text';
import {
  CATEGORY_ASIAN_IMG,
  CATEGORY_BUNSIK_IMG,
  CATEGORY_CHICKEN_IMG,
  CATEGORY_CHINESES_IMG,
  CATEGORY_DESSERT_IMG,
  CATEGORY_FASTFOOD_IMG,
  CATEGORY_JAPANESE_IMG,
  CATEGORY_KOREAN_IMG,
  CATEGORY_PACKEDMEAL_IMG,
  CATEGORY_PIZZA_IMG,
  CATEGORY_WESTERN_IMG,
} from 'themes/theme';

// interface CategoryProps {
//   navigation: NavigationProp<any, any>;
//   user: {
//     userName: string;
//     userAddress: string;
//   };
// }
export const categoryData = [
  {
    categoryId: 0,
    categoryName: '전체보기',
    categoryImg: '',
  },
  {
    categoryId: 1,
    categoryName: '한식',
    categoryImg: CATEGORY_KOREAN_IMG,
  },
  {
    categoryId: 2,
    categoryName: '중식',
    categoryImg: CATEGORY_CHINESES_IMG,
  },
  {
    categoryId: 3,
    categoryName: '일식',
    categoryImg: CATEGORY_JAPANESE_IMG,
  },
  {
    categoryId: 4,
    categoryName: '양식',
    categoryImg: CATEGORY_WESTERN_IMG,
  },
  {
    categoryId: 5,
    categoryName: '패스트푸드',
    categoryImg: CATEGORY_FASTFOOD_IMG,
  },
  {
    categoryId: 6,
    categoryName: '분식',
    categoryImg: CATEGORY_BUNSIK_IMG,
  },
  {
    categoryId: 7,
    categoryName: '카페디저트',
    categoryImg: CATEGORY_DESSERT_IMG,
  },
  {
    categoryId: 8,
    categoryName: '치킨',
    categoryImg: CATEGORY_CHICKEN_IMG,
  },
  {
    categoryId: 9,
    categoryName: '피자',
    categoryImg: CATEGORY_PIZZA_IMG,
  },
  {
    categoryId: 10,
    categoryName: '아시안',
    categoryImg: CATEGORY_ASIAN_IMG,
  },
  {
    categoryId: 11,
    categoryName: '도시락',
    categoryImg: CATEGORY_PACKEDMEAL_IMG,
  },
];
const Category = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
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
        {categoryData.map((v, i) => (
          <CategoryItem
            category={v}
            // img={v.categoryImg}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
};

export default Category;
