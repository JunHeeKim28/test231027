import React, {useState} from 'react';
import {View, Text, TextInput, Button, ScrollView} from 'react-native';
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
    <View style={{padding: 20}}>
      <ScrollView style={{height: '80%'}}>
        {chat.map((message, index) => (
          <View key={index} style={{marginVertical: 5}}>
            <Text
              style={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
              {message.message}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        onChangeText={text => setUserInput(text)}
        value={userInput}
      />
      <Button
        title={loading ? 'Loading...' : 'Send Request'}
        onPress={sendMessage}
        disabled={loading}
      />
    </View>
  );
};

export default GPTScreen;
