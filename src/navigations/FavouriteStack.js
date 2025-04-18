import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavouriteScreen from '../screens/FavouriteScreen';

const Stack = createStackNavigator();

const FavouriteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={FavouriteScreen} options={{headerShown:false}}/>
      {/* Add more screens if needed */}
    </Stack.Navigator>
  );
};

export default FavouriteStack;
