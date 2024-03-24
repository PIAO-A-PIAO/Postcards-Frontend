import React from 'react';
import {render} from '@testing-library/react-native';
import Login from '../Signup';

describe('Signup component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<Login/>);


    // Check if the "User Name" text is rendered
    const usernameText = getByText('User Name');
    expect(usernameText).toBeTruthy();

    // Check if the "Email Address" text is rendered
    const emailText = getByText('Email Address');
    expect(emailText).toBeTruthy();

    // Check if the "Password" text is rendered
    const passwordText = getByText('Password');
    expect(passwordText).toBeTruthy();
  });

  it('navigates to the appropriate screen when "Sign Up" button is pressed', () => {
    const {getByText} = render(<Login/>);

    // Mock the navigation object
    const mockNavigation = {
      navigate: jest.fn(),
    };

    // Replace the navigation prop with the mock navigation
    const renderedComponent = React.cloneElement(<Login navigation={mockNavigation}/>);

  });
});