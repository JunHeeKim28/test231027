import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';

const CocktailRatingScreen = () => {
  const [cocktailRatings, setCocktailRatings] = useState({
    모히또: 0,
    깔루아: 0,
    하이볼: 0,
    // ... 다른 칵테일들도 필요에 따라 추가
  });

  const rateCocktail = (cocktailName, rating) => {
    setCocktailRatings(prevRatings => ({
      ...prevRatings,
      [cocktailName]: rating,
    }));
  };

  // FlatList에 사용될 데이터 배열
  const cocktailData = [
    {id: '1', name: '모히또'},
    {id: '2', name: '깔루아'},
    {id: '3', name: '하이이이볼'},
    // ... 다른 칵테일들도 필요에 따라 추가
  ];

  const renderItem = ({item}) => {
    const cocktailName = item.name;

    return (
      <View style={{marginVertical: 10}}>
        <Text>{cocktailName}</Text>
        {cocktailRatings[cocktailName] === 0 ? (
          <TouchableOpacity onPress={() => rateCocktail(cocktailName, 1)}>
            <Text>별점 매기기</Text>
          </TouchableOpacity>
        ) : (
          <StarRating
            disabled={true}
            maxStars={5}
            rating={cocktailRatings[cocktailName]}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        data={cocktailData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CocktailRatingScreen;
