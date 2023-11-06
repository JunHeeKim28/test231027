//이주 성공
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListScreen from '../screens/ListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MainScreen from '../screens/MainScreen';
import LogoTitle from '../screens/LogoTitle';
import {Image} from 'react-native';
import home from '../../assets/home.png';
import list from '../../assets/list.png';
import user from '../../assets/user.png';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black', // 탭 네비게이터의 배경색을 검정색으로 설정
          height: 60,
        },
        tabBarLabelStyle: {
          color: 'white', // 탭 라벨 텍스트 색상을 흰색으로 설정
          fontSize: 16,
        },
      }}>
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarLabel: '이용내역',
          tabBarIcon: ({color, size}) => (
            <Image
              source={list}
              style={{tintColor: color, width: size, height: size}}
            />
          ),
          tabBarActiveTintColor: '#be289d', // 선택된 탭의 글씨 색상을 핑크색으로 설정
          //tabBarActiveBackgroundColor: 'black', // 선택된 탭의 배경 색상을 설정 (필요에 따라 변경)
        }}
      />
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerTitle: () => <LogoTitle />,
          tabBarLabel: '메인',
          headerStyle: {
            backgroundColor: 'black',
          },
          tabBarIcon: ({color, size}) => (
            <Image
              source={home}
              style={{tintColor: color, width: size, height: size}}
            />
          ),
          tabBarActiveTintColor: '#be289d', // 선택된 탭의 글씨 색상을 핑크색으로 설정
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '마이페이지',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Image
              source={user}
              style={{tintColor: color, width: size, height: size}}
            />
          ),
          tabBarActiveTintColor: '#be289d', // 선택된 탭의 글씨 색상을 핑크색으로 설정
        }}
      />
    </Tab.Navigator>
  );
};
export default Navigation;
