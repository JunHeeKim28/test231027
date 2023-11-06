import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const App = () => {
  const [Rum, setRum] = useState('');
  const [Gin, setGin] = useState('');
  const [Beer, setBeer] = useState('');
  const [Juice, setJuice] = useState('');
  const [RumAmount, setRumAmount] = useState('');
  const [GinAmount, setGinAmount] = useState('');
  const [BeerAmount, setBeerAmount] = useState('');
  const [JuiceAmount, setJuiceAmount] = useState('');

  const rums = [
    {label: '화이트 럼', value: 'white rum'},
    {label: '골드 럼', value: 'gold rum'},
    {label: '스파이시드럼', value: 'spiced rum'},
    {label: '다크 럼', value: 'dark rum'},
  ];
  const gins = [
    {label: '진', value: 'white rum1'},
    {label: '핸드릭스', value: 'gold rum1'},
    {label: '탱커레이', value: 'spiced rum1'},
    {label: '드라이진', value: 'dark rum1'},
  ];
  const beers = [
    {label: '카스', value: 'white rum2'},
    {label: '테라', value: 'gold rum2'},
    {label: '칭따오', value: 'spiced rum2'},
    {label: '기네스', value: 'dark rum2'},
  ];
  const juices = [
    {label: '레몬', value: 'white rum3'},
    {label: '라임', value: 'gold rum3'},
    {label: '자몽', value: 'spiced rum3'},
    {label: '토마토', value: 'dark rum3'},
  ];

  const rumAmounts = [
    {label: '0ml', value: '0ml'},
    {label: '30ml', value: '30ml'},
    {label: '60ml', value: '60ml'},
    {label: '90ml', value: '90ml'},
  ];
  const ginAmounts = [
    {label: '0ml', value: '0ml'},
    {label: '30ml', value: '30ml'},
    {label: '60ml', value: '60ml'},
    {label: '90ml', value: '90ml'},
  ];
  const beerAmounts = [
    {label: '0ml', value: '0ml'},
    {label: '30ml', value: '30ml'},
    {label: '60ml', value: '60ml'},
    {label: '90ml', value: '90ml'},
  ];
  const juiceAmounts = [
    {label: '0ml', value: '0ml'},
    {label: '30ml', value: '30ml'},
    {label: '60ml', value: '60ml'},
    {label: '90ml', value: '90ml'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.excontainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>럼: </Text>
          <Picker
            selectedValue={Rum}
            onValueChange={(itemValue, itemIndex) => setRum(itemValue)}
            style={styles.picker}>
            {rums.map(rum => (
              <Picker.Item
                key={rum.value}
                label={rum.label}
                value={rum.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>용량: </Text>
          <Picker
            selectedValue={RumAmount}
            onValueChange={(itemValue, itemIndex) => setRumAmount(itemValue)}
            style={styles.picker}>
            {rumAmounts.map(rumAmount => (
              <Picker.Item
                key={rumAmount.value}
                label={rumAmount.label}
                value={rumAmount.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.excontainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>진: </Text>
          <Picker
            selectedValue={Gin}
            onValueChange={(itemValue, itemIndex) => setGin(itemValue)}
            style={styles.picker}>
            {gins.map(gin => (
              <Picker.Item
                key={gin.value}
                label={gin.label}
                value={gin.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>용량: </Text>
          <Picker
            selectedValue={GinAmount}
            onValueChange={(itemValue, itemIndex) => setGinAmount(itemValue)}
            style={styles.picker}>
            {ginAmounts.map(ginAmount => (
              <Picker.Item
                key={ginAmount.value}
                label={ginAmount.label}
                value={ginAmount.value}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.excontainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>맥주쓰: </Text>
          <Picker
            selectedValue={Beer}
            onValueChange={(itemValue, itemIndex) => setBeer(itemValue)}
            style={styles.picker}>
            {beers.map(beer => (
              <Picker.Item
                key={beer.value}
                label={beer.label}
                value={beer.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>용량: </Text>
          <Picker
            selectedValue={BeerAmount}
            onValueChange={(itemValue, itemIndex) => setBeerAmount(itemValue)}
            style={styles.picker}>
            {beerAmounts.map(beerAmount => (
              <Picker.Item
                key={beerAmount.value}
                label={beerAmount.label}
                value={beerAmount.value}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.excontainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>주스: </Text>
          <Picker
            selectedValue={Juice}
            onValueChange={(itemValue, itemIndex) => setJuice(itemValue)}
            style={styles.picker}>
            {juices.map(juice => (
              <Picker.Item
                key={juice.value}
                label={juice.label}
                value={juice.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>용량: </Text>
          <Picker
            selectedValue={JuiceAmount}
            onValueChange={(itemValue, itemIndex) => setJuiceAmount(itemValue)}
            style={styles.picker}>
            {juiceAmounts.map(juiceAmount => (
              <Picker.Item
                key={juiceAmount.value}
                label={juiceAmount.label}
                value={juiceAmount.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //flexDirection: 'row',
  },
  excontainer: {
    flexDirection: 'row',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  picker: {
    width: Dimensions.get('window').width / 3, // 조절 가능한 폭
  },
  selectedText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default App;
