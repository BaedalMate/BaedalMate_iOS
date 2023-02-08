import {sortData} from 'components/pages/BoardListPage';
import React from 'react';
import {Image, View} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import {
  BOTTOM_ARROW,
  DARK_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {TextKRReg} from 'themes/text';
import SelectDropdown from 'react-native-select-dropdown';

const Sort = ({selectedSort, setSelectedSort, exceptClose, setExceptClose}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 15,
        }}>
        <Checkbox
          disabled={false}
          value={exceptClose}
          boxType="square"
          onValueChange={val => setExceptClose(val)}
          onCheckColor={PRIMARY_COLOR}
          tintColor={DARK_GRAY_COLOR}
          onTintColor={DARK_GRAY_COLOR}
          onFillColor={PRIMARY_COLOR}
          onAnimationType="fade"
          offAnimationType="fade"
          style={{width: 15, height: 15, borderRadius: 2, borderWidth: 1}}
        />
        <TextKRReg
          style={{
            color: DARK_GRAY_COLOR,
            fontSize: 12,
            marginLeft: 10,
            textAlignVertical: 'center',
          }}>
          참여가능만 보기
        </TextKRReg>
      </View>
      <View
        style={{
          width: 106,
          display: 'flex',
          flexDirection: 'row',
          marginHorizontal: 15,
          marginVertical: 10,
          justifyContent: 'flex-end',
        }}>
        <SelectDropdown
          data={sortData}
          buttonStyle={{
            backgroundColor: WHITE_COLOR,
            borderRadius: 10,
            height: 45,
            flex: 1,
          }}
          dropdownStyle={{
            borderRadius: 10,
            backgroundColor: WHITE_COLOR,
          }}
          buttonTextStyle={{
            fontSize: 14,
            lineHeight: 17,
            fontWeight: '700',
          }}
          rowTextStyle={{
            fontSize: 14,
            lineHeight: 24,
            fontWeight: '400',
          }}
          defaultValueByIndex={0}
          defaultValue={selectedSort}
          renderDropdownIcon={() => {
            return <Image source={BOTTOM_ARROW} />;
          }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setSelectedSort(selectedItem.value);
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.name;
          }}
          rowTextForSelection={item => {
            return item.name;
          }}
        />
        {/* {sortData.map((v, i) => (
          // <SortDefault
            key={i}
            item={v}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        ))} */}
        {/* <SortDefault text="마감순" /> */}
        {/* <Default text="평점순" />
      <SortDefault text="인기순" /> */}
      </View>
    </View>
  );
};

export default Sort;
