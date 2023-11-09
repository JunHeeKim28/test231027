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
          1. 메인 화면에서 [칵테일 제조] 버튼을 누릅니다.
        </Text>
        <Text style={styles.text3}>
          2. [챗봇으로 제조하기], [직접 제조하기]버튼 중에서 칵테일을 제조할
          방법을 고릅니다.
        </Text>
        <Text style={styles.text3}>
          3.[챗봇으로 제조하기]를 고르면 챗봇과 대화하며 이용자의 기분을 살펴
          칵테일을 추천하여 만들어줍니다.
        </Text>
        <Text style={styles.text3}>
          4. [직접 제조하기]를 고르면 메이커에 넣은 술의 용량을 골라서 칵테일을
          직접 만들 수 있습니다.
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
