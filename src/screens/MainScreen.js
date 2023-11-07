import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import CocktailRecipeScreen from './CocktailRecipeScreen';
//import DeviceRegisterScreen from './DeviceRegisterScreen';

//화면 가로, 세로 길이
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
//버튼 가로 길이
const buttonSize = screenWidth / 2 - 10;
//버튼 세로 길이
const buttonHeight = buttonSize / 2;

const MainScreen = () => {
  const navigation = useNavigation();

  const goToFavoritesScreen = () => {
    navigation.navigate('Favorites');
  };

  const gotoCocktailRecipeScreen = () => {
    navigation.navigate('CocktailRecipe');
  };

  const gotoDeviceRegisterScreen = () => {
    navigation.navigate('DeviceRegister');
  };
  const goToInfoScreen = () => {
    navigation.navigate('Info');
  };
  const goToSurveyScreen = () => {
    navigation.navigate('Survey');
  };
  const goToReviewScreen = () => {
    navigation.navigate('Review');
  };
  const goToPopularScreen = () => {
    navigation.navigate('Popular');
  };
  const goToMakeScreen = () => {
    navigation.navigate('Make');
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={goToMakeScreen}
          style={[styles.button, {width: buttonSize, height: buttonSize + 10}]}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Image
              source={require('../../assets/cocktail.png')} // 이미지 파일 경로 설정
              style={styles.image1}
            />
            <Text style={styles.buttonText}>칵테일 제조</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonColumn}>
          <TouchableOpacity
            style={[styles.button, {width: buttonSize, height: buttonHeight}]}
            onPress={goToFavoritesScreen}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/star.png')}
                style={styles.image2}
              />
              <Text style={styles.buttonText}>즐겨찾기</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToInfoScreen}
            style={[styles.button, {width: buttonSize, height: buttonHeight}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/information.png')}
                style={styles.image2}
              />
              <Text style={styles.buttonText}>이용방법</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={goToPopularScreen}
        style={[
          styles.button,
          {width: buttonSize * 2, height: buttonSize + 10},
        ]}>
        <Text style={styles.buttonText}>실시간 인기 칵테일</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {width: buttonSize, height: buttonHeight}]}
          onPress={gotoDeviceRegisterScreen}>
          <Text style={styles.buttonText}>기기등록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {width: buttonSize, height: buttonHeight}]}
          onPress={goToSurveyScreen}>
          <Text style={styles.buttonText}>칵테일 만족도 조사</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {width: buttonSize, height: buttonHeight}]}
          onPress={gotoCocktailRecipeScreen}>
          <Text style={styles.buttonText}>칵테일 레시피</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {width: buttonSize, height: buttonHeight}]}
          onPress={goToReviewScreen}>
          <Text style={styles.buttonText}>칵테일 리뷰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'black',
  },
  buttonContainer: {
    flexDirection: 'row', // 가로로 나란히 배치
  },
  buttonColumn: {
    alignItems: 'center', // 세로 정렬
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#be289d',
    borderRadius: 10,
  },
  image1: {
    width: 100, // 이미지의 너비
    height: 100, // 이미지의 높이
    marginLeft: 10, // 텍스트와 이미지 사이의 간격을 조절하세요
    marginBottom: 10,
  },
  image2: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MainScreen;
