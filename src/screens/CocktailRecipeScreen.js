import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Modal} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CocktailRecipeScreen = () => {
  const [rumType, setRumType] = useState('');
  const [rumAmount, setRumAmount] = useState('');
  const [ginType, setGinType] = useState('');
  const [ginAmount, setGinAmount] = useState('');
  const [beerType, setBeerType] = useState('');
  const [beerAmount, setBeerAmount] = useState('');
  const [juiceType, setJuiceType] = useState('');
  const [juiceAmount, setJuiceAmount] = useState('');
  const [recipeList, setRecipeList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const STORAGE_KEY = 'cocktailRecipes';

  useEffect(() => {
    loadRecipesFromStorage();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveRecipe = async () => {
    if (
      rumType === '' ||
      rumAmount === '' ||
      ginType === '' ||
      ginAmount === '' ||
      beerType === '' ||
      beerAmount === '' ||
      juiceType === '' ||
      juiceAmount === ''
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const newRecipe = {
      rum: rumType,
      rumAmount: rumAmount,
      gin: ginType,
      ginAmount: ginAmount,
      beer: beerType,
      beerAmount: beerAmount,
      juice: juiceType,
      juiceAmount: juiceAmount,
    };

    setRecipeList([...recipeList, newRecipe]);
    saveRecipesToStorage([...recipeList, newRecipe]);
    toggleModal();
  };

  const loadRecipesFromStorage = async () => {
    try {
      const savedRecipesJSON = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedRecipesJSON !== null) {
        const savedRecipes = JSON.parse(savedRecipesJSON);
        setRecipeList(savedRecipes);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveRecipesToStorage = async recipes => {
    try {
      const recipesJSON = JSON.stringify(recipes);
      await AsyncStorage.setItem(STORAGE_KEY, recipesJSON);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recipeListTitle}>Saved Recipes:</Text>
      <View>
        {recipeList.map((recipe, index) => (
          <Text key={index} style={styles.recipeItem}>
            {`Recipe ${index + 1}: Rum - ${recipe.rum}, Gin - ${
              recipe.gin
            }, Beer - ${recipe.beer}, Juice - ${recipe.juice}`}
          </Text>
        ))}
      </View>
      <Button title="추가" onPress={toggleModal} />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text>럼:</Text>
          <Picker
            selectedValue={rumType}
            onValueChange={value => setRumType(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item label="화이트 럼" value="화이트 럼" />
            <Picker.Item label="골드 럼" value="골드 럼" />
            {/* 다른 럼 종류 추가 */}
          </Picker>
          <Picker
            selectedValue={rumAmount}
            onValueChange={value => setRumAmount(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="30ml" value="30ml" />
            <Picker.Item label="60ml" value="60ml" />
            {/* 다른 럼 용량 추가 */}
          </Picker>

          <Text>진:</Text>
          <Picker
            selectedValue={ginType}
            onValueChange={value => setGinType(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item label="진" value="진" />
            <Picker.Item label="핸드릭스" value="핸드릭스" />
            {/* 다른 진 종류 추가 */}
          </Picker>
          <Picker
            selectedValue={ginAmount}
            onValueChange={value => setGinAmount(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="30ml" value="30ml" />
            <Picker.Item label="60ml" value="60ml" />
            {/* 다른 진 용량 추가 */}
          </Picker>

          <Text>맥주:</Text>
          <Picker
            selectedValue={beerType}
            onValueChange={value => setBeerType(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item label="카스" value="카스" />
            <Picker.Item label="테라" value="테라" />
            {/* 다른 맥주 종류 추가 */}
          </Picker>
          <Picker
            selectedValue={beerAmount}
            onValueChange={value => setBeerAmount(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="330ml" value="330ml" />
            <Picker.Item label="500ml" value="500ml" />
            {/* 다른 맥주 용량 추가 */}
          </Picker>

          <Text>주스:</Text>
          <Picker
            selectedValue={juiceType}
            onValueChange={value => setJuiceType(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item label="오렌지 주스" value="오렌지 주스" />
            <Picker.Item label="파인애플 주스" value="파인애플 주스" />
            {/* 다른 주스 종류 추가 */}
          </Picker>
          <Picker
            selectedValue={juiceAmount}
            onValueChange={value => setJuiceAmount(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="100ml" value="100ml" />
            <Picker.Item label="200ml" value="200ml" />
            {/* 다른 주스 용량 추가 */}
          </Picker>

          {/* Similar Picker components for Gin, Beer, and Juice */}

          <Button title="Add Recipe" onPress={saveRecipe} />
          <Button title="Cancel" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  recipeListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  recipeItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalContent: {
    width: '80%', // 모달의 너비를 조절할 수 있습니다.
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default CocktailRecipeScreen;
