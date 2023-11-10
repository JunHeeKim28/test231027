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
  const [num1, setNum1] = useState('');
  const [vol1, setVol1] = useState('');
  const [num2, setNum2] = useState('');
  const [vol2, setVol2] = useState('');
  const [num3, setNum3] = useState('');
  const [vol3, setVol3] = useState('');
  const [num4, setNum4] = useState('');
  const [vol4, setVol4] = useState('');
  const [recipeList, setRecipeList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const STORAGE_KEY = 'cocktailRecipes';

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
      num1 === '' ||
      vol1 === '' ||
      num2 === '' ||
      vol2 === '' ||
      num3 === '' ||
      vol3 === '' ||
      num4 === '' ||
      vol4 === ''
    ) {
      Alert.alert('저장 안됨', '항목을 다 채워주세요.');
      return;
    }

    const newRecipe = {
      title: recipeTitle,
      number1: num1,
      vol1: vol1,
      number2: num2,
      vol2: vol2,
      number3: num3,
      vol3: vol3,
      number4: num4,
      vol4: vol4,
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

  //레시피 제조
  const makeRecipe = recipe => {
    // // 레시피에 필요한 정보 추출
    // const {
    //   UserID,
    //   title,
    //   number1,
    //   vol1,
    //   number2,
    //   vol2,
    //   number3,
    //   vol3,
    //   number4,
    //   vol4,
    // } = recipe;

    // // 서버로 보낼 데이터 객체 생성
    const recipeData = {
      UserID: 'test_name',
      recipeTitle: 'test_recipe',
      first: 30,
      second: 30,
      third: 30,
      fourth: 30,
    };
    // 클라이언트 측에서 데이터를 로그에 출력
    console.log('Sending data to server:', recipeData);
    // 서버로 제조 요청을 보내는 부분
    axios
      .post('http://ceprjmaker.iptime.org:10000/make_cocktail', recipeData)
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
              {` ${recipe.title || 'Untitled Recipe'}:  ${recipe.number1} ${
                recipe.vol1
              }, ${recipe.number2} ${recipe.vol2}, ${recipe.number3} ${
                recipe.vol3
              }, ${recipe.number4} ${recipe.vol4}`}
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
          <Text>1번:</Text>
          <Picker selectedValue={num1} onValueChange={value => setNum1(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item
              label="Almond Flavored Liqueur"
              value="Almond Flavored Liqueur"
            />
            <Picker.Item label="Anejo Cuatro Rum" value="Anejo Cuatro Rum" />
            <Picker.Item label="Apple Cider" value="Apple Cider" />
            <Picker.Item label="Apple Juice" value="Apple Juice" />
            <Picker.Item label="Apricot Brandy" value="Apricot Brandy" />
            <Picker.Item label="Banana Liqueur" value="Banana Liqueur" />
            <Picker.Item
              label="Black Raspberry Liqueur"
              value="Black Raspberry Liqueur"
            />
            <Picker.Item label="Black Rum" value="Black Rum" />
            <Picker.Item label="Blanco Tequila" value="Blanco Tequila" />
            <Picker.Item
              label="Blood Orange Juice"
              value="Blood Orange Juice"
            />
            <Picker.Item label="Blood Orange Soda" value="Blood Orange Soda" />
            <Picker.Item label="Blue Curacao" value="Blue Curacao" />
            <Picker.Item
              label="Blue Curacao Liqueur"
              value="Blue Curacao Liqueur"
            />
            <Picker.Item label="Bourbon Whiskey" value="Bourbon Whiskey" />
            <Picker.Item label="Canadian Whiskey" value="Canadian Whiskey" />
            <Picker.Item label="Champagne" value="Champagne" />
            <Picker.Item
              label="Chartreuse Green Liqueur"
              value="Chartreuse Green Liqueur"
            />
            <Picker.Item label="Cherry Brandy" value="Cherry Brandy" />
            <Picker.Item label="Citrus Syrup" value="Citrus Syrup" />
            <Picker.Item label="Citrus Vodka" value="Citrus Vodka" />
            <Picker.Item label="Club Soda" value="Club Soda" />
            <Picker.Item label="Coconut Rum" value="Coconut Rum" />
            <Picker.Item label="Coconut Water" value="Coconut Water" />
            <Picker.Item
              label="Coffee Flavored Liqueur"
              value="Coffee Flavored Liqueur"
            />
            <Picker.Item label="Coffee Liqueur  " value="Coffee Liqueur  " />
            <Picker.Item label="Cola" value="Cola" />
            <Picker.Item label="Cranberry Juice" value="Cranberry Juice" />
            <Picker.Item label="Cream of Coconut" value="Cream of Coconut" />
            <Picker.Item label="Diet Cola" value="Diet Cola" />
            <Picker.Item label="Dry Gin" value="Dry Gin" />
            <Picker.Item label="Dry Vermouth" value="Dry Vermouth" />
            <Picker.Item
              label="Elderflower Liqueur"
              value="Elderflower Liqueur"
            />
            <Picker.Item label="Espresso" value="Espresso" />
            <Picker.Item label="Gin" value="Gin" />
            <Picker.Item label="Gin Based Liqueur" value="Gin Based Liqueur" />
            <Picker.Item label="Ginger Ale" value="Ginger Ale" />
            <Picker.Item label="Ginger Beer" value="Ginger Beer" />
            <Picker.Item
              label="Ginger Simple Syrup"
              value="Ginger Simple Syrup"
            />
            <Picker.Item label="Gold Rum" value="Gold Rum" />
            <Picker.Item label="Grand Marnier" value="Grand Marnier" />
            <Picker.Item label="Grapefruit Juice" value="Grapefruit Juice" />
            <Picker.Item label="Grenadine Syrup" value="Grenadine Syrup" />
            <Picker.Item label="Honey" value="Honey" />
            <Picker.Item
              label="Honey Ginger Syrup"
              value="Honey Ginger Syrup"
            />
            <Picker.Item label="Honey Syrup" value="Honey Syrup" />
            <Picker.Item label="Irish Whiskey" value="Irish Whiskey" />
            <Picker.Item label="Jamaican Rum" value="Jamaican Rum" />
            <Picker.Item
              label="Lemon Flavored Liqueur"
              value="Lemon Flavored Liqueur"
            />
            <Picker.Item label="Lemon Juice" value="Lemon Juice" />
            <Picker.Item label="Lime Flavored Rum" value="Lime Flavored Rum" />
            <Picker.Item label="Lime Juice" value="Lime Juice" />
            <Picker.Item
              label="Limon Flavored Rum"
              value="Limon Flavored Rum"
            />
            <Picker.Item label="Orange Juice" value="Orange Juice" />
            <Picker.Item label="Original Vodka" value="Original Vodka" />
            <Picker.Item
              label="Peach Flavored Schnapps"
              value="Peach Flavored Schnapps"
            />
            <Picker.Item label="Pineapple Juice" value="Pineapple Juice" />
            <Picker.Item
              label="Raspberry Flavored Liqueur"
              value="Raspberry Flavored Liqueur"
            />
            <Picker.Item label="Red Burgundy Wine" value="Red Burgundy Wine" />
            <Picker.Item label="Rum" value="Rum" />
            <Picker.Item label="Rum Cream Liqueur" value="Rum Cream Liqueur" />
            <Picker.Item label="Scotch Whiskey" value="Scotch Whiskey" />
            <Picker.Item label="Simple Syrup" value="Simple Syrup" />
            <Picker.Item label="Soda Water" value="Soda Water" />
            <Picker.Item label="Sour Mix" value="Sour Mix" />
            <Picker.Item label="Strawberry Syrup" value="Strawberry Syrup" />
            <Picker.Item label="Sweet Vermouth" value="Sweet Vermouth" />
            <Picker.Item label="Tennessee Whiskey" value="Tennessee Whiskey" />
            <Picker.Item label="Toffee Syrup" value="Toffee Syrup" />
            <Picker.Item label="Tomato Juice" value="Tomato Juice" />
            <Picker.Item label="Tonic Water" value="Tonic Water" />
            <Picker.Item label="Triple Sec " value="Triple Sec " />
            <Picker.Item label="Vermouth" value="Vermouth" />
            <Picker.Item label="Vodka" value="Vodka" />
            <Picker.Item
              label="Whiskey Fruit Spice Liqueur"
              value="Whiskey Fruit Spice Liqueur"
            />
            <Picker.Item label="White Rum" value="White Rum" />
          </Picker>
          <Picker selectedValue={vol1} onValueChange={value => setVol1(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="0ml" value={0} />
            <Picker.Item label="15ml" value={15} />
            <Picker.Item label="30ml" value={30} />
            <Picker.Item label="45ml" value={45} />
            <Picker.Item label="60ml" value={60} />
            <Picker.Item label="75ml" value={75} />
            <Picker.Item label="90ml" value={90} />
          </Picker>

          <Text>2번:</Text>
          <Picker selectedValue={num3} onValueChange={value => setNum2(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item
              label="Almond Flavored Liqueur"
              value="Almond Flavored Liqueur"
            />
            <Picker.Item label="Anejo Cuatro Rum" value="Anejo Cuatro Rum" />
            <Picker.Item label="Apple Cider" value="Apple Cider" />
            <Picker.Item label="Apple Juice" value="Apple Juice" />
            <Picker.Item label="Apricot Brandy" value="Apricot Brandy" />
            <Picker.Item label="Banana Liqueur" value="Banana Liqueur" />
            <Picker.Item
              label="Black Raspberry Liqueur"
              value="Black Raspberry Liqueur"
            />
            <Picker.Item label="Black Rum" value="Black Rum" />
            <Picker.Item label="Blanco Tequila" value="Blanco Tequila" />
            <Picker.Item
              label="Blood Orange Juice"
              value="Blood Orange Juice"
            />
            <Picker.Item label="Blood Orange Soda" value="Blood Orange Soda" />
            <Picker.Item label="Blue Curacao" value="Blue Curacao" />
            <Picker.Item
              label="Blue Curacao Liqueur"
              value="Blue Curacao Liqueur"
            />
            <Picker.Item label="Bourbon Whiskey" value="Bourbon Whiskey" />
            <Picker.Item label="Canadian Whiskey" value="Canadian Whiskey" />
            <Picker.Item label="Champagne" value="Champagne" />
            <Picker.Item
              label="Chartreuse Green Liqueur"
              value="Chartreuse Green Liqueur"
            />
            <Picker.Item label="Cherry Brandy" value="Cherry Brandy" />
            <Picker.Item label="Citrus Syrup" value="Citrus Syrup" />
            <Picker.Item label="Citrus Vodka" value="Citrus Vodka" />
            <Picker.Item label="Club Soda" value="Club Soda" />
            <Picker.Item label="Coconut Rum" value="Coconut Rum" />
            <Picker.Item label="Coconut Water" value="Coconut Water" />
            <Picker.Item
              label="Coffee Flavored Liqueur"
              value="Coffee Flavored Liqueur"
            />
            <Picker.Item label="Coffee Liqueur  " value="Coffee Liqueur  " />
            <Picker.Item label="Cola" value="Cola" />
            <Picker.Item label="Cranberry Juice" value="Cranberry Juice" />
            <Picker.Item label="Cream of Coconut" value="Cream of Coconut" />
            <Picker.Item label="Diet Cola" value="Diet Cola" />
            <Picker.Item label="Dry Gin" value="Dry Gin" />
            <Picker.Item label="Dry Vermouth" value="Dry Vermouth" />
            <Picker.Item
              label="Elderflower Liqueur"
              value="Elderflower Liqueur"
            />
            <Picker.Item label="Espresso" value="Espresso" />
            <Picker.Item label="Gin" value="Gin" />
            <Picker.Item label="Gin Based Liqueur" value="Gin Based Liqueur" />
            <Picker.Item label="Ginger Ale" value="Ginger Ale" />
            <Picker.Item label="Ginger Beer" value="Ginger Beer" />
            <Picker.Item
              label="Ginger Simple Syrup"
              value="Ginger Simple Syrup"
            />
            <Picker.Item label="Gold Rum" value="Gold Rum" />
            <Picker.Item label="Grand Marnier" value="Grand Marnier" />
            <Picker.Item label="Grapefruit Juice" value="Grapefruit Juice" />
            <Picker.Item label="Grenadine Syrup" value="Grenadine Syrup" />
            <Picker.Item label="Honey" value="Honey" />
            <Picker.Item
              label="Honey Ginger Syrup"
              value="Honey Ginger Syrup"
            />
            <Picker.Item label="Honey Syrup" value="Honey Syrup" />
            <Picker.Item label="Irish Whiskey" value="Irish Whiskey" />
            <Picker.Item label="Jamaican Rum" value="Jamaican Rum" />
            <Picker.Item
              label="Lemon Flavored Liqueur"
              value="Lemon Flavored Liqueur"
            />
            <Picker.Item label="Lemon Juice" value="Lemon Juice" />
            <Picker.Item label="Lime Flavored Rum" value="Lime Flavored Rum" />
            <Picker.Item label="Lime Juice" value="Lime Juice" />
            <Picker.Item
              label="Limon Flavored Rum"
              value="Limon Flavored Rum"
            />
            <Picker.Item label="Orange Juice" value="Orange Juice" />
            <Picker.Item label="Original Vodka" value="Original Vodka" />
            <Picker.Item
              label="Peach Flavored Schnapps"
              value="Peach Flavored Schnapps"
            />
            <Picker.Item label="Pineapple Juice" value="Pineapple Juice" />
            <Picker.Item
              label="Raspberry Flavored Liqueur"
              value="Raspberry Flavored Liqueur"
            />
            <Picker.Item label="Red Burgundy Wine" value="Red Burgundy Wine" />
            <Picker.Item label="Rum" value="Rum" />
            <Picker.Item label="Rum Cream Liqueur" value="Rum Cream Liqueur" />
            <Picker.Item label="Scotch Whiskey" value="Scotch Whiskey" />
            <Picker.Item label="Simple Syrup" value="Simple Syrup" />
            <Picker.Item label="Soda Water" value="Soda Water" />
            <Picker.Item label="Sour Mix" value="Sour Mix" />
            <Picker.Item label="Strawberry Syrup" value="Strawberry Syrup" />
            <Picker.Item label="Sweet Vermouth" value="Sweet Vermouth" />
            <Picker.Item label="Tennessee Whiskey" value="Tennessee Whiskey" />
            <Picker.Item label="Toffee Syrup" value="Toffee Syrup" />
            <Picker.Item label="Tomato Juice" value="Tomato Juice" />
            <Picker.Item label="Tonic Water" value="Tonic Water" />
            <Picker.Item label="Triple Sec " value="Triple Sec " />
            <Picker.Item label="Vermouth" value="Vermouth" />
            <Picker.Item label="Vodka" value="Vodka" />
            <Picker.Item
              label="Whiskey Fruit Spice Liqueur"
              value="Whiskey Fruit Spice Liqueur"
            />
            <Picker.Item label="White Rum" value="White Rum" />
          </Picker>
          <Picker selectedValue={vol2} onValueChange={value => setVol2(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="0ml" value={0} />
            <Picker.Item label="15ml" value={15} />
            <Picker.Item label="30ml" value={30} />
            <Picker.Item label="45ml" value={45} />
            <Picker.Item label="60ml" value={60} />
            <Picker.Item label="75ml" value={75} />
            <Picker.Item label="90ml" value={90} />
          </Picker>

          <Text>3번:</Text>
          <Picker selectedValue={num3} onValueChange={value => setNum3(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item
              label="Almond Flavored Liqueur"
              value="Almond Flavored Liqueur"
            />
            <Picker.Item label="Anejo Cuatro Rum" value="Anejo Cuatro Rum" />
            <Picker.Item label="Apple Cider" value="Apple Cider" />
            <Picker.Item label="Apple Juice" value="Apple Juice" />
            <Picker.Item label="Apricot Brandy" value="Apricot Brandy" />
            <Picker.Item label="Banana Liqueur" value="Banana Liqueur" />
            <Picker.Item
              label="Black Raspberry Liqueur"
              value="Black Raspberry Liqueur"
            />
            <Picker.Item label="Black Rum" value="Black Rum" />
            <Picker.Item label="Blanco Tequila" value="Blanco Tequila" />
            <Picker.Item
              label="Blood Orange Juice"
              value="Blood Orange Juice"
            />
            <Picker.Item label="Blood Orange Soda" value="Blood Orange Soda" />
            <Picker.Item label="Blue Curacao" value="Blue Curacao" />
            <Picker.Item
              label="Blue Curacao Liqueur"
              value="Blue Curacao Liqueur"
            />
            <Picker.Item label="Bourbon Whiskey" value="Bourbon Whiskey" />
            <Picker.Item label="Canadian Whiskey" value="Canadian Whiskey" />
            <Picker.Item label="Champagne" value="Champagne" />
            <Picker.Item
              label="Chartreuse Green Liqueur"
              value="Chartreuse Green Liqueur"
            />
            <Picker.Item label="Cherry Brandy" value="Cherry Brandy" />
            <Picker.Item label="Citrus Syrup" value="Citrus Syrup" />
            <Picker.Item label="Citrus Vodka" value="Citrus Vodka" />
            <Picker.Item label="Club Soda" value="Club Soda" />
            <Picker.Item label="Coconut Rum" value="Coconut Rum" />
            <Picker.Item label="Coconut Water" value="Coconut Water" />
            <Picker.Item
              label="Coffee Flavored Liqueur"
              value="Coffee Flavored Liqueur"
            />
            <Picker.Item label="Coffee Liqueur  " value="Coffee Liqueur  " />
            <Picker.Item label="Cola" value="Cola" />
            <Picker.Item label="Cranberry Juice" value="Cranberry Juice" />
            <Picker.Item label="Cream of Coconut" value="Cream of Coconut" />
            <Picker.Item label="Diet Cola" value="Diet Cola" />
            <Picker.Item label="Dry Gin" value="Dry Gin" />
            <Picker.Item label="Dry Vermouth" value="Dry Vermouth" />
            <Picker.Item
              label="Elderflower Liqueur"
              value="Elderflower Liqueur"
            />
            <Picker.Item label="Espresso" value="Espresso" />
            <Picker.Item label="Gin" value="Gin" />
            <Picker.Item label="Gin Based Liqueur" value="Gin Based Liqueur" />
            <Picker.Item label="Ginger Ale" value="Ginger Ale" />
            <Picker.Item label="Ginger Beer" value="Ginger Beer" />
            <Picker.Item
              label="Ginger Simple Syrup"
              value="Ginger Simple Syrup"
            />
            <Picker.Item label="Gold Rum" value="Gold Rum" />
            <Picker.Item label="Grand Marnier" value="Grand Marnier" />
            <Picker.Item label="Grapefruit Juice" value="Grapefruit Juice" />
            <Picker.Item label="Grenadine Syrup" value="Grenadine Syrup" />
            <Picker.Item label="Honey" value="Honey" />
            <Picker.Item
              label="Honey Ginger Syrup"
              value="Honey Ginger Syrup"
            />
            <Picker.Item label="Honey Syrup" value="Honey Syrup" />
            <Picker.Item label="Irish Whiskey" value="Irish Whiskey" />
            <Picker.Item label="Jamaican Rum" value="Jamaican Rum" />
            <Picker.Item
              label="Lemon Flavored Liqueur"
              value="Lemon Flavored Liqueur"
            />
            <Picker.Item label="Lemon Juice" value="Lemon Juice" />
            <Picker.Item label="Lime Flavored Rum" value="Lime Flavored Rum" />
            <Picker.Item label="Lime Juice" value="Lime Juice" />
            <Picker.Item
              label="Limon Flavored Rum"
              value="Limon Flavored Rum"
            />
            <Picker.Item label="Orange Juice" value="Orange Juice" />
            <Picker.Item label="Original Vodka" value="Original Vodka" />
            <Picker.Item
              label="Peach Flavored Schnapps"
              value="Peach Flavored Schnapps"
            />
            <Picker.Item label="Pineapple Juice" value="Pineapple Juice" />
            <Picker.Item
              label="Raspberry Flavored Liqueur"
              value="Raspberry Flavored Liqueur"
            />
            <Picker.Item label="Red Burgundy Wine" value="Red Burgundy Wine" />
            <Picker.Item label="Rum" value="Rum" />
            <Picker.Item label="Rum Cream Liqueur" value="Rum Cream Liqueur" />
            <Picker.Item label="Scotch Whiskey" value="Scotch Whiskey" />
            <Picker.Item label="Simple Syrup" value="Simple Syrup" />
            <Picker.Item label="Soda Water" value="Soda Water" />
            <Picker.Item label="Sour Mix" value="Sour Mix" />
            <Picker.Item label="Strawberry Syrup" value="Strawberry Syrup" />
            <Picker.Item label="Sweet Vermouth" value="Sweet Vermouth" />
            <Picker.Item label="Tennessee Whiskey" value="Tennessee Whiskey" />
            <Picker.Item label="Toffee Syrup" value="Toffee Syrup" />
            <Picker.Item label="Tomato Juice" value="Tomato Juice" />
            <Picker.Item label="Tonic Water" value="Tonic Water" />
            <Picker.Item label="Triple Sec " value="Triple Sec " />
            <Picker.Item label="Vermouth" value="Vermouth" />
            <Picker.Item label="Vodka" value="Vodka" />
            <Picker.Item
              label="Whiskey Fruit Spice Liqueur"
              value="Whiskey Fruit Spice Liqueur"
            />
            <Picker.Item label="White Rum" value="White Rum" />
          </Picker>
          <Picker selectedValue={vol3} onValueChange={value => setVol3(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="0ml" value={0} />
            <Picker.Item label="15ml" value={15} />
            <Picker.Item label="30ml" value={30} />
            <Picker.Item label="45ml" value={45} />
            <Picker.Item label="60ml" value={60} />
            <Picker.Item label="75ml" value={75} />
            <Picker.Item label="90ml" value={90} />
          </Picker>

          <Text>4번:</Text>
          <Picker selectedValue={num4} onValueChange={value => setNum4(value)}>
            <Picker.Item label="선택하세요" value="" />
            <Picker.Item
              label="Almond Flavored Liqueur"
              value="Almond Flavored Liqueur"
            />
            <Picker.Item label="Anejo Cuatro Rum" value="Anejo Cuatro Rum" />
            <Picker.Item label="Apple Cider" value="Apple Cider" />
            <Picker.Item label="Apple Juice" value="Apple Juice" />
            <Picker.Item label="Apricot Brandy" value="Apricot Brandy" />
            <Picker.Item label="Banana Liqueur" value="Banana Liqueur" />
            <Picker.Item
              label="Black Raspberry Liqueur"
              value="Black Raspberry Liqueur"
            />
            <Picker.Item label="Black Rum" value="Black Rum" />
            <Picker.Item label="Blanco Tequila" value="Blanco Tequila" />
            <Picker.Item
              label="Blood Orange Juice"
              value="Blood Orange Juice"
            />
            <Picker.Item label="Blood Orange Soda" value="Blood Orange Soda" />
            <Picker.Item label="Blue Curacao" value="Blue Curacao" />
            <Picker.Item
              label="Blue Curacao Liqueur"
              value="Blue Curacao Liqueur"
            />
            <Picker.Item label="Bourbon Whiskey" value="Bourbon Whiskey" />
            <Picker.Item label="Canadian Whiskey" value="Canadian Whiskey" />
            <Picker.Item label="Champagne" value="Champagne" />
            <Picker.Item
              label="Chartreuse Green Liqueur"
              value="Chartreuse Green Liqueur"
            />
            <Picker.Item label="Cherry Brandy" value="Cherry Brandy" />
            <Picker.Item label="Citrus Syrup" value="Citrus Syrup" />
            <Picker.Item label="Citrus Vodka" value="Citrus Vodka" />
            <Picker.Item label="Club Soda" value="Club Soda" />
            <Picker.Item label="Coconut Rum" value="Coconut Rum" />
            <Picker.Item label="Coconut Water" value="Coconut Water" />
            <Picker.Item
              label="Coffee Flavored Liqueur"
              value="Coffee Flavored Liqueur"
            />
            <Picker.Item label="Coffee Liqueur  " value="Coffee Liqueur  " />
            <Picker.Item label="Cola" value="Cola" />
            <Picker.Item label="Cranberry Juice" value="Cranberry Juice" />
            <Picker.Item label="Cream of Coconut" value="Cream of Coconut" />
            <Picker.Item label="Diet Cola" value="Diet Cola" />
            <Picker.Item label="Dry Gin" value="Dry Gin" />
            <Picker.Item label="Dry Vermouth" value="Dry Vermouth" />
            <Picker.Item
              label="Elderflower Liqueur"
              value="Elderflower Liqueur"
            />
            <Picker.Item label="Espresso" value="Espresso" />
            <Picker.Item label="Gin" value="Gin" />
            <Picker.Item label="Gin Based Liqueur" value="Gin Based Liqueur" />
            <Picker.Item label="Ginger Ale" value="Ginger Ale" />
            <Picker.Item label="Ginger Beer" value="Ginger Beer" />
            <Picker.Item
              label="Ginger Simple Syrup"
              value="Ginger Simple Syrup"
            />
            <Picker.Item label="Gold Rum" value="Gold Rum" />
            <Picker.Item label="Grand Marnier" value="Grand Marnier" />
            <Picker.Item label="Grapefruit Juice" value="Grapefruit Juice" />
            <Picker.Item label="Grenadine Syrup" value="Grenadine Syrup" />
            <Picker.Item label="Honey" value="Honey" />
            <Picker.Item
              label="Honey Ginger Syrup"
              value="Honey Ginger Syrup"
            />
            <Picker.Item label="Honey Syrup" value="Honey Syrup" />
            <Picker.Item label="Irish Whiskey" value="Irish Whiskey" />
            <Picker.Item label="Jamaican Rum" value="Jamaican Rum" />
            <Picker.Item
              label="Lemon Flavored Liqueur"
              value="Lemon Flavored Liqueur"
            />
            <Picker.Item label="Lemon Juice" value="Lemon Juice" />
            <Picker.Item label="Lime Flavored Rum" value="Lime Flavored Rum" />
            <Picker.Item label="Lime Juice" value="Lime Juice" />
            <Picker.Item
              label="Limon Flavored Rum"
              value="Limon Flavored Rum"
            />
            <Picker.Item label="Orange Juice" value="Orange Juice" />
            <Picker.Item label="Original Vodka" value="Original Vodka" />
            <Picker.Item
              label="Peach Flavored Schnapps"
              value="Peach Flavored Schnapps"
            />
            <Picker.Item label="Pineapple Juice" value="Pineapple Juice" />
            <Picker.Item
              label="Raspberry Flavored Liqueur"
              value="Raspberry Flavored Liqueur"
            />
            <Picker.Item label="Red Burgundy Wine" value="Red Burgundy Wine" />
            <Picker.Item label="Rum" value="Rum" />
            <Picker.Item label="Rum Cream Liqueur" value="Rum Cream Liqueur" />
            <Picker.Item label="Scotch Whiskey" value="Scotch Whiskey" />
            <Picker.Item label="Simple Syrup" value="Simple Syrup" />
            <Picker.Item label="Soda Water" value="Soda Water" />
            <Picker.Item label="Sour Mix" value="Sour Mix" />
            <Picker.Item label="Strawberry Syrup" value="Strawberry Syrup" />
            <Picker.Item label="Sweet Vermouth" value="Sweet Vermouth" />
            <Picker.Item label="Tennessee Whiskey" value="Tennessee Whiskey" />
            <Picker.Item label="Toffee Syrup" value="Toffee Syrup" />
            <Picker.Item label="Tomato Juice" value="Tomato Juice" />
            <Picker.Item label="Tonic Water" value="Tonic Water" />
            <Picker.Item label="Triple Sec " value="Triple Sec " />
            <Picker.Item label="Vermouth" value="Vermouth" />
            <Picker.Item label="Vodka" value="Vodka" />
            <Picker.Item
              label="Whiskey Fruit Spice Liqueur"
              value="Whiskey Fruit Spice Liqueur"
            />
            <Picker.Item label="White Rum" value="White Rum" />
          </Picker>
          <Picker selectedValue={vol4} onValueChange={value => setVol4(value)}>
            <Picker.Item label="용량 선택" value="" />
            <Picker.Item label="0ml" value={0} />
            <Picker.Item label="15ml" value={15} />
            <Picker.Item label="30ml" value={30} />
            <Picker.Item label="45ml" value={45} />
            <Picker.Item label="60ml" value={60} />
            <Picker.Item label="75ml" value={75} />
            <Picker.Item label="90ml" value={90} />
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
