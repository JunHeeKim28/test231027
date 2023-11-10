import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const FlatListExample = () => {
  const data = [
    {
      id: '1',
      title: '50/50 Martini',
      igd1: 'Dry Vermouth',
      vol1: '60ml',
      igd2: 'Vodka',
      vol2: '60ml',
      igd3: '',
      vol3: '',
      igd4: '',
      vol4: '',
    },
    {
      id: '2',
      title: 'Alabama Slammer',
      igd1: 'Almond Flavored Liqueur',
      vol1: '30ml',
      igd2: 'Gin',
      vol2: '30ml',
      igd3: 'Orange Juice',
      vol3: '60ml',
      igd4: 'Whiskey Fruit Spice Liqueur',
      vol4: '30ml',
    },
    {
      id: '3',
      title: 'Alibi',
      igd1: 'Club Soda ',
      vol1: '15ml',
      igd2: 'Ginger Simple Syrup',
      vol2: '30ml',
      igd3: 'Lime Juice',
      vol3: '15ml',
      igd4: 'Vodka',
      vol4: '60ml',
    },
    {
      id: '4',
      title: 'Almost a Collins',
      igd1: 'Blood Orange Juice',
      vol1: '30ml',
      igd2: 'Blood Orange Soda',
      vol2: '90ml',
      igd3: 'Vodka',
      vol3: '45ml',
      igd4: '',
      vol4: '',
    },
    {
      id: '5',
      title: 'Apple Business',
      igd1: 'Apple Juice',
      vol1: '30ml',
      igd2: 'Gin',
      vol2: '60ml',
      igd3: 'Honey',
      vol3: '15ml',
      igd4: 'Lime Juice',
      vol4: '15ml',
    },
    {
      id: '6',
      title: 'April Rain',
      igd1: 'Dry Vermouth',
      vol1: '15ml',
      igd2: 'Lime Juice',
      vol2: '15ml',
      igd3: 'Vodka',
      vol3: '60ml',
      igd4: '',
      vol4: '',
    },
    {
      id: '7',
      title: 'Aristocrat',
      igd1: 'Champagne',
      vol1: '60ml',
      igd2: 'Gin Based Liqueur',
      vol2: '15ml',
      igd3: 'Red Burgundy Wine',
      vol3: '45ml',
      igd4: 'Strawberry Syrup',
      vol4: '30ml',
    },
    {
      id: '8',
      title: 'Autumn Apple Martini',
      igd1: 'Apple Cider',
      vol1: '60ml',
      igd2: 'Gin',
      vol2: '60ml',
      igd3: 'Honey Syrup',
      vol3: '15ml',
      igd4: 'Lemon Juice',
      vol4: '15ml',
    },
    {
      id: '9',
      title: 'BARCADI & Diet Cola',
      igd1: 'Diet Cola',
      vol1: '120ml',
      igd2: 'White Rum',
      vol2: '60ml',
      igd3: '',
      vol3: '',
      igd4: '',
      vol4: '',
    },
    {
      id: '10',
      title: 'BARCADI Lime & Soda',
      igd1: 'Lime Flavored Rum',
      vol1: '60ml',
      igd2: 'Soda Water',
      vol2: '120ml',
      igd3: '',
      vol3: '',
      igd4: '',
      vol4: '',
    },
    // Add more items as needed
  ];

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.textContainer}>
        {item.igd1 && (
          <Text>
            {item.igd1}: {item.vol1}
          </Text>
        )}
        {item.igd2 && (
          <Text>
            {item.igd2}: {item.vol2}
          </Text>
        )}
        {item.igd3 && (
          <Text>
            {item.igd3}: {item.vol3}
          </Text>
        )}
        {item.igd4 && (
          <Text>
            {item.igd4}: {item.vol4}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 20,
    color: '#000',
  },
  itemContainer: {
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    //alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: 'column',
  },
});

export default FlatListExample;
