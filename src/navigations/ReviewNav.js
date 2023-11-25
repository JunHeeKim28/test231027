// ReviewNavScreen.js

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ReviewScreen from '../screens/ReviewScreen';
import ReviewListScreen from '../screens/ReviewListScreen';

const Tab = createMaterialTopTabNavigator();

const ReviewNavScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: '#be289d',
        },
      }}>
      <Tab.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          title: '리뷰 작성',
        }}
      />
      <Tab.Screen
        name="ReviewList"
        component={ReviewListScreen}
        options={{
          title: '나의 리뷰',
        }}
      />
    </Tab.Navigator>
  );
};

export default ReviewNavScreen;
