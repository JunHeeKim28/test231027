import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';

const InfoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text1}>
          칵테일은 &lt;챗봇과 대화하기&gt;, &lt;직접 고르기&gt;가 있어요!
        </Text>
        <Image source={require('../../assets/RBtn1.png')} />
        <Text style={styles.text2}>
          먼저, 메인 화면에 있는 [기기 등록] 버튼을 눌러서 기기 등록을 해야
          합니다.
        </Text>
        <Image source={require('../../assets/CMBtn1.png')} />
        <Text style={styles.text3}>
          1. 메인 화면에서 [칵테일 제조] 버튼을 누릅니다. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text1: {
    fontSize: 25,
    color: 'lightblue',
    marginBottom: 30,
  },
  text2: {
    fontSize: 25,
    color: 'lightblue',
    marginBottom: 10,
    marginTop: 30,
  },
  text3: {
    fontSize: 25,
    color: 'lightblue',
    marginBottom: 10,
    marginTop: 30,
  },
});

export default InfoScreen;
