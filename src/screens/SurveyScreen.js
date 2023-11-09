import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useState} from 'react';

const data = [
  {id: '1', title: '아이템 1'},
  {id: '2', title: '아이템 2'},
  {id: '3', title: '아이템 3'},
  // ...
];

const App = () => {
  const renderItem = ({item}) => {
    const handlePress = () => {
      // 아이템을 누를 때 실행할 작업을 여기에 추가
      console.log(`누른 아이템: ${item.title}`);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
          }}>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default App;
