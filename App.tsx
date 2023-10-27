import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Navigation from './src/navigations/Navigation';
import CocktailRecipeScreen from './src/screens/CocktailRecipeScreen';
import DeviceRegisterScreen from './src/screens/DeviceRegisterScreen';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
