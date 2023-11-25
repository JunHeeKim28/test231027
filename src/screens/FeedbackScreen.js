import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const FeedbackScreen = ({navigation}) => {
  const [LED, setLED] = useState(false);
  const [waterPump, setWaterPump] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [device, setDevice] = useState(false);
  const [ETC, setETC] = useState('');
  const [userId, setUserId] = useState('');
  useEffect(() => {
    // AsyncStorage에서 사용자 ID 가져오기
    AsyncStorage.getItem('userId').then(storedUserId => {
      if (storedUserId) {
        setUserId(storedUserId); // AsyncStorage에서 가져온 userId로 상태 업데이트
      }
    });
  }, []);

  const handleSubmitFeedback = async () => {
    const feedbackData = {
      ID: userId,
      LED: LED,
      waterPump: waterPump,
      indicator: indicator,
      device: device,
      etc: ETC,
    };
    Alert.alert('피드백 제출', '피드백을 제출하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {
        text: '확인',
        onPress: async () => {
          const feedback_res = await axios.post(
            'http://ceprj.gachon.ac.kr:60005/user/feedback',
            feedbackData,
          );
          console.log(feedbackData);
          navigation.navigate('Profile');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View>
        <BouncyCheckbox
          isChecked={LED}
          onPress={isChecked => setLED(isChecked)}
          textStyle={styles.checkboxText}
          style={styles.checkbox}
          fillColor="#be289d"
          text="LED가 안 나와요"
        />
        <BouncyCheckbox
          isChecked={waterPump}
          onPress={isChecked => setWaterPump(isChecked)}
          textStyle={styles.checkboxText}
          style={styles.checkbox}
          fillColor="#be289d"
          text="워터펌프가 작동을 안해요"
        />
        <BouncyCheckbox
          isChecked={indicator}
          onPress={isChecked => setIndicator(isChecked)}
          textStyle={styles.checkboxText}
          style={styles.checkbox}
          fillColor="#be289d"
          text="신호등이 안 나와요"
        />
        <BouncyCheckbox
          isChecked={device}
          onPress={isChecked => setDevice(isChecked)}
          textStyle={styles.checkboxText}
          style={styles.checkbox}
          fillColor="#be289d"
          text="기기가 응답을 안해요"
        />
      </View>
      <View style={styles.ETCContainer}>
        <Text style={styles.ETCLabel}>기타:</Text>
        <TextInput
          multiline
          style={styles.ETCInput}
          placeholder="30자 이내로 입력하세요"
          placeholderTextColor="#999"
          value={ETC}
          onChangeText={text => setETC(text)}
          maxLength={30}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitFeedback}>
        <Text style={styles.submitButtonText}>제출하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 22,
    textDecorationLine: 'none', // 텍스트에 밑줄 없애기
    color: '#fff',
  },
  checkbox: {
    marginBottom: 30, // 체크박스 간격 조절
  },
  ETCContainer: {
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ETCLabel: {
    fontSize: 18,
    marginRight: 10,
    color: '#fff',
  },
  ETCInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#be289d',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FeedbackScreen;
