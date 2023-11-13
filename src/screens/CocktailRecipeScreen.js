import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const CocktailRecipeScreen = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [num1, setNum1] = useState('');
  const [vol1, setVol1] = useState('');
  const [num2, setNum2] = useState('');
  const [vol2, setVol2] = useState('');
  const [num3, setNum3] = useState('');
  const [vol3, setVol3] = useState('');
  const [num4, setNum4] = useState('');
  const [vol4, setVol4] = useState('');

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const response = await axios.get(
        'http://ceprj.gachon.ac.kr:60005/user/customcocktail',
      );
      if (response.data.success) {
        setRecipeList(response.data.cocktails);
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveRecipe = async () => {
    const newRecipe = {
      c_name: recipeTitle,
      c_ing1: num1,
      c_volume1: vol1,
      c_ing2: num2,
      c_volume2: vol2,
      c_ing3: num3,
      c_volume3: vol3,
      c_ing4: num4,
      c_volume4: vol4,
    };

    try {
      const response = await axios.post(
        'http://ceprj.gachon.ac.kr:60005/user/cocktailadd',
        newRecipe,
      );
      if (response.data.success) {
        Alert.alert('저장 성공', '새로운 칵테일 레시피가 저장되었습니다.');
        loadRecipes(); // 레시피 목록 새로 고침
        toggleModal();
      }
    } catch (error) {
      console.error('Save error', error);
      Alert.alert('저장 실패', '칵테일 레시피 저장에 실패했습니다.');
    }
  };

  const deleteRecipe = async recipeID => {
    try {
      await axios.delete(
        `http://ceprj.gachon.ac.kr:60005/user/cocktaildelete/${recipeID}`,
      );
      loadRecipes(); // 레시피 목록 새로 고침
      Alert.alert('삭제 완료', `레시피가 삭제되었습니다.`);
    } catch (error) {
      console.error(`Error deleting recipe ${recipeID}:`, error);
      Alert.alert('삭제 실패', '레시피 삭제에 실패했습니다.');
    }
  };

  //레시피 제조
  // const makeRecipe = recipe => {
  //   // // 레시피에 필요한 정보 추출
  //   // const {
  //   //   UserID,
  //   //   title,
  //   //   number1,
  //   //   vol1,
  //   //   number2,
  //   //   vol2,
  //   //   number3,
  //   //   vol3,
  //   //   number4,
  //   //   vol4,
  //   // } = recipe;

  //   // // 서버로 보낼 데이터 객체 생성
  //   const recipeData = {
  //     UserID: 'test_name',
  //     recipeTitle: 'test_recipe',
  //     first: 30,
  //     second: 30,
  //     third: 30,
  //     fourth: 30,
  //   };
  //   // 클라이언트 측에서 데이터를 로그에 출력
  //   console.log('Sending data to server:', recipeData);
  //   // 서버로 제조 요청을 보내는 부분
  //   axios
  //     .post('http://ceprjmaker.iptime.org:10000/make_cocktail', recipeData)
  //     .then(response => {
  //       console.log('Make successful', response.data);
  //       // 서버로 제조 요청을 보내는 부분
  //       console.log('Sending data to server:', recipeData);
  //       // 제조 성공에 대한 처리를 여기에 추가할 수 있어
  //     })
  //     .catch(error => {
  //       console.error('Make error', error);
  //       // 제조 실패에 대한 처리를 여기에 추가할 수 있어
  //     });
  // };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={toggleModal}>
        <Text style={styles.addBtnTxt}>추가</Text>
      </TouchableOpacity>
      <ScrollView>
        {recipeList.map((recipe, index) => (
          <View key={index} style={styles.recipeItemContainer}>
            <Text style={styles.recipeItem}>
              {`${recipe.C_NAME || 'Untitled Recipe'}: ${recipe.C_ING1} ${
                recipe.C_VOLUME1
              }, ${recipe.C_ING2} ${recipe.C_VOLUME2}, ${recipe.C_ING3} ${
                recipe.C_VOLUME3
              }, ${recipe.C_ING4} ${recipe.C_VOLUME4}`}
            </Text>
            <View style={styles.recipeItemBtns}>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => {
                  console.log('Recipe ID for deletion:', recipe.C_ID);
                  deleteRecipe(recipe.C_ID);
                }}>
                <Text style={styles.deleteBtnTxt}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

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
            <Picker.Item label="0ml" value="0ml" />
            <Picker.Item label="15ml" value="15ml" />
            <Picker.Item label="30ml" value="30ml" />
            <Picker.Item label="45ml" value="45ml" />
            <Picker.Item label="60ml" value="60ml" />
            <Picker.Item label="75ml" value="75ml" />
            <Picker.Item label="90ml" value="90ml" />
          </Picker>

          <Text>2번:</Text>
          <Picker selectedValue={num2} onValueChange={value => setNum2(value)}>
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
            <Picker.Item label="0ml" value="0ml" />
            <Picker.Item label="15ml" value="15ml" />
            <Picker.Item label="30ml" value="30ml" />
            <Picker.Item label="45ml" value="45ml" />
            <Picker.Item label="60ml" value="60ml" />
            <Picker.Item label="75ml" value="75ml" />
            <Picker.Item label="90ml" value="90ml" />
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
            <Picker.Item label="0ml" value="0ml" />
            <Picker.Item label="15ml" value="15ml" />
            <Picker.Item label="30ml" value="30ml" />
            <Picker.Item label="45ml" value="45ml" />
            <Picker.Item label="60ml" value="60ml" />
            <Picker.Item label="75ml" value="75ml" />
            <Picker.Item label="90ml" value="90ml" />
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
    backgroundColor: '#000',
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
    backgroundColor: '#be289d',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  deleteBtnTxt: {fontSize: 18, color: 'white'},
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
    alignContent: 'center',
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
    backgroundColor: '#fff', // 배경색
    borderWidth: 1, // 테두리 두께
    borderColor: '#ddd', // 테두리 색상
    padding: 10, // 내부 여백
    marginVertical: 5, // 수직 여백
    marginHorizontal: 10, // 수평 여백
    borderRadius: 5, // 테두리 둥근 처리
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자 위치
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 3.84, // 그림자 반경
    elevation: 5, // 안드로이드 전용 그림자 효과
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
