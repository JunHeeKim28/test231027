import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useState} from 'react';
import {ScrollView, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
const ProfileEditScreen = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEdit, setIsEdit] = useState(null);

  const handleEdit = () => {
    axios
      .post('http://ceprj.gachon.ac.kr:60005/user/edit_profile', {
        nickname,
        password,
        email,
        phone,
      })
      .then(response => {
        console.log('successful profile edit: ', response.data);
        setIsEdit('success');
        Alert.alert('성공', '프로필 정보가 변경되었습니다.');
      })
      .catch(error => {
        console.error('fail profile edit: ', error);
        setIsEdit('fail');
        Alert.alert('오류', '프로필 변경에 실패했습니다.');
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
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleEdit}>
          <Text style={styles.btnText}>정보 변경</Text>
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
  btnContainer: {
    flex: 1,
    //justifyContent: "center", // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#be289d',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    height: 50,
    width: 100,
    marginBottom: 20,
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ProfileEditScreen;
