import React, {useEffect, useState} from 'react';
import BoardItem from 'components/atoms/BoardList/BoardItem';
import {ScrollView, Text, View} from 'react-native';
import axios from 'axios';
import {recruitListURL} from 'components/pages/Main';
import {DARK_GRAY_COLOR, PRIMARY_COLOR} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';

export interface BoardListProps {
  id: number;
  place: string;
  minPeople: number;
  currentPeople: number;
  criteria: string;
  createDate: string;
  deadlineDate: string;
  userScore: number;
  dormitory: string;
  title: string;
  minPrice: number;
  // deliveryFee?: number;
  // username?: string;
  image: string | null;
}
const categoryData = [
  {
    id: 0,
    text: '전체',
    key: '0',
  },
  {
    id: 1,
    text: '한식',
    key: '1',
  },
  {
    id: 2,
    text: '중식',
    key: '2',
  },
  {
    id: 3,
    text: '일식',
    key: '3',
  },
  {
    id: 4,
    text: '양식',
    isActive: false,
    key: '4',
  },
  {
    id: 5,
    text: '패스트푸드',
    key: '5',
  },
  {
    id: 6,
    text: '분식',
    key: '6',
  },
  {
    id: 7,
    text: '카페디저트',
    key: '7',
  },
  {
    id: 8,
    text: '치킨',
    key: '8',
  },
  {
    id: 9,
    text: '피자',
    key: '9',
  },
  {
    id: 10,
    text: '아시안',
    key: '10',
  },
  {
    id: 11,
    text: '도시락',
    key: '11',
  },
];
const changeCategoryIdToString = categoryId => {
  return categoryData[categoryId].text;
};
const renderItem = (boardList, categoryId) => {
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
      {boardList === undefined || boardList.length === 0 ? (
        <View></View>
      ) : (
        boardList.map((item, i) => {
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

          return <BoardItem item={item} key={i} />;
        })
      )}
    </View>
  );
};
const BoardList = ({
  categoryId,
  boardList,
}: {
  categoryId?: number;
  boardList;
}) => {
  return boardList.length === 0 ? (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flex: 1,
      }}>
      <TextKRBold
        style={{
          fontSize: 18,
          lineHeight: 22,
          textAlign: 'center',
          color: DARK_GRAY_COLOR,
        }}>
        현재
        <Text style={{color: PRIMARY_COLOR}}>
          {' '}
          '{changeCategoryIdToString(categoryId)}'
        </Text>
        에 대한{'\n'} 모집글이 없어요
      </TextKRBold>
      <TextKRReg
        style={{
          fontSize: 12,
          lineHeight: 18,
          textAlign: 'center',
          color: DARK_GRAY_COLOR,
        }}>
        함께 먹고 싶은 음식을 지금 한번 모집 해보세요!
      </TextKRReg>
    </View>
  ) : (
    <ScrollView>{renderItem(boardList, categoryId)}</ScrollView>
  );
};

export default BoardList;
