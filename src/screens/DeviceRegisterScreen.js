import React, {useState} from 'react';
import {StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const DeviceRegisterScreen = () => {
  const navigation = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false);

  const onReadQRCode = async ({data}) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      console.log(data);
      const deviceId = data.split('/').pop();
      const url = `http://ceprj.gachon.ac.kr:60005/user/getdevice/${deviceId}`;
      const response = await axios.post(url);

      if (response.data.success) {
        Alert.alert('성공', '기기가 성공적으로 등록되었습니다.');
        navigation.navigate('Main');
      } else {
        console.log('서버 오류:', response.data.message);
      }
    } catch (error) {
      console.error('요청 처리 중 오류:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <QRCodeScanner
      onRead={onReadQRCode}
      topContent={
        <Text style={styles.centerText}>
          기기의 QR 코드를 스캔하여 등록하세요.
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default DeviceRegisterScreen;
