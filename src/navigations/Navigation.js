//이주 성공
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListScreen from '../screens/ListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MainScreen from '../screens/MainScreen';
import LogoTitle from '../screens/LogoTitle';
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
        },
      }}>
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarLabel: '이용내역',
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
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '마이페이지',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default Navigation;
