import React from 'react';
import {ScrollView, View} from 'react-native';

import {WHITE_COLOR} from 'themes/theme';
import {categoryData} from 'components/molecules/Main/Category';
import SelectCategoryItem from 'components/atoms/CreateRecruit/CategorySelect';

export interface RecruitItemProps {
  createDate: string;
  deadlineDate: string;
  deliveryFee: number;
  description: string;
  dormitory: string;
  id: number;
  minPeople: number;
  minPrice: number;
  participate: false;
  platform: string;
  thumbnailImage: string;
  title: string;
  userImage: string;
  userScore: number;
  username: string;
}

export interface deliveryFeeProps {
  i: number;
  cnt: number;
  setCnt: (cnt: number) => void;
}

const SelectCategoryPage = props => {
  console.log(props);
  const defaultItem = props.route.params
    ? props.route.params.defaultItem
    : null;
  const type = props.route.params ? props.route.params.type : 'CREATE';
  console.log(defaultItem, type);
  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
      }}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {categoryData.map(
            (v, i) =>
              i !== 0 && (
                <SelectCategoryItem
                  item={v}
                  defaultItem={defaultItem}
                  type={type}
                  key={i}
                />
              ),
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectCategoryPage;
