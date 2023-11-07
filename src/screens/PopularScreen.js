import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PopularScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>실시간 인기 칵테일</Text>
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

export default PopularScreen;
