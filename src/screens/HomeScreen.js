//이주 성공
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function HomeScreen() {
  const navigation = useNavigation();
  const goToLoginScreen = () => {
    navigation.navigate('Login');
  };
  const goToRegisterScreen = () => {
    navigation.navigate('Register');
  };
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn1} onPress={goToLoginScreen}>
          <Text style={styles.btnText1}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn1} onPress={goToRegisterScreen}>
          <Text style={styles.btnText1}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingVertical: 20,
  },
  btn1: {
    backgroundColor: '#be289d',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 5,
    width: 140,
  },
  btnText1: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
  },
});
