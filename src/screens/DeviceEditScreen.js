import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DeviceEditScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>기기 정보 수정하기</Text>
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
  text1: {
    color: 'lightblue',
    fontSize: 24,
  },
});

export default DeviceEditScreen;
