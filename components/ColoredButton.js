//A button component that can be used to create a button with a colored background and white text
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ColoredButton = ({title, onPress, buttonColor}) => {
  const buttonStyle = {
    backgroundColor: buttonColor || 'white', // Added a buttonColor prop
  };

  const textStyle = {
    color: buttonColor === 'white' ? '#44299e' : 'white', // Conditionally set text color
  };

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress} testID="colored-button">
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 35,
    width: "84%",
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#44299e',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ColoredButton;
