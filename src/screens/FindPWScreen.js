//FindPWScreen.js
import {
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {useState} from 'react';
import axios from 'axios';

function FindIDScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  //비밀번호 찾기 부분
  const findPW = () => {
    axios
      .post('https://ceprj.gachon.ac.kr:60005/user/reset-password', {
        username,
        email,
      })
      .then(response => {
        const newPassword = response.data;
        if (newPassword) {
          Alert.alert('비밀번호 찾기', `새로운 비밀번호: ${newPassword}`);
        } else {
          Alert.alert(
            '비밀번호 찾기',
            '등록되지 않은 아이디 혹은 이메일입니다.',
          );
        }
      })
      .catch(error => {
        console.error('비밀번호 찾기 오류: ', error);
        Alert.alert('오류', '비밀번호 찾기 중 오류가 발생했습니다.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.text}>아이디</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder="아이디"
          placeholderTextColor="gray"
        />
      </View>
      <View style={styles.container2}>
        <Text style={styles.text}>이메일</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="이메일"
          placeholderTextColor="gray"
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={findPW}>
        <Text style={styles.btnTxt}>비밀번호 찾기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  container1: {
    marginTop: 30,
  },
  container2: {
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginRight: 230,
    //marginTop: 50,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
    color: 'white',
  },
  btn: {
    marginTop: 40,
    backgroundColor: '#be289d',
    borderRadius: 10,
    height: 50,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
});

export default FindIDScreen;
