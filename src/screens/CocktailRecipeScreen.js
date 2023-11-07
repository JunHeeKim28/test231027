import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CocktailRecipeScreen = () => {
  const [recipeTitle, setRecipeTitle] = useState('');
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
      recipeTitle === '' ||
      rumType === '' ||
      rumAmount === '' ||
      ginType === '' ||
      ginAmount === '' ||
      beerType === '' ||
      beerAmount === '' ||
      juiceType === '' ||
      juiceAmount === ''
    ) {
      alert('항목을 다 채워주세요.');
      return;
    }

    const newRecipe = {
      title: recipeTitle,
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

  const deleteRecipe = index => {
    const updatedRecipeList = [...recipeList];
    updatedRecipeList.splice(index, 1);
    setRecipeList(updatedRecipeList);
    saveRecipesToStorage(updatedRecipeList);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={toggleModal}>
        <Text style={styles.addBtnTxt}>추가</Text>
      </TouchableOpacity>
      <Text style={styles.recipeListTitle}>칵테일 레시피:</Text>

      <View>
        {recipeList.map((recipe, index) => (
          <View key={index} style={styles.recipeItemContainer}>
            <Text style={styles.recipeItem}>
              {` ${recipe.title || 'Untitled Recipe'}:  ${recipe.rum} ${
                recipe.rumAmount
              }, ${recipe.gin} ${recipe.ginAmount}, ${recipe.beer} ${
                recipe.beerAmount
              }, ${recipe.juice} ${recipe.juiceAmount}`}
            </Text>
            <View style={styles.recipeItemBtns}>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteRecipe(index)}>
                <Text style={styles.deleteBtnTxt}>삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.makeBtn}
                onPress={() => makeRecipe(recipe)}>
                <Text style={styles.makeBtnTxt}>제조</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.title}>제목:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="레시피 제목을 입력하세요"
            value={recipeTitle}
            onChangeText={text => setRecipeTitle(text)}
          />
          <Text>럼:</Text>
          <Picker
            selectedValue={rumType}
            onValueChange={value => setRumType(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item label="화이트 럼" value="화이트 럼" />
            <Picker.Item label="골드 럼" value="골드 럼" />
          </Picker>
          <Picker
            selectedValue={rumAmount}
            onValueChange={value => setRumAmount(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="0ml" value="0ml" />
            <Picker.Item label="15ml" value="15ml" />
            <Picker.Item label="30ml" value="30ml" />
            <Picker.Item label="45ml" value="45ml" />
            <Picker.Item label="60ml" value="60ml" />
            <Picker.Item label="75ml" value="75ml" />
            <Picker.Item label="90ml" value="90ml" />
          </Picker>

          <Text>진:</Text>
          <Picker
            selectedValue={ginType}
            onValueChange={value => setGinType(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item label="진" value="진" />
            <Picker.Item label="드라이 진" value="드라이 진" />
          </Picker>
          <Picker
            selectedValue={ginAmount}
            onValueChange={value => setGinAmount(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="0ml" value="0ml" />
            <Picker.Item label="15ml" value="15ml" />
            <Picker.Item label="30ml" value="30ml" />
            <Picker.Item label="45ml" value="45ml" />
            <Picker.Item label="60ml" value="60ml" />
            <Picker.Item label="75ml" value="75ml" />
            <Picker.Item label="90ml" value="90ml" />
          </Picker>

          <Text>맥주:</Text>
          <Picker
            selectedValue={beerType}
            onValueChange={value => setBeerType(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item label="카스" value="카스" />
            <Picker.Item label="테라" value="테라" />
          </Picker>
          <Picker
            selectedValue={beerAmount}
            onValueChange={value => setBeerAmount(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="0ml" value="0ml" />
            <Picker.Item label="15ml" value="15ml" />
            <Picker.Item label="30ml" value="30ml" />
            <Picker.Item label="45ml" value="45ml" />
            <Picker.Item label="60ml" value="60ml" />
            <Picker.Item label="75ml" value="75ml" />
            <Picker.Item label="90ml" value="90ml" />
          </Picker>

          <Text>주스:</Text>
          <Picker
            selectedValue={juiceType}
            onValueChange={value => setJuiceType(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item label="오렌지 주스" value="오렌지 주스" />
            <Picker.Item label="파인애플 주스" value="파인애플 주스" />
            <Picker.Item label="레몬 주스" value="레몬 주스" />
            <Picker.Item label="자몽 주스" value="자몽 주스" />
            <Picker.Item label="코코넛 주스" value="코코넛 주스" />
          </Picker>
          <Picker
            selectedValue={juiceAmount}
            onValueChange={value => setJuiceAmount(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="0ml" value="0ml" />
            <Picker.Item label="15ml" value="15ml" />
            <Picker.Item label="30ml" value="30ml" />
            <Picker.Item label="45ml" value="45ml" />
            <Picker.Item label="60ml" value="60ml" />
            <Picker.Item label="75ml" value="75ml" />
            <Picker.Item label="90ml" value="90ml" />
          </Picker>
          <View style={styles.modalBtn}>
            <TouchableOpacity style={styles.save2Btn} onPress={saveRecipe}>
              <Text style={styles.save2BtnTxt}>저장</Text>
            </TouchableOpacity>
            <View style={{width: 10}} />
            <TouchableOpacity style={styles.cancelBtn} onPress={toggleModal}>
              <Text style={styles.cancelBtnTxt}>취소</Text>
            </TouchableOpacity>
          </View>
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
  addBtn: {
    backgroundColor: '#be289d',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnTxt: {
    fontSize: 18,
    color: 'white',
  },
  deleteBtn: {
    backgroundColor: 'orange',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  deleteBtnTxt: {fontSize: 18},
  makeBtn: {
    backgroundColor: 'lightblue',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  makeBtnTxt: {fontSize: 18},
  modalBtn: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  save2Btn: {
    backgroundColor: '#be289d',
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  save2BtnTxt: {fontSize: 16, color: 'white'},
  cancelBtn: {
    backgroundColor: '#be289d',
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  cancelBtnTxt: {fontSize: 16, color: 'white'},
  recipeListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },

  recipeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recipeItem: {
    fontSize: 16,
    flex: 1,
  },
  recipeItemBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default CocktailRecipeScreen;
