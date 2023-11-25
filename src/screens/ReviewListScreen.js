//나의리뷰화면<ReviewListScreen.js>
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ReviewListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>나의 리뷰 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#000',
  },
  text1: {
    color: '#be289d',
    fontSize: 24,
  },
});

export default ReviewListScreen;
