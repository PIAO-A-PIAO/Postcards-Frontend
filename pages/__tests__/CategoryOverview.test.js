import React from 'react';
import {render} from '@testing-library/react-native';
import CategoryOverview from '../CategoryOverview';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Mock Data
const mockMovies = [
  {id: 1, title: 'Movie 1', backdrop_path: '/path1.jpg'},
  {id: 2, title: 'Movie 2', backdrop_path: '/path2.jpg'}
  // Add more mock movies as needed
];

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({data: {results: mockMovies}}))
}));

// Mock Navigation
const Stack = createNativeStackNavigator();

const MockedCategoryOverview = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CategoryOverview" component={CategoryOverview}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('CategoryOverview component', () => {
  it('renders correctly', async () => {
    const {getByText, getAllByTestId} = render(<MockedCategoryOverview/>);

    // Check for main elements
    expect(getByText('Rate your experience')).toBeTruthy();
    expect(getByText('Movies')).toBeTruthy();
    expect(getByText('Trending Movies')).toBeTruthy();

  });

  // Additional tests for other interactions and navigations can be added here
});