//이주 성공
import {useState} from 'react';
import {
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import {Alert} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios
      .post('http://ceprj.gachon.ac.kr:60005/user/login', {
        userId,
        password,
      })
      .then(response => {
        console.log('Login successful', response.data);
        if (response.data.success) {
          // 로그인 성공시 다른 화면으로 이동 등의 로직 구현
          navigation.navigate('Navigation');
        } else {
          Alert.alert(
            '로그인 오류',
            '아이디나 비밀번호가 올바르지 않습니다.',
            [
              {
                text: '확인',
                onPress: () => {},
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(error => {
        console.error('Login error', error);
      });
  };
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        value={userId}
        placeholder="아이디"
        placeholderTextColor="gray"
        onChangeText={text => setUserId(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="gray"
        onChangeText={text => setPassword(text)}
        secureTextEntry={true} // 비번 입력 시 별 표시
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btnText2}>아이디 찾기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.btnText2}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    color: 'white',
  },
  loginButton: {
    backgroundColor: '#be289d',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    height: 50,
    width: 100,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column', // Arrange buttons horizontally
    justifyContent: 'space-between', // Add space between buttons
    width: 300,
    marginBottom: 10, // Add some margin below the buttons
  },
  btn2: {
    backgroundColor: 'black',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText2: {
    color: 'gray',
    marginBottom: '20',
  },
});

export default LoginScreen;
