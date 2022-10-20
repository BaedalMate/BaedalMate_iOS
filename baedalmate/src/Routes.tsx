import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './components/pages/Login';
import Main from './components/pages/Main';
import {Image, TouchableOpacity} from 'react-native';
import {
  BACK_GRAY,
  CHATTIING_PRIMARY_OUTLINE,
  CHATTIING_REGULAR,
  DARK_GRAY_COLOR,
  HOME_PRIMARY_OUTLINE,
  HOME_REGULAR,
  PRIMARY_COLOR,
  PROFILE_PRIMARY_OUTLINE,
  PROFILE_REGULAR,
} from './themes/theme';
import BoardItemDetail from 'components/pages/Detail';
import BoardListPage from 'components/pages/BoardListPage';
import CreateRecruit1 from 'components/pages/CreateRecuit/First';
import CreateRecruit2 from 'components/pages/CreateRecuit/Second';
import CreateRecruit3 from 'components/pages/CreateRecuit/Third';
import CreateRecruit4 from 'components/pages/CreateRecuit/Fourth';
import PlaceSearch from 'components/pages/CreateRecuit/PlaceSearch';
import SelectCategoryPage from 'components/pages/CreateRecuit/CategorySelect';
import {useNavigation} from '@react-navigation/native';
import DetailChatRoom from 'components/pages/DetailChatRoom';
import Chat from 'components/pages/ChatList';
import {Map} from 'components/molecules/Detail/Map';
import MyPage from 'components/pages/Setting/MyPage';
import HostingRecruitList from 'components/pages/Setting/HostingRecruitList';
import ParticipateRecruitList from 'components/pages/Setting/ParticipateRecruitList';

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
            iconName = focused ? HOME_PRIMARY_OUTLINE : HOME_REGULAR;
          } else if (route.name === '채팅') {
            iconName = focused ? CHATTIING_PRIMARY_OUTLINE : CHATTIING_REGULAR;
          } else if (route.name === '마이페이지') {
            iconName = focused ? PROFILE_PRIMARY_OUTLINE : PROFILE_REGULAR;
          }
          return <Image source={iconName} />;
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
        }}
      />
      <MainScreenTab.Screen
        name="채팅"
        component={ChatStackComponent}
        options={{
          headerShown: false,
        }}
      />
      <MainScreenTab.Screen
        name="마이페이지"
        component={MyPage}
        options={
          {
            // headerShown: false,
          }
        }
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
        }}
      />
      <CategoryStack.Screen
        name="카테고리"
        component={BoardListPage}
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
      />
    </CategoryStack.Navigator>
  );
};
export const BoardStackComponent = () => {
  return (
    <BoardScreenStack.Navigator>
      <BoardScreenStack.Screen
        name="HomeBoard"
        component={AppTabComponent}
        options={{
          headerShown: false,
        }}
      />
      <BoardScreenStack.Screen
        name="카테고리"
        component={BoardListPage}
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
      />
      <BoardScreenStack.Screen
        name="글 상세 보기"
        component={BoardItemDetail}
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
      />
      <BoardScreenStack.Screen
        name="지도"
        component={Map}
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
      />
      <BoardScreenStack.Screen
        name="상세 설정"
        component={CreateRecruitStackComponent}
        options={{
          headerShown: false,
        }}
      />
      <BoardScreenStack.Screen
        name="채팅방"
        component={DetailChatRoom}
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
      />
      <BoardScreenStack.Screen
        name="주최한 모집"
        component={HostingRecruitList}
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
      />
      <BoardScreenStack.Screen
        name="참여한 모집"
        component={ParticipateRecruitList}
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
      />
    </BoardScreenStack.Navigator>
  );
};

export const CreateRecruitStackComponent = () => {
  const navigation = useNavigation();
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="카테고리 선택"
        component={SelectCategoryPage}
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
      />
      <CategoryStack.Screen
        name="상세 설정1"
        component={CreateRecruit1}
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
      />
      <CategoryStack.Screen
        name="상세 설정2"
        component={CreateRecruit2}
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
      />
      <CategoryStack.Screen
        name="상세 설정3"
        component={CreateRecruit3}
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
      />
      <CategoryStack.Screen
        name="상세 설정4"
        component={CreateRecruit4}
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
      />
      <CategoryStack.Screen
        name="배달 가게 선택"
        component={PlaceSearch}
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
