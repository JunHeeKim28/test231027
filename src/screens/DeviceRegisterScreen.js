import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const DeviceRegisterScreen = () => {
  const navigation = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false); // 중복 스캔 방지를 위한 상태

  const onBarCodeRead = async e => {
    if (isProcessing) return; // 이미 처리 중인 경우 더 이상 진행하지 않음
    setIsProcessing(true); // 처리 시작

    try {
      console.log(e.data);
      const deviceId = e.data.split('/').pop();
      const url = `http://ceprj.gachon.ac.kr:60005/user/getdevice/${deviceId}`;
      const response = await axios.post(url);

      if (response.data.success) {
        Alert.alert('성공', '기기가 성공적으로 등록되었습니다.');
        navigation.navigate('MainScreen');
      } else {
        console.log('서버 오류:', response.data.message);
      }
    } catch (error) {
      console.error('요청 처리 중 오류:', error);
    } finally {
      setIsProcessing(false); // 처리 완료
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera style={styles.preview} onBarCodeRead={onBarCodeRead} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
  },
});

export default DeviceRegisterScreen;
