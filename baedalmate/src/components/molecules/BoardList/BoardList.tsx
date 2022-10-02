import React, {useEffect, useState} from 'react';
import BoardItem from 'components/atoms/BoardList/BoardItem';
import {ScrollView, Text, View} from 'react-native';
import axios from 'axios';
import {recruitListURL} from 'components/pages/Main';

export interface BoardListProps {
  id: number;
  restaurantName: string;
  minPrice: number;
  minPeople: number;
  currentPeople: number;
  deliveryFee: number;
  createDate: string;
  deadlineDate: string;
  username: string;
  userScore: number;
  dormitory: string;
  title: string;
  thumbnailImage: string;
}

const renderItem = () => {
  const [boardList, setBoardList] = useState<BoardListProps[]>();
  const date = new Date().getDate();
  const time = new Date().getTime();
  console.log(date);
  console.log(time);
  // 모집글 리스트 Api 받아옴
  const getBoardListData = async () => {
    try {
      const BoardListData = axios
        .get(recruitListURL, {
          params: {
            page: 0,
            size: 10,
            sort: 'deadlineDate,ASC',
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            setBoardList(response.data.recruitList);
            return response.data.recruitList;
          }
          return false;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
      return BoardListData;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    getBoardListData();
  }, []);

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
const BoardList = () => {
  return <ScrollView>{renderItem()}</ScrollView>;
};

export default BoardList;
