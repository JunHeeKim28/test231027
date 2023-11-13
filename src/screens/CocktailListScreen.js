import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';
import axios from 'axios';

const FlatListExample = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://ceprj.gachon.ac.kr:60005/user/cocktails',
        );
        setData(response.data.cocktails);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  // 검색된 데이터 필터링
  const filteredData = data.filter(item =>
    item.C_NAME.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.C_NAME}</Text>
      <View style={styles.textContainer}>
        {item.C_ING1 && (
          <Text>
            {item.C_ING1}: {item.C_VOLUME1}
          </Text>
        )}
        {item.C_ING2 && (
          <Text>
            {item.C_ING2}: {item.C_VOLUME2}
          </Text>
        )}
        {item.C_ING3 && (
          <Text>
            {item.C_ING3}: {item.C_VOLUME3}
          </Text>
        )}
        {item.C_ING4 && (
          <Text>
            {item.C_ING4}: {item.C_VOLUME4}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="칵테일 이름 검색..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    fontSize: 18,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 20,
    color: '#000',
  },
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: 'column',
  },
});

export default FlatListExample;
