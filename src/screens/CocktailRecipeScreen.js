//CocktailRecipeScreen.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
  const [isSave, setIsSave] = useState(false);
  const STORAGE_KEY = 'cocktailRecipes';
  const UserID = 'KimJH128';
  useEffect(() => {
    loadRecipesFromStorage();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //레시피 저장
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
      Alert.alert('저장 안됨', '항목을 다 채워주세요.');
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
    axios
      .post('http://ceprj.gachon.ac.kr:60005/recipes', newRecipe)
      .then(response => {
        const recipeID = response.data; // 서버로부터 받은 레시피 데이터 (포함된 ID 확인)
        console.log('Save successful', recipeID);
        setIsSave(true);
        setRecipeList([...recipeList, newRecipe]); //레시피 목록에 새로운 레시피 추가
        saveRecipesToStorage([...recipeList, newRecipe]); //로컬 스토리지에 업데이트된 레시피 목록 저장
        toggleModal(); //모달 열고 닫기
      })
      .catch(error => {
        console.error('Save error', error);
      });
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

  //레시피 삭제
  const deleteRecipe = async recipeID => {
    try {
      await axios.delete(`http://ceprj.gachon.ac.kr:60005/recipes/${recipeID}`);
      console.log(`RecipeID ${recipeID} deleted successfully`);
      const updatedRecipeList = recipeList.filter(
        recipe => recipe.id !== recipeID,
      );
      setRecipeList(updatedRecipeList);
      saveRecipesToStorage(updatedRecipeList);
    } catch (error) {
      console.error(`Error deleting recipeID ${recipeID}:`, error);
    }
  };

  const makeRecipe = recipe => {
    // axios.get('http://ceprjmaker.iptime.org:10000/').then(response => {
    //   console.log(response.data);
    // });

    // 레시피에 필요한 정보 추출
    const {
      UserID,
      title,
      rum,
      rumAmount,
      gin,
      ginAmount,
      beer,
      beerAmount,
      juice,
      juiceAmount,
    } = recipe;

    // 함수를 통해 "ml"을 제거하고 숫자만 추출, 10진수
    const extractNumber = str => parseInt(str.replace('ml', ''), 10);

    // 서버로 보낼 데이터 객체 생성
    const recipeData = {
      UserID: 'idonknow',
      cotail_name: title,
      first: extractNumber(rumAmount),
      second: extractNumber(ginAmount),
      third: extractNumber(beerAmount),
      fourth: extractNumber(juiceAmount),
    };
    // 클라이언트 측에서 데이터를 로그에 출력
    console.log('Sending data to server:', recipeData);
    // 서버로 제조 요청을 보내는 부분
    axios
      .post(
        `http://ceprjmaker.iptime.org:10000/make_cocktail/${UserID}/${title}/${extractNumber(
          rumAmount,
        )}/${extractNumber(ginAmount)}/${extractNumber(
          beerAmount,
        )}/${extractNumber(juiceAmount)}`,
        recipeData,
      )
      .then(response => {
        console.log('Make successful', response.data);
        // 서버로 제조 요청을 보내는 부분
        console.log('Sending data to server:', recipeData);
        // 제조 성공에 대한 처리를 여기에 추가할 수 있어
      })
      .catch(error => {
        console.error('Make error', error);
        // 제조 실패에 대한 처리를 여기에 추가할 수 있어
      });
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
            <Picker.Item label="0ml" value="0" />
            <Picker.Item label="15ml" value="15" />
            <Picker.Item label="30ml" value="30" />
            <Picker.Item label="45ml" value="45" />
            <Picker.Item label="60ml" value="60" />
            <Picker.Item label="75ml" value="75" />
            <Picker.Item label="90ml" value="90" />
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
            <Picker.Item label="0ml" value="0" />
            <Picker.Item label="15ml" value="15" />
            <Picker.Item label="30ml" value="30" />
            <Picker.Item label="45ml" value="45" />
            <Picker.Item label="60ml" value="60" />
            <Picker.Item label="75ml" value="75" />
            <Picker.Item label="90ml" value="90" />
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
            <Picker.Item label="0ml" value="0" />
            <Picker.Item label="15ml" value="15" />
            <Picker.Item label="30ml" value="30" />
            <Picker.Item label="45ml" value="45" />
            <Picker.Item label="60ml" value="60" />
            <Picker.Item label="75ml" value="75" />
            <Picker.Item label="90ml" value="90" />
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
            <Picker.Item label="0ml" value="0" />
            <Picker.Item label="15ml" value="15" />
            <Picker.Item label="30ml" value="30" />
            <Picker.Item label="45ml" value="45" />
            <Picker.Item label="60ml" value="60" />
            <Picker.Item label="75ml" value="75" />
            <Picker.Item label="90ml" value="90" />
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
