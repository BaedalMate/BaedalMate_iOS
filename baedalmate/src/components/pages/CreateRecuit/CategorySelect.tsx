import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';

import {WHITE_COLOR} from 'themes/theme';
import {categoryData} from 'components/molecules/Main/Category';
import SelectCategoryItem from 'components/atoms/CreateRecruit/CategorySelect';
import {getRecruitDetailDataForUpdateAPI} from 'components/utils/api/Recruit';

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
  // const defaultItem = props.route.params.defaultItem;
  // const [defaultItem, setDefaultItem] = useState({
  //   recruitId: -1,
  //   categoryId: -1,
  //   place: {
  //     name: '',
  //     addressName: '',
  //     roadAddressName: '-1',
  //     x: 0,
  //     y: 0,
  //   },
  //   dormitory: '',
  //   criteria: '',
  //   minPrice: -1,
  //   minPeople: -1,
  //   shippingFee: [
  //     {
  //       shippingFee: -1,
  //       lowerPrice: -1,
  //       upperPrice: -1,
  //     },
  //   ],
  //   coupon: -1,
  //   platform: '',
  //   deadlineDate: '',
  //   title: '',
  //   description: '',
  //   freeShipping: false,
  //   menu: [
  //     {
  //       name: '',
  //       price: -1,
  //       quantity: -1,
  //     },
  //   ],
  //   tags: [
  //     {
  //       tagname: '',
  //     },
  //   ],
  // });
  const defaultItem = props.route.params
    ? props.route.params.defaultItem
    : undefined;
  // const id = props.route.params
  //   ? props.route.params.defaultItem.recruitId
  //   : null;
  // const getDefaultItem = async () => {
  //   const result = await getRecruitDetailDataForUpdateAPI(id);
  //   console.log(result);
  //   setDefaultItem(result);
  // };
  const type = props.route.params ? props.route.params.type : 'CREATE';
  // console.log(defaultItem, type);

  // useEffect(() => {
  //   getDefaultItem();
  // }, []);

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
