import React, {useEffect, useState} from 'react';
import DetailImage from 'components/atoms/Image/DetailImage';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import UserInfo from 'components/molecules/Detail/UserInfo';
import Title from 'components/molecules/Detail/Title';
import ItemInfo from 'components/molecules/Detail/ItemInfo';
import Description from 'components/molecules/Detail/Description';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileImage from 'components/atoms/Image/UserImage';
import {TextKRBold, TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import BtnCreateFloating from 'components/atoms/Button/BtnCreateFloating';
import BtnTag from 'components/atoms/Button/BtnTag';
import WhiteTag from 'components/atoms/CreateRecruit/Tags';

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
const CreateRecruit3 = props => {
  const [minPrice, setMinPrice] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
      }}>
      <ScrollView
        style={{
          backgroundColor: WHITE_COLOR,
          marginBottom: 150,
        }}>
        <View style={{}}>
          <View
            style={{
              padding: 15,
              display: 'flex',
            }}>
            <TextKRBold style={styles.Title}>주문글 쓰기</TextKRBold>
          </View>
          <View
            style={{
              padding: 15,
              backgroundColor: '#F7F8FA',
              borderBottomWidth: 5,
              borderBottomColor: WHITE_COLOR,
            }}>
            <TextKRBold style={styles.Label}>제목</TextKRBold>
            <TextInput
              style={{
                backgroundColor: WHITE_COLOR,
                width: '100%',
                height: 45,
                borderRadius: 10,
                padding: 15,
              }}
              value={title}
              onChangeText={setTitle}
              maxLength={20}
            />
            <View style={{paddingTop: 5, alignItems: 'flex-end'}}>
              <Text>
                <Text style={styles.LengthCnt}>{title.length}</Text>
                /20
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 15,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F7F8FA',
              borderBottomWidth: 5,
              borderBottomColor: WHITE_COLOR,
            }}>
            <TextKRBold style={styles.Label}>모집글 설명</TextKRBold>
            <View
              style={{
                alignItems: 'flex-end',
              }}>
              <TextInput
                style={{
                  backgroundColor: WHITE_COLOR,
                  width: '100%',
                  height: 212,
                  borderRadius: 10,
                  padding: 15,
                }}
                maxLength={200}
                value={description}
                onChangeText={setDescription}
                multiline
              />
              <View style={{paddingTop: 5, alignItems: 'flex-end'}}>
                <Text>
                  <Text style={styles.LengthCnt}>{description.length}</Text>
                  /200
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              padding: 15,
              display: 'flex',
              backgroundColor: '#F7F8FA',
              borderBottomWidth: 5,
              borderBottomColor: WHITE_COLOR,
            }}>
            <TextKRBold style={styles.Label}>태그쓰기</TextKRBold>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                style={{
                  backgroundColor: WHITE_COLOR,
                  width: '70%',
                  height: 44,
                  borderRadius: 10,
                  padding: 15,
                }}
                placeholder="#태그를 입력해주세요"></TextInput>
              <BtnTag
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
                text={'태그입력'}
              />
            </View>
            <View style={{flexDirection: 'row', marginVertical: 15}}>
              <WhiteTag text={'태그입력'} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 15,
        }}>
        <View>
          <View></View>
          <BtnCreateFloating
            onPress={() => props.navigation.navigate('상세 설정4')}
            text={'다음으로'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 15,
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
  },
  LengthCnt: {
    color: PRIMARY_COLOR,
  },
});

export default CreateRecruit3;
