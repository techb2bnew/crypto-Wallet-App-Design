import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './src/navigations/AuthStack';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { heightPercentageToDP } from './src/utils';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedLoginStatus = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(storedLoginStatus === 'true');
      } catch (error) {
        console.log("Error fetching login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ height: Platform.OS === 'ios' ? heightPercentageToDP(91) : heightPercentageToDP(100) }}
      >
        <NavigationContainer>
          {isLoggedIn ? <BottomTabNavigator /> : <AuthStack />}
        </NavigationContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  }
});

export default App;
