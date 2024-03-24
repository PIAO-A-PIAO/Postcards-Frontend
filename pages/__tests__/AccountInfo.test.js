import React from 'react';
import {render} from '@testing-library/react-native';
import AccountInfo from '../AccountInfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Mock Navigation
const Stack = createNativeStackNavigator();
const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};

const MockedAccountInfo = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AccountInfo" component={AccountInfo}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

describe('AccountInfo component', () => {
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(<MockedAccountInfo/>);

    // Check if the "Account Info" text is rendered
    const accountInfoText = getByText('Account Info');
    expect(accountInfoText).toBeTruthy();

    // Check if the "Need Help?" pressable is rendered
    const needHelpPressable = getByText('Need Help?');
    expect(needHelpPressable).toBeTruthy();

    // Check if the "Reward Points" section is rendered
    const rewardPointsSection = getByText('Reward Points');
    expect(rewardPointsSection).toBeTruthy();

    // Check if the "Log Out" text is rendered
    const logOutText = getByText('Log Out');
    expect(logOutText).toBeTruthy();
  });

});