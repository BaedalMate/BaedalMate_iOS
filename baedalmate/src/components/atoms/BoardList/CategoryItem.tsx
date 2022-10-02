import React, {useState} from 'react';
import {FlatList, Text, Touchable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LINE_GRAY_COLOR, PRIMARY_COLOR} from 'themes/theme';

interface CategoryProps {
  id: number;
  text: string;
  isActive: boolean;
}
const categoryData = [
  {
    id: 0,
    text: '전체',
    isActive: true,
    key: '0',
  },
  {
    id: 1,
    text: '1인분',
    isActive: false,
    key: '1',
  },
  {
    id: 2,
    text: '치킨',
    isActive: false,
    key: '2',
  },
  {
    id: 3,
    text: '한식',
    isActive: false,
    key: '3',
  },
  {
    id: 4,
    text: '중식',
    isActive: false,
    key: '4',
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

const CategoryList = () => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const renderItem = ({item}: {item: CategoryProps}) => {
    const borderBottomWidth = item.id === selectedId ? 4 : 0;
    const borderBottomColor = item.id === selectedId ? PRIMARY_COLOR : '';
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
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
