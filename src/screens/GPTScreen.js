import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GPTScreen = ({navigation}) => {
  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('userId').then(storedUserId => {
      if (storedUserId) {
        setUserId(storedUserId);
      }
    });
  }, []);

  const customCocktail = async () => {
    const lastAssistantMessage = [...chat]
      .reverse()
      .find(message => message.role === 'assistant')?.message;

    if (!lastAssistantMessage) {
      Alert.alert('오류', '칵테일 정보를 찾을 수 없습니다.');
      return;
    }

    const cocktailName = extractCocktailName(lastAssistantMessage);

    try {
      // 1. 사용자의 Raspberry Pi IP 주소 요청
      const ipResponse = await axios.post(
        'http://ceprj.gachon.ac.kr:60005/user/req_ip',
        {
          id: userId,
        },
      );

      if (!ipResponse.data.success) {
        throw new Error('Raspberry Pi IP 주소를 가져오는데 실패했습니다.');
      }

      const response = await axios.post(
        'http://ceprj.gachon.ac.kr:60005/user/get-cocktail-info',
        {
          cocktailName: cocktailName,
        },
      );
      const cocktailInfo = response.data.cocktailInfo;

      const requestData = {
        UserID: userId,
        recipeTitle: cocktailInfo.C_NAME,
        first: cocktailInfo.C_VOLUME1 === '' ? 1 : cocktailInfo.C_VOLUME1,
        second: cocktailInfo.C_VOLUME2 === '' ? 1 : cocktailInfo.C_VOLUME2,
        third: cocktailInfo.C_VOLUME3 === '' ? 1 : cocktailInfo.C_VOLUME3,
        fourth: cocktailInfo.C_VOLUME4 === '' ? 1 : cocktailInfo.C_VOLUME4,
      };

      const raspberryPiIp = ipResponse.data.raspberryPiIp;
      const Response2 = await axios.post(
        'http://ceprj.gachon.ac.kr:60005/user/device_status',
        {
          id: userId,
        },
      );

      if (Response2.data.devstatus !== 'inprogress') {
        // 3. 칵테일 제조 요청
        console.log(raspberryPiIp);
        console.log(requestData);
        const makeResponse = await axios.post(
          `http://${raspberryPiIp}:10000/make_cocktail`,
          requestData,
        );

        if (makeResponse.data.success) {
          console.log('제조에 성공하였습니다.');
          navigation.navigate('Main');
        } else {
          throw new Error('칵테일 제조를 실패하였습니다.');
        }

        console.log('Success', makeResponse.data);
        Alert.alert(
          '제조 요청',
          '칵테일을 제조 중입니다.',
          [
            {
              text: '확인',
              onPress: () => {
                navigation.navigate('List', {responseData: makeResponse.data});
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          '제조 요청',
          '메이커가 제조 중입니다. 잠시 후 시도해 주세요.',
          [
            {
              text: '확인',
              onPress: () => {
                navigation.navigate('List', {responseData: makeResponse.data});
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error('Error', error);
      Alert.alert('오류', error.message);
    }
  };

  const extractCocktailName = message => {
    const regex = /"([^"]+)"/;
    const match = regex.exec(message);
    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
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
    } finally {
      scrollViewRef.current.scrollToEnd();
      setUserInput('');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        {chat.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              {
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: message.role === 'user' ? 'gray' : '#be289d',
              },
            ]}>
            <Text style={{color: '#fff', fontSize: 16}}>{message.message}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="large" color="#be289d" />}
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.makeBtn} onPress={customCocktail}>
          <Text style={styles.makeBtnTxt}>제조하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setUserInput(text)}
          value={userInput}
          placeholder="메시지를 입력하세요..."
          editable={!loading}
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
  makeBtn: {
    backgroundColor: '#be289d',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: 'auto',
    marginBottom: 10,
  },
  makeBtnTxt: {
    color: 'white',
    fontSize: 18,
  },
});

export default GPTScreen;
