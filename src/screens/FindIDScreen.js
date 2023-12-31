//FindIDScreen.js
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
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // 서버로 요청을 보내 아이디를 찾는 부분
  const findID = () => {
    axios
      .post('http://ceprj.gachon.ac.kr:60005/user/find-id', {
        phone,
        email,
      })
      .then(response => {
        const responseData = response.data;
        console.log(responseData);
        if (responseData.success) {
          // 서버에서 'success: true'로 응답한 경우
          Alert.alert('아이디 찾기', `찾은 아이디: ${responseData.userId}`);
        } else {
          // 서버에서 'success: false'로 응답한 경우
          Alert.alert('아이디 찾기', '해당 정보로 아이디를 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error('아이디 찾기 오류:', error);
        Alert.alert('오류', '아이디 찾기 중 오류가 발생했습니다.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.text}>전화번호</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={text => setPhone(text)}
          placeholder="전화번호"
          placeholderTextColor="gray"
          keyboardType="numeric"
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
