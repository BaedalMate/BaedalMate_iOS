import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LINE_GRAY_COLOR, PRIMARY_COLOR} from 'themes/theme';

interface CategoryProps {
  id: number;
  text: string;
  isActive: boolean;
}
export const categoryData = [
  {
    id: 0,
    text: '전체',
    isActive: true,
    key: '0',
  },
  {
    id: 1,
    text: '한식',
    isActive: false,
    key: '1',
  },
  {
    id: 2,
    text: '중식',
    isActive: false,
    key: '2',
  },
  {
    id: 3,
    text: '일식',
    isActive: false,
    key: '3',
  },
  {
    id: 4,
    text: '양식',
    isActive: false,
    key: '4',
  },
  {
    id: 5,
    text: '패스트푸드',
    isActive: false,
    key: '5',
  },
  {
    id: 6,
    text: '분식',
    isActive: false,
    key: '6',
  },
  {
    id: 7,
    text: '카페디저트',
    isActive: false,
    key: '7',
  },
  {
    id: 8,
    text: '치킨',
    isActive: false,
    key: '8',
  },
  {
    id: 9,
    text: '피자',
    isActive: false,
    key: '9',
  },
  {
    id: 10,
    text: '아시안',
    isActive: false,
    key: '10',
  },
  {
    id: 11,
    text: '도시락',
    isActive: false,
    key: '11',
  },
];

const Item = ({
  item,
  onPress,
  borderBottomWidth,
  borderBottomColor,
}: {
  item: CategoryProps;
  onPress: any;
  borderBottomWidth: number;
  borderBottomColor: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderBottomColor: borderBottomColor,
        borderBottomWidth: borderBottomWidth,
        marginHorizontal: 4,
      }}>
      <Text
        style={{
          textAlign: 'center',
          paddingHorizontal: 24,
          paddingVertical: 12,
          height: 40,
        }}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};

const CategoryList = ({categoryId, setCategoryId}) => {
  console.log('cateogryID', categoryId);
  const [selectedId, setSelectedId] = useState<number>(categoryId);
  useEffect(() => {
    setSelectedId(categoryId);
  }, [categoryId]);
  const renderItem = ({item}: {item: CategoryProps}) => {
    const borderBottomWidth = item.id === selectedId ? 4 : 0;
    const borderBottomColor = item.id === selectedId ? PRIMARY_COLOR : '';
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setCategoryId(item.id);
        }}
        borderBottomWidth={borderBottomWidth}
        borderBottomColor={borderBottomColor}
      />
    );
  };
  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderColor: LINE_GRAY_COLOR,
        width: '100%',
        paddingLeft: 15,
      }}>
      <FlatList
        data={categoryData}
        renderItem={renderItem}
        horizontal={true}
        extraData={selectedId}
      />
    </View>
  );
};

export {CategoryList};
