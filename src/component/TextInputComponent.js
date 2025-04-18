import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { BlueColor, grayColor } from '../constants/Color';
import { spacings } from '../constants/Fonts';

const TextInputComponent = ({ label, value, setValue, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        placeholder={label}
        placeholderTextColor={grayColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    color: BlueColor,
    marginBottom: spacings.large,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 15,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
  },
});

export default TextInputComponent;
