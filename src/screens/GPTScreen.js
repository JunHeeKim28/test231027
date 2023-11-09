import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import axios from 'axios';

const GPTScreen = () => {
  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return; // 입력이 없으면 요청을 보내지 않음
    setLoading(true);
    setChat([...chat, {role: 'user', message: userInput}]);

    try {
      const response = await axios.post(
        'http://ceprj.gachon.ac.kr:60005/user/recommendCocktail',
        {
          userMessages: [userInput],
          assistantMessages: [],
        },
      );

      const data = response.data;
      setChat([
        ...chat,
        {role: 'user', message: userInput},
        {role: 'assistant', message: data.assistant},
      ]);
    } catch (error) {
      console.error('Error:', error);
    }

    setUserInput('');
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {chat.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              {
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor:
                  message.role === 'user' ? 'orange' : 'lightblue',
                borderTopLeftRadius: message.role === 'user' ? 10 : 0,
                borderTopRightRadius: message.role === 'user' ? 0 : 20,
              },
            ]}>
            <Text style={{color: '#000'}}>{message.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setUserInput(text)}
          value={userInput}
          placeholder="메시지를 입력하세요..."
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={sendMessage}
          disabled={loading}>
          <Text style={styles.sendBtnTxt}>
            {loading ? '로딩 중...' : '전송'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },
  messageContainer: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    maxWidth: '70%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sendBtn: {
    backgroundColor: '#be289d',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendBtnTxt: {
    color: 'white',
    fontSize: 16,
  },
});
export default GPTScreen;
