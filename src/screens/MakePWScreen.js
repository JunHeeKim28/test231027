import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
const MakePWScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {username} = route.params;
  const [newPW, setNewPW] = useState('');
  const makePW = () => {
    if (!newPW) {
      Alert.alert('비밀번호 변경 오류', '항목을 채워주세요', [
        {
          text: '확인',
          onPress: () => {},
        },
      ]);
      return;
    }
    axios
      .post('http://ceprj.gachon.ac.kr:60005/user/makePW', {
        newPW,
      })
      .then(response => {
        console.log('Make successful', response.data);
        Alert.alert(
          '비밀번호 변경 완료',
          '비밀번호가 변경되었습니다.',
          [
            {
              text: '확인',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ],
          {cancelable: false},
        );
      })
      .catch(error => {
        console.error('Edit error', error);
        Alert.alert(
          '변경 오류',
          '비밀번호 변경 중 오류가 발생했습니다.',
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
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.text}>새 비밀번호</Text>
        <TextInput
          style={styles.input}
          value={newPW}
          onChangeText={text => setNewPW(text)}
          placeholder="새 비밀번호"
          placeholderTextColor="gray"
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={makePW}>
        <Text style={styles.btnTxt}>비밀번호 변경</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  btn: {
    marginTop: 40,
    backgroundColor: '#be289d',
    borderRadius: 10,
    height: 50,
    width: 180,
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

export default MakePWScreen;
