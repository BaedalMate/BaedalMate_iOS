import React from 'react';
import {ScrollView, View} from 'react-native';
import {DARK_GRAY_COLOR, LINE_GRAY_COLOR, WHITE_COLOR} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';

export const dummyBoardListData = Array(10).fill({
  title: '[공지] 공지사항 내용',
  createDate: '2021.08.01',
  description:
    '글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다. ',
  noticeId: 0,
});
for (let i = 0; i < 10; i++) {
  dummyBoardListData[i].noticeId = i;
}

const renderItem = item => {
  return (
    <View style={{backgroundColor: WHITE_COLOR, paddingHorizontal: 15}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: LINE_GRAY_COLOR,
        }}>
        <TextKRBold
          style={{
            fontSize: 18,
            color: DARK_GRAY_COLOR,
            paddingVertical: 9,
          }}>
          {item.title}
        </TextKRBold>
        <TextKRReg
          style={{
            fontSize: 14,
            color: DARK_GRAY_COLOR,
          }}>
          {item.createDate}
        </TextKRReg>
      </View>
      <View style={{paddingTop: 16}}>
        <TextKRReg style={{fontSize: 16, lineHeight: 24}}>
          {item.description}
        </TextKRReg>
      </View>
    </View>
  );
};

const DetailNotice = props => {
  return (
    <ScrollView style={{backgroundColor: WHITE_COLOR}}>
      {renderItem(dummyBoardListData[props.route.params.id])}
    </ScrollView>
  );
};

export default DetailNotice;
