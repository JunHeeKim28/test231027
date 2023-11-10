import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {FavoritesProvider} from './src/screens/FavoritesContext';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Navigation from './src/navigations/Navigation';
import CocktailRecipeScreen from './src/screens/CocktailRecipeScreen';
import DeviceRegisterScreen from './src/screens/DeviceRegisterScreen';
import FindIDScreen from './src/screens/FindIDScreen';
import FindPWScreen from './src/screens/FindPWScreen';
import InfoScreen from './src/screens/InfoScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import CocktailListScreen from './src/screens/CocktailListScreen';
import ProfileEditScreen from './src/screens/ProfileEditScreen';
import DeviceEditScreen from './src/screens/DeviceEditScreen';
import PopularScreen from './src/screens/PopularScreen';
import MakeScreen from './src/screens/MakeScreen';
import GPTScreen from './src/screens/GPTScreen';
import MakeByMyselfScreen from './src/screens/MakeByMyselfScreen';
import MakePWScreen from './src/screens/MakePWScreen';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <FavoritesProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: '로그인',
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerTitle: '회원가입',
            }}
          />
          <Stack.Screen
            name="Navigation"
            component={Navigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CocktailRecipe"
            component={CocktailRecipeScreen}
            options={{headerTitle: '칵테일 레시피'}}
          />
          <Stack.Screen
            name="DeviceRegister"
            component={DeviceRegisterScreen}
            options={{headerTitle: '기기 등록'}}
          />
          <Stack.Screen
            name="FindID"
            component={FindIDScreen}
            options={{headerTitle: '아이디 찾기'}}
          />
          <Stack.Screen
            name="FindPW"
            component={FindPWScreen}
            options={{headerTitle: '비밀번호 찾기'}}
          />
          <Stack.Screen
            name="Info"
            component={InfoScreen}
            options={{headerTitle: '이용방법'}}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{headerTitle: '즐겨찾기'}}
          />
          <Stack.Screen
            name="CocktailList"
            component={CocktailListScreen}
            options={{headerTitle: '칵테일 리스트'}}
          />
          <Stack.Screen
            name="Review"
            component={ReviewScreen}
            options={{headerTitle: '칵테일 리뷰'}}
          />
          <Stack.Screen
            name="ProfileEdit"
            component={ProfileEditScreen}
            options={{headerTitle: '내 정보 수정하기'}}
          />
          <Stack.Screen
            name="DeviceEdit"
            component={DeviceEditScreen}
            options={{headerTitle: '기기 정보 수정하기'}}
          />
          <Stack.Screen
            name="Popular"
            component={PopularScreen}
            options={{headerTitle: '실시간 인기 칵테일'}}
          />
          <Stack.Screen
            name="Make"
            component={MakeScreen}
            options={{headerTitle: '칵테일 제조'}}
          />
          <Stack.Screen
            name="GPT"
            component={GPTScreen}
            options={{headerTitle: '챗봇으로 제조하기'}}
          />
          <Stack.Screen
            name="MakeByMyself"
            component={MakeByMyselfScreen}
            options={{headerTitle: '직접 제조하기'}}
          />
          <Stack.Screen
            name="MakePW"
            component={MakePWScreen}
            options={{headerTitle: '새 비밀번호 등록하기'}}
          />
        </Stack.Navigator>
      </FavoritesProvider>
    </NavigationContainer>
  );
}

export default App;
