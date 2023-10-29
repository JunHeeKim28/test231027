import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import BleManager from 'react-native-ble-manager';

const RaspberryPiBluetoothScreen = () => {
  const [isConnected, setIsConnected] = useState(false);

  const raspberryPiAddress = 'D8:3A:DD:1E:A8:72'; // Raspberry Pi의 Bluetooth 주소
  const port = 1; // RFCOMM 포트 번호

  const connectToRaspberryPi = async () => {
    try {
      const connected = await BleManager.connect(raspberryPiAddress, port);
      if (connected) {
        setIsConnected(true);
      } else {
        console.error('Connection error1');
      }
    } catch (error) {
      console.error('Connection error2', error);
    }
  };

  return (
    <View>
      <Text>Connected to Raspberry Pi: {isConnected ? 'Yes' : 'No'}</Text>
      <Button
        title="Connect to Raspberry Pi"
        onPress={connectToRaspberryPi}
        disabled={isConnected}
      />
    </View>
  );
};

export default RaspberryPiBluetoothScreen;
