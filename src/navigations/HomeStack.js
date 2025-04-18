import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CryptoOverviewScreen from '../screens/CryptoOverviewScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="CryptoOverView" component={CryptoOverviewScreen} options={{headerShown:false}}/>

      {/* Add more screens if needed */}
    </Stack.Navigator>
  );
};

export default HomeStack;
