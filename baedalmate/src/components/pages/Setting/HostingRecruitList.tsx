import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {WHITE_COLOR} from 'themes/theme';
import BoardList from 'components/molecules/BoardList/BoardList';
import Sort from 'components/molecules/BoardList/Sort';
import {CategoryList} from 'components/atoms/BoardList/CategoryItem';
import BtnFloating from 'components/atoms/Button/BtnFloating';
import axios from 'axios';
import BoardItem from 'components/atoms/BoardList/BoardItem';

export const dummyBoardListData = Array(10).fill({
  createDate: '2022-10-14 10:40:13',
  criteria: 'NUMBER',
  currentPeople: 1,
  deadlineDate: '2022-10-14 12:40:13',
  dormitory: '누리학사',
  recruitId: 47,
  image: '1665252912498_11-3.png',
  minPeople: 4,
  minPrice: 10000,
  place: '도미노피자',
  title: '글 제목',
  userScore: 4.1,
});

const renderItem = boardList => {
  // const [boardList, setBoardList] = useState<BoardListProps[]>(boardList);
  const date = new Date().getDate();
  const time = new Date().getTime();
  console.log(date);
  console.log(time);
  // // 모집글 리스트 Api 받아옴
  // const getBoardListData = async () => {
  //   try {
  //     const BoardListData = axios
  //       .get(recruitListURL, {
  //         params: {
  //           // page: 0,
  //           // size: 10,
  //         },
  //       })
  //       .then(function (response) {
  //         if (response.status === 200) {
  //           setBoardList(response.data.recruitList);
  //           return response.data.recruitList;
  //         }
  //         return false;
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         return false;
  //       });
  //     return BoardListData;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   getBoardListData();
  // }, []);

  return (
    <View>
      {boardList === undefined ? (
        <View></View>
      ) : (
        boardList.map(item => {
          console.log(item.createDate);
          const dateString = item.createDate;
          const time = dateString.replace(' ', 'T');
          const createTime = new Date(time);
          const currentTime = new Date();
          const durationYear =
            currentTime.getFullYear() - createTime.getFullYear();
          const durationMonth = currentTime.getMonth() - createTime.getMonth();
          const durationDate = currentTime.getDate() - createTime.getDate();
          const durationHour = currentTime.getHours() - createTime.getHours();
          const durationMinutes =
            currentTime.getMinutes() - createTime.getMinutes();
          const durationSeconds =
            currentTime.getSeconds() - createTime.getSeconds();

          durationYear > 0
            ? (item = {...item, createDate: durationYear + '년 전'})
            : durationMonth > 0
            ? (item = {...item, createDate: durationMonth + '달 전'})
            : durationDate > 0
            ? (item = {...item, createDate: durationDate + '일 전'})
            : durationHour > 0
            ? (item = {...item, createDate: durationHour + '시간 전'})
            : durationMinutes > 0
            ? (item = {...item, createDate: durationMinutes + '분 전'})
            : (item = {...item, createDate: '방금 전'});

          return <BoardItem item={item} />;
        })
      )}
    </View>
  );
};

const HostingRecruitList = props => {
  return <ScrollView>{renderItem(dummyBoardListData)}</ScrollView>;
};

export default HostingRecruitList;
