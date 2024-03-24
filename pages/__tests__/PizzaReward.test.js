import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import PizzaReward from '../PizzaReward';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Mock Navigation and Route
const Stack = createNativeStackNavigator();
const mockRoute = {
  params: {
    name: 'Mock Reward Name',
    image: 'mock-image.png',
    pts: 'Mock Points',
    percentOff: 'Mock Percent Off'
  }
};
const mockNavigation = jest.mock(); // Mock the navigation object if needed

const MockedPizzaReward = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PizzaReward"
          component={PizzaReward}
          initialParams={mockRoute.params}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('PizzaReward component', () => {
  it('renders correctly with mocked route and navigation', () => {
    const {getByText, getByTestId} = render(
      <MockedPizzaReward route={mockRoute} navigation={mockNavigation}/>
    );

    // Check for static text and dynamic content
    expect(getByText('Avaliable Points')).toBeTruthy();
    expect(getByText('Enjoy 15% off on large sized Pizza. The offer applies to only these pizza - Pepperoni,  BBQ Chicken, Veggie, Deluxe, and Canadian.')).toBeTruthy();
    expect(getByText('Terms & Conditions')).toBeTruthy();

    // Test for press redeem
    const redeemButton = getByTestId('redeemButton');
    fireEvent.press(redeemButton);

    //Since the PizzaReward.js code is mostly hard coded, no more test is needed for now. Further test-cases can be implemented after connecting ti backend.
  });
});
