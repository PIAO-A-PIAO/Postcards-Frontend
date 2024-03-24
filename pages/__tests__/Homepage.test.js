import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import Home from '../Home';
import axios from 'axios';

jest.mock('axios');

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));
describe('Home component', () => {
  beforeEach(() => {
    // Mock reset for axios
    axios.get.mockReset();
  });

  it('renders correctly', () => {
    const {getByText, getByTestId} = render(<Home/>);
    expect(getByText('You earned')).toBeTruthy();
    expect(getByText('Your Ratings')).toBeTruthy();
    expect(getByText('How are you feeling today?')).toBeTruthy();
    expect(getByText('Rate your experience')).toBeTruthy();

    // You can add checks here to ensure certain parts of your component are rendered.
  });

  it('makes an API call to get movies', async () => {
    const response = {data: {results: [{id: 1, title: 'Movie Title', backdrop_path: '/path.jpg'}]}};
    axios.get.mockResolvedValue(response);

    render(<Home/>);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(expect.any(String));
    });
    // Additional checks can be added here to verify that the data is rendered.
  });

  // Add more tests for user interactions and other functionalities
});