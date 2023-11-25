//ListScreen.js 이용내역 화면
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ListScreen = () => {
  const [myHistoryList, setMyHistoryList] = useState([]);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(storedUserId => {
      if (storedUserId) {
        setUserId(storedUserId);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'http://ceprj.gachon.ac.kr:60005/user/history',
          {ID: userId},
        );
        setMyHistoryList(response.data.data.useLogs);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const deleteItem = async itemId => {
    // 삭제 기능 구현
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{item.USE_NAME}</Text>
        <Text style={styles.itemText}>{item.USE_DATE}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={() => deleteItem(item.USE_ID)}>
        <Text style={styles.deleteButton}>삭제</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#be289d" />
      ) : (
        <FlatList
          data={myHistoryList}
          keyExtractor={item => item.USE_ID.toString()}
          renderItem={renderItem}
        />
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomColor: '#ccc',
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
  },
  deleteContainer: {
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#be289d',
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  deleteButton: {
    //marginLeft: 'auto',
    color: '#fff',
  },
});

export default ListScreen;
