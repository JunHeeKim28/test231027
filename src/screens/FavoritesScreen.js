import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useFavorites} from './FavoritesContext';
import {useState} from 'react';

const FavoritesScreen = () => {
  const route = useRoute();
  const selectedItem = route.params ? route.params.selectedItem : null;
  const {favorites} = useFavorites();
  const [selectedFav, setSelectedFav] = useState(null);
  const handleFavoritePress = item => {};

  return (
    <View>
      {selectedItem ? (
        <View>
          <Text>Selected Item: {selectedItem.title}</Text>
        </View>
      ) : null}
      {favorites.length > 0 ? (
        favorites.map(item => (
          <TouchableOpacity key={item.id} style={styles.favoriteItem}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No favorites yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    //marginVertical: 5,
  },
});

export default FavoritesScreen;
