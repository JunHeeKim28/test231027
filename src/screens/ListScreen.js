import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const ListScreen = ({route}) => {
  // route.params가 undefined인 경우를 방지하기 위해 초기값 설정
  const {responseData} = route.params || {};
  // 상태를 설정하고, 초기값은 빈 배열로 설정
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // responseData가 존재하는 경우에만 처리
    if (responseData && responseData.recipeTitle && responseData.date) {
      // responseData에서 필요한 속성만 추출하여 새로운 이용내역을 생성
      const newTransaction = {
        recipeTitle: responseData.recipeTitle,
        date: responseData.date,
      };
      // 새로운 이용내역이 추가될 때마다 상태 업데이트
      setHistory(prevHistory => [...prevHistory, newTransaction]);
    }
  }, [responseData]);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.recipeTitle}</Text>
      <Text style={styles.date}>제조 날짜: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: 'lightpink',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    color: '#000',
  },
});
export default ListScreen;
