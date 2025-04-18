import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignalScreen from '../screens/SignalScreen';
import CryptoOverviewScreen from '../screens/CryptoOverviewScreen';

const Stack = createStackNavigator();

const SignalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signal" component={SignalScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CryptoOverView" component={CryptoOverviewScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default SignalStack;
