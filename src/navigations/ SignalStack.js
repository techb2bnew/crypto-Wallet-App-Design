import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignalScreen from '../screens/SignalScreen';

const Stack = createStackNavigator();

const SignalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signal" component={SignalScreen} options={{headerShown:false}}/>
      {/* Add more screens if needed */}
    </Stack.Navigator>
  );
};

export default SignalStack;
