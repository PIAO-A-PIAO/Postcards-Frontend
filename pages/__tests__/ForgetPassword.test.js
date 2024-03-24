import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import ForgetPassword from '../ForgetPassword';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Mock Navigation
const Stack = createNativeStackNavigator();

const mockNavigation = {
  navigate: jest.fn(),
};
global.alert = jest.fn();
const MockedForgetPassword = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ForgetPassword">
          {({navigation}) => <ForgetPassword navigation={navigation}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('ForgetPassword component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<MockedForgetPassword/>);

    // Check if the "Reset Password" title is rendered
    const titleElement = getByText('Reset Password');
    expect(titleElement).toBeTruthy();

    // Check if the "Email Address" input placeholder is rendered
    const emailInputPlaceholder = getByPlaceholderText('Email');
    expect(emailInputPlaceholder).toBeTruthy();

    // Add more assertions for other elements as needed
  });
  it('calls handleSetPass when "Confirm" button is pressed', () => {
    const {getByText} = render(<MockedForgetPassword/>);

    const confirmButton = getByText('Confirm');
    fireEvent.press(confirmButton);


    expect(global.alert).toHaveBeenCalledWith("Password has been reset");
  });

  it('calls handleSendCode when "Send Code" button is pressed', () => {
    const {getByText} = render(<MockedForgetPassword/>);

    const sendCodeButton = getByText('Send Code');
    fireEvent.press(sendCodeButton);


    expect(global.alert).toHaveBeenCalledWith("Code has been sent");
  });

});