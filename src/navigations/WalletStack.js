import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WalletScreen from '../screens/WalletScreen';
import TransferScreen from '../screens/TransferScreen';
import SettingScreen from '../screens/SettingScreen';

const Stack = createStackNavigator();

const WalletStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Wallet" component={WalletScreen}options={{headerShown:false}} />
      <Stack.Screen name="TransferScreen" component={TransferScreen}options={{headerShown:false}} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default WalletStack;
