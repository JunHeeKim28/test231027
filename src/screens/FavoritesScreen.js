//이주 성공 CocktailRecipeScreen.js
import {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CocktailRecipeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [ingredients, setIngredients] = useState({});
  const [recipeList, setRecipeList] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState('');
  const STORAGE_KEY = 'cocktailRecipes';

  useEffect(() => {
    loadRecipesFromStorage();
  }, []);

  // AsyncStorage에서 저장된 레시피 불러오기
  const loadRecipesFromStorage = async () => {
    try {
      //저장되어있지 않을때
      const savedRecipesJSON = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedRecipesJSON !== null) {
        const savedRecipes = JSON.parse(savedRecipesJSON);
        setRecipeList(savedRecipes);
      }
    } catch (error) {
      console.error('데이터 로딩 오류:', error);
    }
  };

  // AsyncStorage에 레시피 저장
  const saveRecipesToStorage = async recipes => {
    try {
      const recipesJSON = JSON.stringify(recipes);
      await AsyncStorage.setItem(STORAGE_KEY, recipesJSON);
    } catch (error) {
      console.error('데이터 저장 오류:', error);
    }
  };

  const toggleModal = () => {
    setIngredients({
      위스키: '0ml',
      레몬주스: '0ml',
      자몽주스: '0ml',
      라임주스: '0ml',
    });
    setRecipeTitle(''); // 레시피 제목 초기화
    setModalVisible(!isModalVisible);
  };

  const addIngredient = (ingredient, amount) => {
    setIngredients({...ingredients, [ingredient]: amount});
  };

  const saveRecipe = () => {
    const newRecipe = {
      title: recipeTitle, // 레시피 제목
      //description: recipeDescription, // 레시피 설명
      ...ingredients,
    };
    const updatedRecipes = [...recipeList, newRecipe];
    setRecipeList(updatedRecipes);
    saveRecipesToStorage(updatedRecipes);
    setModalVisible(false);
  };

  const deleteRecipe = index => {
    Alert.alert(
      '레시피 삭제',
      '선택한 레시피를 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            const updatedRecipes = [...recipeList];
            updatedRecipes.splice(index, 1); // 선택한 레시피 삭제
            setRecipeList(updatedRecipes);
            saveRecipesToStorage(updatedRecipes);
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView style={{marginTop: 130}}>
            <Text style={styles.recipeTitleLabel}>레시피 제목:</Text>
            <TextInput
              style={styles.recipeTitleInput}
              value={recipeTitle}
              onChangeText={text => setRecipeTitle(text)}
              placeholder="레시피 제목을 입력하세요"
            />
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>위스키 :</Text>
              <Picker
                selectedValue={ingredients.위스키}
                onValueChange={itemValue => addIngredient('위스키', itemValue)}
                style={styles.picker}>
                <Picker.Item label="0ml" value="0ml" />
                <Picker.Item label="15ml" value="15ml" />
                <Picker.Item label="30ml" value="30ml" />
                <Picker.Item label="45ml" value="45ml" />
                <Picker.Item label="60ml" value="60ml" />
                <Picker.Item label="75ml" value="75ml" />
                <Picker.Item label="90ml" value="90ml" />
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>레몬주스:</Text>
              <Picker
                selectedValue={ingredients.레몬주스}
                onValueChange={itemValue =>
                  addIngredient('레몬주스', itemValue)
                }
                style={styles.picker}>
                <Picker.Item label="0ml" value="0ml" />
                <Picker.Item label="15ml" value="15ml" />
                <Picker.Item label="30ml" value="30ml" />
                <Picker.Item label="45ml" value="45ml" />
                <Picker.Item label="60ml" value="60ml" />
                <Picker.Item label="75ml" value="75ml" />
                <Picker.Item label="90ml" value="90ml" />
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>자몽주스:</Text>
              <Picker
                selectedValue={ingredients.자몽주스}
                onValueChange={itemValue =>
                  addIngredient('자몽주스', itemValue)
                }
                style={styles.picker}>
                <Picker.Item label="0ml" value="0ml" />
                <Picker.Item label="15ml" value="15ml" />
                <Picker.Item label="30ml" value="30ml" />
                <Picker.Item label="45ml" value="45ml" />
                <Picker.Item label="60ml" value="60ml" />
                <Picker.Item label="75ml" value="75ml" />
                <Picker.Item label="90ml" value="90ml" />
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>라임주스:</Text>
              <Picker
                selectedValue={ingredients.라임주스}
                onValueChange={itemValue =>
                  addIngredient('라임주스', itemValue)
                }
                style={styles.picker}>
                <Picker.Item label="0ml" value="0ml" />
                <Picker.Item label="15ml" value="15ml" />
                <Picker.Item label="30ml" value="30ml" />
                <Picker.Item label="45ml" value="45ml" />
                <Picker.Item label="60ml" value="60ml" />
                <Picker.Item label="75ml" value="75ml" />
                <Picker.Item label="90ml" value="90ml" />
              </Picker>
            </View>
            {/* <Text style={styles.recipeDescriptionLabel}>레시피 설명:</Text>
            <TextInput
              style={styles.recipeDescriptionInput}
              value={recipeDescription}
              onChangeText={(text) => setRecipeDescription(text)}
              placeholder="레시피 설명을 입력하세요"
            /> */}
            <Button title="재료 저장" onPress={saveRecipe} />
            <Button title="닫기" onPress={toggleModal} />
          </ScrollView>
        </View>
      </Modal>

      <ScrollView>
        {recipeList.map((recipe, index) => (
          <View key={index} style={styles.recipeItem}>
            {/* 삭제 버튼 */}
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => deleteRecipe(index)}
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.makeButton}>
                <Text style={styles.deleteButtonText}>제조</Text>
              </TouchableOpacity>
            </View>

            {/* 레시피 제목 */}
            <Text style={styles.recipeTitle}>제목: {recipe.title}</Text>

            {/* 레시피 용량 */}
            <View style={styles.recipeContent}>
              {/* <Text style={styles.recipeSubtitle}>용량:</Text> */}
              {Object.keys(recipe).map(ingredient => {
                if (ingredient !== 'title' && recipe[ingredient] !== '0ml') {
                  return (
                    <Text key={ingredient} style={styles.recipeTxt}>
                      {`${ingredient}: ${recipe[ingredient]}`}
                    </Text>
                  );
                } else {
                  return null;
                }
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      {/*레시피추가 버튼*/}
      <TouchableOpacity style={styles.addBtn} onPress={toggleModal}>
        <Text style={styles.addBtnTxt}>레시피 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  addBtn: {
    backgroundColor: 'lightblue',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnTxt: {color: 'white'},
  btnContainer: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pickerContainer: {
    //pickerLabel: + 용량선택 드롭다운
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  pickerLabel: {
    //위스키:, 레몬주스: ,등등
    marginRight: 10,
    fontSize: 20,
  },
  picker: {
    width: 150,
    height: 40,
  },
  recipeTitle: {
    //제목:
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recipeTxt: {
    fontSize: 18,
    marginTop: 5,
  },
  recipeContent: {
    marginLeft: 20,
  },
  recipeItem: {
    alignItems: 'center',
    marginVertical: 10,
  },
  recipeSubtitle: {},
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  makeButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
  recipeTitleLabel: {
    //모달창 레시피제목:
    fontSize: 20,
    marginVertical: 10,
  },
  recipeTitleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
