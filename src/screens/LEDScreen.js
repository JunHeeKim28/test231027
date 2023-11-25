import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LEDScreen = () => {
  const [brightness, setBrightness] = useState(0.1);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    // AsyncStorage에서 사용자 ID 가져오기
    AsyncStorage.getItem('userId').then(storedUserId => {
      if (storedUserId) {
        setUserId(storedUserId); // AsyncStorage에서 가져온 userId로 상태 업데이트
      }
    });
  }, []);
  const handleSliderChange = value => {
    setBrightness(value);
  };

  const handleBrightness = async () => {
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
      const raspberryPiIp = ipResponse.data.raspberryPiIp;
      console.log(raspberryPiIp);
      //console.log(requestData);
      const makeResponse = await axios.post(
        `http://${raspberryPiIp}:10000/set_brightness`,
        {brightness: brightness},
      );
      console.log(makeResponse);
      console.log('Success', makeResponse.data);
    } catch (error) {
      console.error('Error', error);
      Alert.alert('오류', error.message);
    }
  };
  const handleRainbow = async () => {
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
      const raspberryPiIp = ipResponse.data.raspberryPiIp;
      console.log(raspberryPiIp);
      //console.log(requestData);
      const makeResponse = await axios.post(
        `http://${raspberryPiIp}:10000/rainbow`,
      );
    } catch (error) {
      console.error('Error', error);
      Alert.alert('오류', error.message);
    }
  };
  const handleBreathing = async () => {
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
      const raspberryPiIp = ipResponse.data.raspberryPiIp;
      console.log(raspberryPiIp);
      //console.log(requestData);
      const makeResponse = await axios.post(
        `http://${raspberryPiIp}:10000/breathing`,
      );
    } catch (error) {
      console.error('Error', error);
      Alert.alert('오류', error.message);
    }
  };
  const handleChasing = async () => {
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
      const raspberryPiIp = ipResponse.data.raspberryPiIp;
      console.log(raspberryPiIp);
      //console.log(requestData);
      const makeResponse = await axios.post(
        `http://${raspberryPiIp}:10000/Chasing`,
      );
    } catch (error) {
      console.error('Error', error);
      Alert.alert('오류', error.message);
    }
  };
  const handleSparkle = async () => {
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
      const raspberryPiIp = ipResponse.data.raspberryPiIp;
      console.log(raspberryPiIp);
      //console.log(requestData);
      const makeResponse = await axios.post(
        `http://${raspberryPiIp}:10000/Sparkle`,
      );
    } catch (error) {
      console.error('Error', error);
      Alert.alert('오류', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LED 밝기</Text>
      <Slider
        style={styles.slider}
        value={brightness}
        minimumValue={0.1}
        maximumValue={1}
        step={0.1}
        onValueChange={handleSliderChange}
        thumbTintColor="#be289d" // 엄지손톱 색상 변경
        minimumTrackTintColor="#be289d" // 트랙의 최소 값 색상 변경
        maximumTrackTintColor="#be289d" // 트랙의 최대 값 색상 변경
      />
      <Text style={styles.valueText}>{brightness.toFixed(1)}</Text>
      <TouchableOpacity onPress={handleBrightness} style={styles.brightness}>
        <Text style={styles.btnTxt}>밝기</Text>
      </TouchableOpacity>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleRainbow}>
          <Text style={styles.btnTxt}>무지개</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleBreathing}>
          <Text style={styles.btnTxt}>브리딩</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleChasing}>
          <Text style={styles.btnTxt}>채이싱</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleSparkle}>
          <Text style={styles.btnTxt}>스파클</Text>
        </TouchableOpacity>
      </View>
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
  btnContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
  },
  slider: {
    width: '80%',
    marginBottom: 10,
  },
  valueText: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  brightness: {
    backgroundColor: '#be289d',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    height: 50,
    width: 100,
    marginBottom: 80,
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    //justifyContent: 'center',
    //alignContent: 'center',
  },
  btn: {
    backgroundColor: '#be289d',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    height: 60,
    width: 120,
    marginBottom: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default LEDScreen;
