import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const DeviceRegisterScreen = () => {
  onBarCodeRead = e => {
    // QR 코드를 스캔했을 때 처리할 로직을 작성
    console.log(e.data);
  };
  return (
    <View style={styles.container}>
      <RNCamera style={styles.preview} onBarCodeRead={this.onBarCodeRead} />
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
