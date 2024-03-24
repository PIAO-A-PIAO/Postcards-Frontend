import React from 'react';
import {render} from '@testing-library/react-native';
import EntryPoint from '../EntryPoint';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Mock Navigation
const Stack = createNativeStackNavigator();

const mockNavigation = {
  navigate: jest.fn(),
};

const MockedEntryPoint = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EntryPoint" component={EntryPoint}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('EntryPoint component', () => {
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(<MockedEntryPoint/>);

    // Check if the "Create Account" button is rendered
    const createAccountButton = getByText('Create Account');
    expect(createAccountButton).toBeTruthy();

    // Check if the "Login" button is rendered
    const loginButton = getByText('Login');
    expect(loginButton).toBeTruthy();

    // Check if the swiper container is rendered
    const swiperContainer = getByTestId('swiper-container');
    expect(swiperContainer).toBeTruthy();
  });


});