import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BLACK_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';
import TodayMenuItem from './TodayMenuItem';
import Carousel, {Pagination} from 'react-native-snap-carousel';
export type ImageSliderProps = {
  data: string;
  key: number;
};

interface BannerSectionProps {
  key: number;
  data: string;
}

export enum status {
  COMPLETED = '모집완료',
  ONGOING = '진행중',
  CREATE = '글 작성하러 가기',
}
const data = [
  {
    title: 'Salady 공릉점',
    body: {
      starRate: 4.1,
      baedalTips: 0,
      minCost: 12000,
      minTime: 20,
      maxTime: 30,
    },
    tag1: '간편식',
    tag2: '배달팁 무료',
    state: status.ONGOING,
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt559x4ig-wTTMPcj3W9LD0dLvY6Ggi1E4L0WAP3IWcQ&s',
  },
  {
    title: 'title1',
    body: {
      starRate: 4.1,
      baedalTips: 0,
      minCost: 12000,
      minTime: 20,
      maxTime: 30,
    },
    tag1: '간편식',
    tag2: '배달팁 무료',
    state: status.COMPLETED,
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ6yI5v-1UCyMx8CdTpABg9QzItPHcPLZh7_1ZnzOpTg&s',
  },
  {
    title: 'title2',
    body: {
      starRate: 4.1,
      baedalTips: 0,
      minCost: 12000,
      minTime: 20,
      maxTime: 30,
    },
    tag1: '간편식',
    tag2: '배달팁 무료',
    state: status.COMPLETED,
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt559x4ig-wTTMPcj3W9LD0dLvY6Ggi1E4L0WAP3IWcQ&s',
  },
  {
    title: 'title3',
    body: {
      starRate: 4.1,
      baedalTips: 0,
      minCost: 12000,
      minTime: 20,
      maxTime: 30,
    },
    tag1: '간편식',
    tag2: '배달팁 무료',
    state: status.ONGOING,
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt559x4ig-wTTMPcj3W9LD0dLvY6Ggi1E4L0WAP3IWcQ&s',
  },
  {
    title: '지금 먹고 싶은 메뉴가 생겼다면?',
    body: {
      starRate: 4.1,
      baedalTips: 0,
      minCost: 12000,
      minTime: 20,
      maxTime: 30,
    },
    tag1: '글 작성하기',
    tag2: '',
    description: '합리적으로 배달시키세요!',
    move: '글 작성하러 가기',
    state: status.CREATE,
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt559x4ig-wTTMPcj3W9LD0dLvY6Ggi1E4L0WAP3IWcQ&s',
  },
];
// const SliderItem = ({item, index}) => {
//   return <TodayMenuItem />;
// };

const Slider = (props: ImageSliderProps) => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  return (
    <View
      style={{
        width: '100%',
        height: 160,
        alignItems: 'center',
        marginTop: 38,
        paddingVertical: 0,
      }}>
      <Carousel
        data={data}
        layoutCardOffset={0}
        ref={isCarousel}
        renderItem={TodayMenuItem}
        sliderWidth={600}
        itemWidth={300}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={index => setIndex(index)}
        style={{
          marginBottom: 10,
        }}
      />

      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 7 / 2,
          marginHorizontal: -5,
          backgroundColor: WHITE_COLOR,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        inactiveDotStyle={{
          backgroundColor: PRIMARY_COLOR,
          borderColor: WHITE_COLOR,
          borderWidth: 1,
        }}
        containerStyle={{
          marginBottom: -20,
          paddingVertical: 5,
        }}
      />
      {/* {bannerLists.map(banner => {
          return <BannerSection key={banner.id} data={banner} />;
        })} */}

      {/* <SliderItem key={0}></SliderItem>
      <SliderItem key={1}></SliderItem>
      <SliderItem key={2}></SliderItem>
      <SliderItem key={3}></SliderItem>
      <SliderItem key={4}></SliderItem> */}
    </View>
  );
};

const styles = StyleSheet.create({
  imageSliderWrapper: {
    width: 300,
    height: 113,
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSliderItemCreateTitle: {
    color: '#FFFFFF',
    fontSize: 55,
    fontWeight: '200',
    lineHeight: 60,
  },
});

export default Slider;
