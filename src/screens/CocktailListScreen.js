import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput, Image} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // 이 부분을 추가
import StarRating from './StarRating';

const CocktailListScreen = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const serverUrl = 'http://ceprj.gachon.ac.kr:60005'; // 서버의 기본 URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/user/cocktails`);
        setData(response.data.cocktails);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);
  const StarRating = ({rating}) => {
    // 5개의 별 중에서 몇 개가 채워져야 하는지 계산
    const filledStars = Math.floor(rating);
    const maxStars = Array(5 - filledStars).fill('star-o');
    const filledStarsArray = Array(filledStars).fill('star');

    return (
      <View style={styles.starRatingContainer}>
        {filledStarsArray.map((type, index) => (
          <Icon key={`filled-star-${index}`} name={type} style={styles.star} />
        ))}
        {maxStars.map((type, index) => (
          <Icon
            key={`unfilled-star-${index}`}
            name={type}
            style={styles.star}
          />
        ))}
      </View>
    );
  };

  const filteredData = data.filter(item =>
    item.C_NAME.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const renderItem = ({item}) => {
    // 서버 URL을 확인하고 상대 경로를 완전한 URL로 변환합니다.
    const imageUrl = item.C_IMG.startsWith('http')
      ? item.C_IMG
      : `${serverUrl}${item.C_IMG}`;
    return (
      <View style={styles.itemContainer}>
        <Image source={{uri: imageUrl}} style={styles.imageStyle} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.C_NAME}</Text>
          <StarRating rating={item.C_AVGRATING} />
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
  };

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
        keyExtractor={item => item.C_ID.toString()} // 문자열로 반환하도록 확실히 합니다
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row', // 이 부분이 중요합니다
    alignItems: 'center',
  },
  star: {
    color: '#ffd700',
    fontSize: 16,
  },
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
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 20,
    color: '#000',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default CocktailListScreen;
