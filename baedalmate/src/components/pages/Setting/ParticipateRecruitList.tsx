import React from 'react';
import {ScrollView, View} from 'react-native';
import BoardItem from 'components/atoms/BoardList/BoardItem';
import {dummyBoardListData} from './HostingRecruitList';
import MyRecruitItem from 'components/atoms/Setting/MyRecruitItem';
import {WHITE_COLOR} from 'themes/theme';

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
        boardList.map((item, i) => {
          return <MyRecruitItem item={item} />;
        })
      )}
    </View>
  );
};

const ParticipateRecruitList = props => {
  return (
    <ScrollView style={{backgroundColor: WHITE_COLOR}}>
      {renderItem(dummyBoardListData)}
    </ScrollView>
  );
};

export default ParticipateRecruitList;
