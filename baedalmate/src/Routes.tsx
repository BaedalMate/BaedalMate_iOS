import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './components/pages/login';
import Main from './components/pages/Main';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import {
  BACK_GRAY,
  CHATTIING_GRAY,
  CHATTIING_PRIMARY_OUTLINE,
  DARK_GRAY_COLOR,
  LOGO_SOLID_STROKE_GRAY7,
  LOGO_SOLID_STROKE_MAIN7,
  MAIN_GRAY_COLOR,
  PRIMARY_COLOR,
  PROFILE_GRAY,
  PROFILE_PRIMARY_OUTLINE,
  SEARCH_PRIMARY,
  SETTING_HORIZONTAL_GRAY_ICON,
  WHITE_COLOR,
} from './themes/theme';
import BoardItemDetail from 'components/pages/Detail';
import BoardListPage from 'components/pages/BoardListPage';
import CreateRecruit1 from 'components/pages/CreateRecuit/first';
import CreateRecruit2 from 'components/pages/CreateRecuit/second';
import CreateRecruit3 from 'components/pages/CreateRecuit/third';
import CreateRecruit4 from 'components/pages/CreateRecuit/fourth';
import PlaceSearch from 'components/pages/CreateRecuit/PlaceSearch';
import SelectCategoryPage from 'components/pages/CreateRecuit/CategorySelect';
import {useNavigation} from '@react-navigation/native';
import DetailChatRoom from 'components/pages/DetailChatRoom';
import Chat from 'components/pages/ChatList';
import {Map} from 'components/molecules/Detail/Map';
import MyPage from 'components/pages/Setting/MyPage';
import HostingRecruitList from 'components/pages/Setting/HostingRecruitList';
import ParticipateRecruitList from 'components/pages/Setting/ParticipateRecruitList';
import GPS from 'components/pages/Setting/GPS';
import OrderMenuList from 'components/pages/OrderMenuList';
import SearchPage from 'components/pages/Search';
import {useController, useForm} from 'react-hook-form';
import {searchRecruitAPI} from 'components/utils/api/Recruit';
import AlarmPage from 'components/pages/Alarm';
import ItemReport from 'components/pages/Report/ItemReport';
import UserReport from 'components/pages/Report/UserReport';
import EditProfile from 'components/pages/Setting/EditProfile';
import BlockedUserList from 'components/pages/Setting/BlockedUserList';
import NoticeList from 'components/pages/Setting/NoticeList';
import DetailNotice from 'components/pages/Setting/DetailNotice';
import SetProfile from 'components/pages/Setting/SetProfile';
import Notification from 'components/pages/Setting/Notification';

const AuthStack = createNativeStackNavigator();
const MainScreenTab = createBottomTabNavigator();
const BoardScreenStack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();
/*
    Stack Navigator
        - Stack Screen A

    Stack Navigator
        - Tab Navigator
            - Tab Screen B
            - Tab Screen C

*/

const AppTabComponent = () => {
  return (
    <MainScreenTab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: DARK_GRAY_COLOR,
        tabBarLabel: route.name,
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === '홈') {
            iconName = focused
              ? LOGO_SOLID_STROKE_MAIN7
              : LOGO_SOLID_STROKE_GRAY7;
          } else if (route.name === '채팅') {
            iconName = focused ? CHATTIING_PRIMARY_OUTLINE : CHATTIING_GRAY;
          } else if (route.name === '마이페이지') {
            iconName = focused ? PROFILE_PRIMARY_OUTLINE : PROFILE_GRAY;
          }
          return (
            <Image
              source={iconName}
              style={{
                maxWidth: route.name === '홈' ? 36 : 25,
                maxHeight: route.name === '홈' ? 36 : 25,
              }}
            />
          );
        },
      })}
      sceneContainerStyle={{
        backgroundColor: '#fff',
      }}>
      <MainScreenTab.Screen
        name="홈"
        component={CategoryStackComponent}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <MainScreenTab.Screen
        name="채팅"
        component={ChatStackComponent}
        options={{
          headerShadowVisible: false,

          headerShown: false,
        }}
      />
      <MainScreenTab.Screen
        name="마이페이지"
        component={MyPage}
        options={{
          headerShadowVisible: false,
          // headerShown: false,
        }}
      />
    </MainScreenTab.Navigator>
  );
};

const CategoryStackComponent = () => {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="Home"
        component={Main}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <CategoryStack.Screen
        name="카테고리"
        component={BoardListPage}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
    </CategoryStack.Navigator>
  );
};
const particiPantsDropdownModalListData = [{id: 0, text: '모집 나가기'}];
const SearchInput = ({error, name, control, rules}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
    rules,
  });
  return (
    <TextInput
      style={{
        backgroundColor: WHITE_COLOR,
        marginRight: 80,
        width: '75%',
        alignSelf: 'flex-start',
        // flex: 1,
        // maxWidth: '100%',
        // width: '100% - 144px',
        // marginHorizontal: 72,
        // left: 15,
        // height: 45,
        // borderRadius: 10,
        padding: 15,
        // borderWidth: 1,
        color: DARK_GRAY_COLOR,
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'justify',
      }}
      value={field.value}
      onChangeText={field.onChange}
      placeholder={'검색할 키워드를 입력해주세요                       '}
      placeholderTextColor={MAIN_GRAY_COLOR}
      // value={field.value}
      // onChangeText={field.onChange}
      // maxLength={20}
    />
  );
};
export const BoardStackComponent = () => {
  const useFormReturn = useForm({defaultValues: {keyword: ''}});
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useFormReturn;
  const navigation = useNavigation();
  const onSubmit = async data => {
    const result = await searchRecruitAPI(data.keyword);
    navigation.navigate(
      '검색' as never,
      {result: result, keyword: data.keyword} as never,
    );
  };
  return (
    <BoardScreenStack.Navigator>
      <BoardScreenStack.Screen
        name="HomeBoard"
        component={AppTabComponent}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <BoardScreenStack.Screen
        name="카테고리"
        component={BoardListPage}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="글 상세 보기"
        component={BoardItemDetail}
        options={({navigation, route}: {navigation; route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                let showModal =
                  route.params && route.params.modal
                    ? route.params.modal
                    : false;
                navigation.navigate('글 상세 보기', {
                  modal: !showModal,
                });
              }}>
              <Image source={SETTING_HORIZONTAL_GRAY_ICON} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="지도"
        component={Map}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="상세 설정"
        component={CreateRecruitStackComponent}
        options={{
          headerShown: false,
        }}
      />
      <BoardScreenStack.Screen
        name="검색"
        component={SearchPage}
        options={({navigation, route}) => ({
          headerTitleAlign: 'left',

          headerTitle: () => (
            <SearchInput
              error={errors}
              name={'keyword'}
              control={control}
              rules={{}}
              // rules={{required: true}}
            />
          ),
          // headerShown: false,
          headerShadowVisible: false,
          headerBackVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              // style={{ borderWidth: 1 }}
            >
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              // style={{borderWidth: 1}}
            >
              <Image source={SEARCH_PRIMARY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="알림"
        component={AlarmPage}
        options={({navigation, route}) => ({
          // headerShown: false,
          headerShadowVisible: false,
          headerBackVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              // style={{ borderWidth: 1 }}
            >
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="게시글 신고하기"
        component={ItemReport}
        options={({navigation, route}) => ({
          // headerShown: false,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: '신고하기',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              // style={{ borderWidth: 1 }}
            >
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="사용자 신고하기"
        component={UserReport}
        options={({navigation, route}) => ({
          // headerShown: false,
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: '신고하기',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              // style={{ borderWidth: 1 }}
            >
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="채팅방"
        component={DetailChatRoom}
        options={({navigation, route}: {navigation; route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),

          // headerSearchBarOptions: {},

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                let showModal =
                  route.params && route.params.modal
                    ? route.params.modal
                    : false;
                navigation.navigate('채팅방', {
                  modal: !showModal,
                });
              }}>
              <Image source={SETTING_HORIZONTAL_GRAY_ICON} />
            </TouchableOpacity>
          ),
        })}
      />
      {/* <BoardScreenStack.Screen
        name="현재 참여자"
        component={ChatMemberListBottomSheet}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      /> */}
      <BoardScreenStack.Screen
        name="주최한 모집글"
        component={HostingRecruitList}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="참여한 모집글"
        component={ParticipateRecruitList}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="알림 설정"
        component={Notification}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="거점 인증"
        component={GPS}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="차단 관리"
        component={BlockedUserList}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />

      <BoardScreenStack.Screen
        name="공지사항"
        component={NoticeList}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="상세 공지"
        component={DetailNotice}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerTitle: '공지사항',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="프로필 설정"
        component={SetProfile}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="프로필 수정"
        component={EditProfile}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
      <BoardScreenStack.Screen
        name="주문 내역"
        component={OrderMenuList}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
      />
    </BoardScreenStack.Navigator>
  );
};

export const CreateRecruitStackComponent = props => {
  const navigation = useNavigation();
  const {defaultItem, type} = props.route.params;
  // console.log(defaultItem)
  // navigation.setParams({defaultItem, type} as never);
  // navigation.navigate('카테고리 선택' as never, {params} as never);
  // console.log(props);
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="카테고리 선택"
        component={SelectCategoryPage}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
        initialParams={{type: type, defaultItem: defaultItem}}
      />
      <CategoryStack.Screen
        name="상세 설정1"
        component={CreateRecruit1}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
        initialParams={{type: type, defaultItem: defaultItem}}
      />
      <CategoryStack.Screen
        name="상세 설정2"
        component={CreateRecruit2}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
        initialParams={{type: type, defaultItem: defaultItem}}
      />
      <CategoryStack.Screen
        name="상세 설정3"
        component={CreateRecruit3}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
        initialParams={{type: type, defaultItem: defaultItem}}
      />
      <CategoryStack.Screen
        name="상세 설정4"
        component={CreateRecruit4}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
        initialParams={{type: type, defaultItem: defaultItem}}
      />
      <CategoryStack.Screen
        name="배달 가게 선택"
        component={PlaceSearch}
        options={({navigation, route}) => ({
          headerBackVisible: false,
          headerShadowVisible: false,

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BACK_GRAY} />
            </TouchableOpacity>
          ),
        })}
        initialParams={{type: type, defaultItem: defaultItem}}
      />
    </CategoryStack.Navigator>
  );
};
export const ChatStackComponent = () => {
  const navigation = useNavigation();
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerTitle: '채팅',
          headerShadowVisible: false,
        }}
      />
    </ChatStack.Navigator>
  );
};

// export const SettingStackComponent = () => {
//   const navigation = useNavigation();
//   return (
//     <SettingStack.Navigator>
//       <SettingStack.Screen name="주최한 모집" component={HostingRecruitList} />
//     </SettingStack.Navigator>
//   );
// };

export const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <AuthStack.Screen name="Home" component={BoardStackComponent} />
      ) : (
        <>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen
            name="BoardStackComponent"
            component={BoardStackComponent}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};
