import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PopularScreen = ({navigation}) => {
  const dataToSend = '이 데이터를 FavoritesScreen으로 전달하려고 합니다.';

  const navigateToFavorites = () => {
    navigation.navigate('Favorites', {data: dataToSend});
  };

  return (
    <View>
      <Text>Popular Screen</Text>
      <Button title="이동" onPress={navigateToFavorites} />
    </View>
  );
};

export default PopularScreen;
