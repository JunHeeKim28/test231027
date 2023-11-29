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
  Modal,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GPTScreen = ({navigation}) => {
  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();
  const [userId, setUserId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(storedUserId => {
      if (storedUserId) {
        setUserId(storedUserId);
      }
    });
  }, []);

  const displayCocktailInfo = async cocktailInfo => {
    // 이미지 URL이 상대 경로인 경우, 전체 URL을 생성
    const fullImageUrl = cocktailInfo.C_IMG.startsWith('http')
      ? cocktailInfo.C_IMG
      : `http://ceprj.gachon.ac.kr:60005${cocktailInfo.C_IMG}`;

    setSelectedCocktail({...cocktailInfo, C_IMG: fullImageUrl});
    setShowModal(true);
  };

  const sendCocktailRequest = async cocktailInfo => {
    setShowLoadingModal(true); // 제조 중 모달 활성화
    setLoading(true); // 제조 시작 전 로딩 상태 활성화
    try {
      // 사용자의 Raspberry Pi IP 주소 요청
      const ipResponse = await axios.post(
        'http://ceprj.gachon.ac.kr:60005/user/req_ip',
        {
          id: userId,
        },
      );

      if (!ipResponse.data.success) {
        throw new Error('Raspberry Pi IP 주소를 가져오는데 실패했습니다.');
      }

      const raspberryPiIp = ipResponse.data.raspberryPiIp;

      // 칵테일 제조 요청 데이터 준비
      const requestData = {
        UserID: userId,
        recipeTitle: cocktailInfo.C_NAME,
        first: cocktailInfo.C_VOLUME1 === '' ? 1 : cocktailInfo.C_VOLUME1,
        second: cocktailInfo.C_VOLUME2 === '' ? 1 : cocktailInfo.C_VOLUME2,
        third: cocktailInfo.C_VOLUME3 === '' ? 1 : cocktailInfo.C_VOLUME3,
        fourth: cocktailInfo.C_VOLUME4 === '' ? 1 : cocktailInfo.C_VOLUME4,
      };

      // 칵테일 제조 요청 보내기
      const makeResponse = await axios.post(
        `http://${raspberryPiIp}:10000/make_cocktail`,
        requestData,
      );

      if (makeResponse.data.success) {
        Alert.alert('제조 완료', '칵테일 제조가 완료되었습니다.');
        navigation.navigate('Main', {responseData: makeResponse.data});
        await axios.post(
          'http://ceprj.gachon.ac.kr:60005/user/cocktail_count',
          {
            cocktailName: cocktailInfo.C_NAME,
          },
        );

        // 사용 이력 추가 요청
        await axios.post('http://ceprj.gachon.ac.kr:60005/user/uselogadd', {
          cocktailName: cocktailInfo.C_NAME,
          userId: userId,
        });
      } else {
        throw new Error('칵테일 제조를 실패하였습니다.');
      }
    } catch (error) {
      console.error('Error', error);
      Alert.alert('오류', error.message);
    } finally {
      setShowLoadingModal(false); // 제조 중 모달 활성화
      setLoading(false); // 제조 완료 후 로딩 상태 비활성화
    }
  };

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
      const response = await axios.post(
        'http://ceprj.gachon.ac.kr:60005/user/get-cocktail-info',
        {cocktailName},
      );
      displayCocktailInfo(response.data.cocktailInfo);
    } catch (error) {
      console.error('Error', error);
      Alert.alert('오류', error.message);
    }
  };

  const extractCocktailName = message => {
    const regex = /"([^"]+)"/;
    const match = regex.exec(message);
    return match && match[1] ? match[1] : null;
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setChat([...chat, {role: 'user', message: userInput}]);
    try {
      const response = await axios.post(
        'http://ceprj.gachon.ac.kr:60005/user/recommendCocktail',
        {userMessages: [userInput], assistantMessages: []},
      );
      setChat([
        ...chat,
        {role: 'user', message: userInput},
        {role: 'assistant', message: response.data.assistant},
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setUserInput(text)}
          value={userInput}
          placeholder="메시지를 입력하세요..."
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.sendBtn} // 스타일 이름 확인
          onPress={sendMessage}
          disabled={loading}>
          <Text style={styles.sendBtnTxt}>
            {loading ? '로딩 중...' : '전송'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.makeBtn} // 스타일 이름 확인
        onPress={customCocktail}>
        <Text style={styles.makeBtnTxt}>제조하기</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalView}>
          {/* 선택된 칵테일의 이미지와 정보를 표시 */}
          <Image
            source={{uri: selectedCocktail?.C_IMG}}
            style={styles.cocktailImage}
          />
          <Text style={styles.modalTitle}>
            이름: {selectedCocktail?.C_NAME}
          </Text>
          {/* 칵테일의 재료 및 기타 정보 */}
          <Text style={styles.modalText}>
            재료1: {selectedCocktail?.C_ING1} - {selectedCocktail?.C_VOLUME1}
          </Text>
          <Text style={styles.modalText}>
            재료2: {selectedCocktail?.C_ING2} - {selectedCocktail?.C_VOLUME2}
          </Text>
          <Text style={styles.modalText}>
            재료3: {selectedCocktail?.C_ING3} - {selectedCocktail?.C_VOLUME3}
          </Text>
          <Text style={styles.modalText}>
            재료4: {selectedCocktail?.C_ING4} - {selectedCocktail?.C_VOLUME4}
          </Text>
          {/* 필요에 따라 추가 재료 정보 */}
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setShowModal(false);
              sendCocktailRequest(selectedCocktail);
            }}>
            <Text style={styles.modalButtonText}>확인</Text>
          </TouchableOpacity>

          {/* '취소' 버튼 */}
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setShowModal(false)}>
            <Text style={styles.modalButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLoadingModal}
        onRequestClose={() => setShowLoadingModal(false)}>
        <View style={styles.loadingContainer}>
          <Image
            source={{uri: selectedCocktail?.C_IMG}}
            style={styles.cocktailImage}
          />
          <ActivityIndicator size="large" color="#be289d" />
          <Text style={styles.loadingText}>제조 중...</Text>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  loadingText: {
    marginTop: 20,
    color: 'white',
    fontSize: 18,
  },
  modalButton: {
    backgroundColor: '#be289d',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'grey',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalView: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cocktailImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
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
    paddingVertical: 12, // 버튼의 세로 크기를 조정
    paddingHorizontal: 20, // 버튼의 가로 크기를 조정
    marginVertical: 5, // 버튼의 상하 위치를 조정
  },
  sendBtnTxt: {
    color: 'white',
    fontSize: 16,
  },
  makeBtn: {
    backgroundColor: '#be289d',
    borderRadius: 10,
    paddingVertical: 12, // 버튼의 세로 크기를 조정
    paddingHorizontal: 20, // 버튼의 가로 크기를 조정
    alignItems: 'center',
    width: 'auto',
    marginBottom: 15, // 버튼의 하단 마진을 조정
  },
  makeBtnTxt: {
    color: 'white',
    fontSize: 18,
  },
});

export default GPTScreen;
