import React, {useEffect, useRef, useState} from 'react';
import {Fonts} from 'assets/Fonts';
import {useController} from 'react-hook-form';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import {TextKRBold} from 'themes/text';
import {
  DECREASE_DEACTIVE,
  DECREASE_ACTIVE,
  INCREASE_ACTIVE,
  ERROR_COLOR,
  WHITE_COLOR,
  DARK_GRAY_COLOR,
  PRIMARY_COLOR,
  BOTTOM_ARROW,
  LINE_GRAY_COLOR,
  CAMERA_GRAY,
  SEND_GRAY,
  SEND_GRAY_FILLED_ICON,
  CAMERA_GRAY_FILLED_ICON,
} from 'themes/theme';
import {onChange} from 'react-native-reanimated';
import SelectDropdown from 'react-native-select-dropdown';
import {dormitoryList} from 'components/pages/CreateRecuit/second';

export type endStandardType = 'people' | 'price' | 'time';
export interface shippingFeeProps {
  i: number;
  cnt: number;
  setCnt: (cnt: number) => void;
  setShippingFeeList: (shippingFeeList: any) => void;
  error;
  name;
  control;
  rules;
}

// export const TagInput = ({error, name, control, rules, tagList, setTagList}) => {
//   const {field} = useController({
//     control,
//     defaultValue: '',
//     name,
//     rules,
//   });
//   return (
//     <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//               }}>
//               <TextInput
//                 style={{
//                   backgroundColor: WHITE_COLOR,
//                   width: '70%',
//                   height: 44,
//                   borderRadius: 10,
//                   padding: 15,
//                 }}
//                 value={tagFields.tagname}
//                 placeholder="#태그를 입력해주세요"></TextInput>
//               <BtnTag text={'태그입력'} onPress={} />
//             </View>
//             {tagFields.map((data, index) => (
//               <View style={{flexDirection: 'row', marginVertical: 15}}>
//                 <WhiteTag text={data} />
//               </View>
//             ))}
//   );
// };

export const DescriptionInput = ({error, name, control, rules}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });
  return (
    <View
      style={{
        alignItems: 'flex-end',
      }}>
      <TextInput
        style={{
          borderWidth: error.title ? 1 : 0,
          borderColor: error.title ? ERROR_COLOR : WHITE_COLOR,

          backgroundColor: WHITE_COLOR,
          width: '100%',
          height: 212,
          borderRadius: 10,
          padding: 15,
        }}
        maxLength={200}
        value={field.value}
        onChangeText={field.onChange}
        multiline
      />
      <View style={{paddingTop: 5, alignItems: 'flex-end'}}>
        <Text>
          <Text style={styles.LengthCnt}>{field.value.length}</Text>
          /200
        </Text>
      </View>
    </View>
  );
};

export const TitleInput = ({error, name, control, rules}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });
  return (
    <>
      <TextInput
        style={{
          borderWidth: error.title ? 1 : 0,
          borderColor: error.title ? ERROR_COLOR : WHITE_COLOR,
          backgroundColor: WHITE_COLOR,
          width: '100%',
          height: 45,
          borderRadius: 10,
          padding: 15,
        }}
        value={field.value}
        onChangeText={field.onChange}
        maxLength={20}
      />
      <View style={{paddingTop: 5, alignItems: 'flex-end'}}>
        <Text>
          <Text style={styles.LengthCnt}>{field.value.length}</Text>
          /20
        </Text>
      </View>
    </>
  );
};

export const DormitoryInput = ({error, name, control, rules, setValue}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });
  return (
    <SelectDropdown
      buttonStyle={{
        borderWidth: error.dormitory ? 1 : 0,
        borderColor: error.dormitory ? ERROR_COLOR : WHITE_COLOR,
        backgroundColor: WHITE_COLOR,
        borderRadius: 10,
        height: 45,
        flex: 1,
        // width: 255,
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
      data={dormitoryList}
      defaultValueByIndex={0}
      defaultValue={''}
      renderDropdownIcon={isOpened => {
        return <Image source={BOTTOM_ARROW} />;
      }}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
        setValue('dormitory', selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
};

export const PlaceInput = ({
  error,
  name,
  control,
  rules,
  // setValue,
  value,
  navigation,
}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });
  return (
    <TextInput
      style={{
        borderWidth: error.place ? 1 : 0,
        borderColor: error.place ? ERROR_COLOR : WHITE_COLOR,

        backgroundColor: WHITE_COLOR,
        width: '100%',
        height: 45,
        borderRadius: 10,
        padding: 15,
      }}
      value={field.value}
      // onChangeText={onChange}
      // onTouchEnd={setValue(value)}
      onTouchStart={() => navigation.navigate('배달 가게 선택')}
    />
  );
};

export const DormitoryDescriptionInput = ({
  error,
  name,
  control,
  rules,
  setValue,
}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });
  return (
    <TextInput
      style={{
        width: '100%',
        height: 45,
        color: DARK_GRAY_COLOR,
        borderWidth: error.description ? 1 : 0,
        borderBottomWidth: 1,
        borderColor: error.description ? ERROR_COLOR : DARK_GRAY_COLOR,
        borderBottomColor: error.description ? ERROR_COLOR : DARK_GRAY_COLOR,
        borderRadius: 10,
        padding: 10,
      }}
      placeholder={
        name === 'name'
          ? '주문하실 메뉴를 적어주세요'
          : '배달을 받을 장소에 대한 설명을 적어주세요'
      }
      onChangeText={field.onChange}
      value={field.value}
    />
  );
};

export const CntInput = ({error, name, control, rules, setValue}) => {
  const {field} = useController({
    control,
    defaultValue: 1,
    name,
    rules,
  });
  const [minPeople, setMinPeople] = useState(1);
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{}}
        onPress={() => {
          if (minPeople > 1) {
            setValue(name, minPeople - 1);
            setMinPeople(minPeople - 1);
          }
        }}>
        {minPeople <= 1 ? (
          <Image
            source={DECREASE_DEACTIVE}
            style={{
              width: 30,
              height: 30,
              marginRight: 38,
            }}
          />
        ) : (
          <Image
            source={DECREASE_ACTIVE}
            style={{
              width: 30,
              height: 30,
              marginRight: 38,
              borderWidth: name === 'quantity' ? 1 : 0,
              borderColor: name === 'quantity' ? LINE_GRAY_COLOR : WHITE_COLOR,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>
      <TextKRBold style={styles.Label}>
        {minPeople} {name === 'minPeople' ? '인' : '개'}
      </TextKRBold>
      <TouchableOpacity
        onPress={() => {
          setValue(name, minPeople + 1);
          setMinPeople(minPeople + 1);
        }}>
        <Image
          source={INCREASE_ACTIVE}
          style={{
            width: 30,
            height: 30,
            marginLeft: 38,
            borderWidth: name === 'quantity' ? 1 : 0,
            borderColor: name === 'quantity' ? LINE_GRAY_COLOR : WHITE_COLOR,
            borderRadius: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export const PriceInput = ({error, name, control, rules}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });
  return (
    <>
      <TextInput
        style={{
          borderWidth:
            name === 'price'
              ? 1
              : name === 'minPrice'
              ? error.minPrice
                ? 1
                : 0
              : name.indexOf('shippingFee') !== -1
              ? error.shippingFee
                ? 1
                : 0
              : name === 'coupon'
              ? error.coupon
                ? 1
                : 0
              : 0,
          borderRightWidth: 0,
          borderColor: name === 'price' ? LINE_GRAY_COLOR : ERROR_COLOR,
          backgroundColor: WHITE_COLOR,
          width:
            name === 'price'
              ? 260
              : name.indexOf('shippingFeeRange') !== -1
              ? 178
              : name.indexOf('shippingFee') !== -1
              ? 210
              : 290,
          height: 45,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          padding: 15,
          textAlign: 'right',
          fontFamily: Fonts.Ko,
          fontStyle: 'normal',
          fontWeight: name.indexOf('shippingFeeRange') !== -1 ? '400' : '700',
          fontSize: 16,
          lineHeight: 19,
          textAlignVertical: 'center',
          paddingRight: 5,
        }}
        keyboardType={'number-pad'}
        value={field.value.toString().split('원')[0]}
        onChangeText={field.onChange}></TextInput>
      <View
        style={{
          borderWidth:
            name === 'price'
              ? 1
              : name === 'minPrice'
              ? error.minPrice
                ? 1
                : 0
              : name.indexOf('shippingFee') !== -1
              ? error.shippingFee
                ? 1
                : 0
              : name === 'coupon'
              ? error.coupon
                ? 1
                : 0
              : 0,
          borderLeftWidth: 0,
          borderColor: name === 'price' ? LINE_GRAY_COLOR : ERROR_COLOR,
          backgroundColor: WHITE_COLOR,
          height: 45,
          padding: 0,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          margin: 0,
          left:
            name.indexOf('shippingFee') !== -1 || name === 'shippingFeeRange'
              ? -3
              : -10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            paddingRight: 10,
            fontFamily: Fonts.Ko,
            fontStyle: 'normal',
            fontWeight: name.indexOf('shippingFeeRange') !== -1 ? '400' : '700',
            fontSize: 16,
            lineHeight: 19,
            textAlignVertical: 'center',
          }}>
          {name.indexOf('shippingFeeRange') !== -1 ? '원 이상' : '원'}
        </Text>
      </View>
    </>
  );
};

export const TimeInput = ({error, name, control, rules}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });
  return (
    <>
      <TextInput
        style={{
          borderWidth:
            name === 'orderHour' && error.orderHour
              ? 1
              : name === 'orderMinute' && error.orderMinute
              ? 1
              : 0,
          borderRightWidth: 0,
          borderColor: ERROR_COLOR,
          backgroundColor: WHITE_COLOR,
          width: '35%',
          height: 45,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          padding: 15,
          textAlign: 'right',
          fontFamily: Fonts.Ko,
          fontStyle: 'normal',
          fontWeight: name.indexOf('shippingFeeRange') !== -1 ? '400' : '700',
          fontSize: 16,
          lineHeight: 19,
          textAlignVertical: 'center',
          paddingRight: 5,
        }}
        keyboardType={'number-pad'}
        value={
          field.name === 'orderHour'
            ? field.value.toString().split('시간')[0]
            : field.value.toString().split('분')[0]
        }
        onChangeText={field.onChange}></TextInput>
      <View
        style={{
          borderWidth:
            name === 'orderHour' && error.orderHour
              ? 1
              : name === 'orderMinute' && error.orderMinute
              ? 1
              : 0,
          borderLeftWidth: 0,
          borderColor: ERROR_COLOR,
          backgroundColor: WHITE_COLOR,
          height: 45,
          padding: 0,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          margin: 0,
          left: name.indexOf('order') !== -1 ? -3 : -10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            paddingRight: 10,
            fontFamily: Fonts.Ko,
            fontStyle: 'normal',
            fontWeight: name.indexOf('shippingFeeRange') !== -1 ? '400' : '700',
            fontSize: 16,
            lineHeight: 19,
            textAlignVertical: 'center',
          }}>
          {field.name === 'orderHour' ? '시간' : '분'}
        </Text>
      </View>
    </>
  );
};

export const MessageInput = ({
  error,
  name,
  control,
  rules,
  sendMessage,
  handleSubmit,
}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 100,
        backgroundColor: LINE_GRAY_COLOR,
        width: '100%',
        paddingBottom: 42,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}>
      <TouchableOpacity>
        <Image source={CAMERA_GRAY_FILLED_ICON} />
      </TouchableOpacity>
      <TextInput
        style={{
          borderWidth: error.title ? 1 : 0,
          borderColor: error.title ? ERROR_COLOR : WHITE_COLOR,
          backgroundColor: WHITE_COLOR,
          // width: '100%',
          flex: 1,
          height: 45,
          borderRadius: 10,
          padding: 15,
          margin: 15,
          textAlign: 'right',
        }}
        value={field.value}
        onChangeText={field.onChange}
        maxLength={20}
      />
      <TouchableOpacity onPress={handleSubmit(d => sendMessage(d))}>
        <Image source={SEND_GRAY_FILLED_ICON} />
      </TouchableOpacity>
    </View>
  );
};

export const MessageTextInput = ({error, name, control, rules}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });
  return (
    <TextInput
      style={{
        borderWidth: error.title ? 1 : 0,
        borderColor: error.title ? ERROR_COLOR : WHITE_COLOR,
        backgroundColor: WHITE_COLOR,
        // width: '100%',
        flex: 1,
        height: 45,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        textAlign: 'right',
      }}
      value={field.value}
      onChangeText={field.onChange}
      multiline
    />
  );
};

const styles = StyleSheet.create({
  Validation: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    textAlignVertical: 'center',
    color: ERROR_COLOR,
    marginLeft: 20,
  },
  margin: {
    marginLeft: 10,
  },
  Title: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlignVertical: 'center',
    color: PRIMARY_COLOR,
  },
  TitleInput: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlignVertical: 'center',
  },
  Label: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    textAlignVertical: 'center',
  },
  Description: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    alignItems: 'center',
    textAlignVertical: 'center',
    color: DARK_GRAY_COLOR,
    paddingBottom: 18,
  },
  avoidingView: {
    // flex: 1,
  },
  LengthCnt: {
    color: PRIMARY_COLOR,
  },
});
