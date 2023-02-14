import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {WHITE_COLOR} from 'themes/theme';
import NoticeListItem from 'components/atoms/Setting/NoticeListItem';
import {getNoticeListAPI, noticeListI} from 'components/utils/api/Notice';

// export const dummyBoardListData = Array(10).fill({
//   title: '[공지] 공지사항 내용',
//   createDate: '2021.08.01',
//   noticeId: 0,
// });
// for (let i = 0; i < 10; i++) {
//   dummyBoardListData[i].noticeId = i;
// }

const renderItem = blockedUserList => {
  return (
    <View style={{backgroundColor: WHITE_COLOR, paddingHorizontal: 15}}>
      {blockedUserList === undefined ? (
        <View></View>
      ) : (
        blockedUserList.map(item => {
          return <NoticeListItem item={item} />;
        })
      )}
    </View>
  );
};

const NoticeList = props => {
  const [noticeList, setNoticeList] = useState<noticeListI[]>();
  const getNoticeListData = async () => {
    const result = await getNoticeListAPI();
    setNoticeList(result);
  };
  useEffect(() => {
    getNoticeListData();
  }, []);
  return (
    <ScrollView style={{backgroundColor: WHITE_COLOR}}>
      {renderItem(noticeList)}
    </ScrollView>
  );
};

export default NoticeList;
