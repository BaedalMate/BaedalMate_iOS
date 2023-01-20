import {RecruitItemProps} from 'components/pages/Detail';
import {formPrice} from 'components/utils/api/Recruit';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextKRBold} from 'themes/text';
import {DARK_GRAY_COLOR, LINE_GRAY_COLOR} from 'themes/theme';
import DeliveryFeeModal from './DeliveryFeeModal';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const ItemInfo = ({item}: {item: RecruitItemProps | undefined}) => {
  const text =
    item?.deadlineDate.split(' ')[0] + 'T' + item?.deadlineDate.split(' ')[1];
  const deadline = new Date(text);
  const durationHour = deadline.getHours();
  const durationMinutes = deadline.getMinutes();
  const timeText = durationHour + '시 ' + durationMinutes + '분';
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    modal ? setModal(false) : setModal(true);
  };
  return (
    <View
      style={{
        top: -19,
        height: 85,
        display: 'flex',
        alignItems: 'center',
        borderColor: LINE_GRAY_COLOR,
        marginHorizontal: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 15,
          width: '100%',
          height: 55,
          justifyContent: 'space-around',
          alignItems: 'stretch',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: DARK_GRAY_COLOR,
              fontSize: 14,
              lineHeight: 24,
              textAlign: 'center',
            }}>
            마감시간
          </Text>
          <TextKRBold
            style={{
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            {timeText}
          </TextKRBold>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          {/* <Text
            style={{
              color: DARK_GRAY_COLOR,
              fontSize: 14,
              lineHeight: 22,
              textAlign: 'center',
            }}>
            배달비
            <TouchableOpacity
              style={{
                paddingLeft: 3,
              }}
              onPress={() => {}}>
              <Image
                source={QUESTION_MARK}
                style={{
                  paddingLeft: 3,
                }}
              />
            </TouchableOpacity>
          </Text> */}
          <DeliveryFeeModal item={item} />
          <TextKRBold
            style={{
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            {item?.shippingFee && formPrice(item?.shippingFee)}원
          </TextKRBold>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: DARK_GRAY_COLOR,
              fontSize: 14,
              lineHeight: 24,
              textAlign: 'center',
            }}>
            모집인원
          </Text>
          <TextKRBold
            style={{
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            {item?.currentPeople}명 / {item?.minPeople}명
          </TextKRBold>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: DARK_GRAY_COLOR,
              fontSize: 14,
              lineHeight: 24,
              textAlign: 'center',
            }}>
            배달거점
          </Text>
          <TextKRBold
            style={{
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            {item?.dormitory}
          </TextKRBold>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ItemInfo;
