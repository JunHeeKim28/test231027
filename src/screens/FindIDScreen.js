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
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const findID = async () => {
    try {
      if (!nickname || !email) {
        Alert.alert('입력 오류', '닉네임과 이메일을 모두 입력해주세요.');
        return;
      }

      const response = await axios.post(
        'http://ceprj.gachon.ac.kr:60005/user/findID',
        {
          nickname,
          email,
        },
      );

      if (response.data.id) {
        Alert.alert('아이디 찾기', `찾은 아이디: ${response.data.id}`);
      } else {
        Alert.alert('아이디 찾기', '아이디를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('아이디 찾기 오류:', error);
      Alert.alert('아이디 찾기', '서버 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.text}>닉네임</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={text => setNickname(text)}
          placeholder="닉네임"
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
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={findID}>
        <Text style={styles.btnTxt}>아이디 찾기</Text>
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
    width: 100,
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
