import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import RewardHome from '../RewardHome';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Mock Navigation and Route
const Stack = createNativeStackNavigator();
const mockRoute = {
  params: {
    myGoal: false // Or true, depending on what you want to test
  }
};
const mockNavigation = jest.mock(); // Mock the navigation object if needed

const MockedRewardHome = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RewardHome"
          component={RewardHome}
          initialParams={mockRoute.params}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('RewardHome component', () => {
  it('renders correctly with mocked route and navigation', () => {
    const {getByText, getByTestId} = render(
      <MockedRewardHome route={mockRoute} navigation={mockNavigation}/>
    );

    // Check for pressable categories
    expect(getByText('My Goals')).toBeTruthy();

    // Check for reward categories
    expect(getByText('Food')).toBeTruthy();
    expect(getByText('Trips')).toBeTruthy();
    expect(getByText('Flight')).toBeTruthy();

    // Check for specific reward items
    expect(getByText("Domino's Pizza")).toBeTruthy();
    expect(getByText("Starbucks Frappuccino")).toBeTruthy();
    expect(getByText("Gong Cha")).toBeTruthy();

    // Test user interactions and state changes
    const allButton = getByTestId('allButton');
    fireEvent.press(allButton);

    const myGoalsButton = getByTestId('myGoalsButton');
    fireEvent.press(myGoalsButton);
  });
});
