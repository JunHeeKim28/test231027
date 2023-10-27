//이주 성공
import axios from 'axios';
import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

const RegisterScreen = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [isRegistered, setIsRegistered] = useState(false);
  const handleRegister = () => {
    //하나라도 없는 경우
    if (!nickname || !username || !password || !email || !phone) {
      Alert.alert('회원가입 오류', '모든 항목을 채워주세요.', [
        {
          text: '확인',
          onPress: () => {},
        },
      ]);
      return;
    }
    axios
      .post('http://ceprj.gachon.ac.kr:60005/user/create_process', {
        nickname,
        username,
        password,
        email,
        phone,
      })
      .then(response => {
        console.log('Signup successful', response.data);
        setIsRegistered(true); // 서버 응답이 성공적이면 상태 변경
        Alert.alert(
          '회원가입 완료',
          '회원가입이 완료되었습니다.',
          [
            {
              text: '확인',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ],
          {cancelable: false}, // 바깥쪽 터치로 알림창을 닫지 못하게 설정
        );
      })
      .catch(error => {
        console.error('Signup error', error);
        Alert.alert(
          '회원가입 오류',
          '회원가입 중 오류가 발생했습니다.',
          [
            {
              text: '확인',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>닉네임</Text>
      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={text => setNickname(text)}
      />
      <Text style={styles.label}>아이디</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Text style={styles.label}>이메일</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={text => setPhone(text)}
        keyboardType="numeric"
      />
      <View style={styles.registerbtnContainer}>
        <TouchableOpacity style={styles.registerbtn}>
          <Text
            style={styles.registerbtnText}
            //onPress={() => registerAlert()}
            onPress={handleRegister}
            //onPress={() => navigation.navigate("Login")}
            //이메일 또는 아이디가 이미 디비에 저장되어 있다면 회원가입 안됨
          >
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  registerbtnContainer: {
    flex: 1,
    //justifyContent: "center", // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
  },
  registerbtn: {
    backgroundColor: '#be289d',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    height: 50,
    width: 100,
    marginBottom: 20,
    justifyContent: 'center',
  },
  registerbtnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default RegisterScreen;
