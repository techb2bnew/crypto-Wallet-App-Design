import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavouriteScreen from '../screens/FavouriteScreen';
import CryptoOverviewScreen from '../screens/CryptoOverviewScreen';

const Stack = createStackNavigator();

const FavouriteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={FavouriteScreen} options={{headerShown:false}}/>
      <Stack.Screen name="CryptoOverView" component={CryptoOverviewScreen} options={{headerShown:false}}/>

    </Stack.Navigator>
  );
};

export default FavouriteStack;
