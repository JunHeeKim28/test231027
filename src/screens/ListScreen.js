import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
//import FavoritesScreen from './FavoritesScreen';
import {useNavigation} from '@react-navigation/native';
import {useFavorites} from './FavoritesContext';

const ListScreen = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const {addFavorite} = useFavorites();
  const [data, setData] = useState([
    {id: '1', title: '레시피 1'},
    {id: '2', title: '레시피 2'},
    {id: '3', title: '레시피 3'},
    {id: '4', title: '레시피 4'},
    {id: '5', title: '레시피 5'},
    {id: '6', title: '레시피 6'},
    {id: '7', title: '레시피 7'},
  ]);

  const handleItemPress = item => {
    if (selectedItem === item) {
      // 이미 선택한 아이템을 다시 누르면 선택 해제
      setSelectedItem(null);
    } else {
      // 다른 아이템을 선택하면 해당 아이템 저장
      setSelectedItem(item);
    }
    //setSelectedItem(item);
  };

  const makeCocktail = () => {};
  const deleteCocktail = () => {
    if (selectedItem) {
      const updatedData = data.filter(item => item.id !== selectedItem.id);
      setData(updatedData);
      setSelectedItem(null);
    }
  };

  const registerFavorites = () => {
    if (selectedItem) {
      addFavorite(selectedItem);
      setSelectedItem(null);
    }
  };

  const survey = () => {};
  const cocktailReview = () => {};

  return (
    <View style={{flex: 1}}>
      {data.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleItemPress(item)}
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            backgroundColor: selectedItem === item ? 'lightblue' : 'white',
          }}>
          <Text style={styles.txt}>{item.title}</Text>
          {selectedItem === item && (
            <View style={styles.btns}>
              <TouchableOpacity onPress={makeCocktail}>
                <Text style={styles.txtBtn}>제조</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteCocktail}>
                <Text style={styles.txtBtn}>삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={registerFavorites}>
                <Text style={styles.txtBtn}>즐겨찾기 등록</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={survey}>
                <Text style={styles.txtBtn}>만족도조사</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cocktailReview}>
                <Text style={styles.txtBtn}>칵테일리뷰</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  txt: {
    //color: 'lightblue',
    fontSize: 20,
  },
  txtBtn: {
    //color: '#be289d',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});
export default ListScreen;
