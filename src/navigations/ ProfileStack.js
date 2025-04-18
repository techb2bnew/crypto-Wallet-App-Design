import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import TransferScreen from '../screens/TransferScreen';
import SettingScreen from '../screens/SettingScreen';
import AuthStack from './AuthStack';
import PaymentMethod from '../screens/PaymentMethod';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TransferScreen" component={TransferScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentMathod" component={PaymentMethod} options={{ headerShown: false }} />
      <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
