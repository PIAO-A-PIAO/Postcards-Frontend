import React from 'react';
import {render} from '@testing-library/react-native';
import Login from '../Login.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));
jest.mock('../../hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../../context/Authentication', () => ({
  AuthenticationContext: {
    Provider: ({children}) => children,
    Consumer: ({children}) => children({login: jest.fn()}),
  }
}));


describe('Login component', () => {

  // Setup for mocked functions and props
  const mockSetAuth = jest.fn();
  const mockNavigate = jest.fn();

  // Provide mock implementations
  beforeEach(() => {
    // Mock useAuth as a default export
    useAuth.mockReturnValue({setAuth: mockSetAuth});
    axios.post.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  test('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<Login navigation={{navigate: mockNavigate}}/>);

    // Check if important elements are rendered
    expect(getByPlaceholderText('Email Address')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Forgot Password?')).toBeTruthy();
    expect(getByText('No account? Create Account')).toBeTruthy();
  });

});
