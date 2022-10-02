import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BtnHorizontal3 from './components/molecules/Button/BtnHorizontal3';
import Login from './components/pages/Login';
import Main from './components/pages/Main';
import {Image} from 'react-native';
import {
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
import Chat from 'components/pages/Chat';
import BoardListPage from 'components/pages/BoardListPage';
import CreateRecruit1 from 'components/pages/CreateRecuit/first';
import CreateRecruit2 from 'components/pages/CreateRecuit/second';
import CreateRecruit3 from 'components/pages/CreateRecuit/third';
import CreateRecruit4 from 'components/pages/CreateRecuit/fourth';

const AuthStack = createNativeStackNavigator();
const MainScreenTab = createBottomTabNavigator();
const BoardScreenStack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();
const CreateRecruitStack = createNativeStackNavigator();
/*
    Stack Navigator
        - Stack Screen A

    Stack Navigator
        - Tab Navigator
            - Tab Screen B
            - Tab Screen C

*/

const isLoggedIn = true;

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
        // headerShown: false,
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
      <MainScreenTab.Screen name="채팅" component={Chat} />
      <MainScreenTab.Screen name="마이페이지" component={BtnHorizontal3} />
    </MainScreenTab.Navigator>
  );
};

const CategoryStackComponent = () => {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="홈"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <CategoryStack.Screen
        name="카테고리"
        component={BoardListPage}
        options={{
          headerShadowVisible: false,
        }}
      />
    </CategoryStack.Navigator>
  );
};
export const BoardStackComponent = () => {
  return (
    <BoardScreenStack.Navigator>
      <BoardScreenStack.Screen
        name="Main"
        component={AppTabComponent}
        options={{
          headerShown: false,
        }}
      />
      <BoardScreenStack.Screen
        name="카테고리"
        component={BoardListPage}
        options={
          {
            // headerShadowVisible: false,
          }
        }
      />
      <BoardScreenStack.Screen
        name="글 상세 보기"
        component={BoardItemDetail}
      />
      <BoardScreenStack.Screen
        name="상세 설정"
        component={CreateRecruitStackComponent}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </BoardScreenStack.Navigator>
  );
};

const CreateRecruitStackComponent = () => {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="상세 설정1"
        component={CreateRecruit1}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <CategoryStack.Screen
        name="상세 설정2"
        component={CreateRecruit2}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <CategoryStack.Screen
        name="상세 설정3"
        component={CreateRecruit3}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <CategoryStack.Screen
        name="상세 설정4"
        component={CreateRecruit4}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </CategoryStack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <AuthStack.Screen name="홈" component={BoardStackComponent} />
      ) : (
        <>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen
            name="BoardStackComponent"
            component={BoardStackComponent}
          />

          {/* <AuthStack.Screen
            name="BoardStackComponent"
            component={BoardStackComponent}
          /> */}
        </>
      )}
    </AuthStack.Navigator>
  );
};
