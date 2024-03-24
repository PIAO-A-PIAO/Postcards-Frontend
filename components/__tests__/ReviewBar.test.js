import React from 'react';
import {render} from '@testing-library/react-native';
import ReviewBar from '../ReviewBar';

describe('ReviewBar component', () => {
  it('renders the correct number of filled and empty stars based on rating', () => {
    const ratingNum = 7; // An example rating number
    const expectedFilledStars = Math.floor(ratingNum / 2);
    const expectedEmptyStars = 5 - expectedFilledStars;

    const {getAllByTestId} = render(<ReviewBar ratingNum={ratingNum}/>);

    // Ensure to add testID to your star images in ReviewBar component
    const filledStars = getAllByTestId('filled-star');
    const emptyStars = getAllByTestId('empty-star');

    expect(filledStars.length).toBe(expectedFilledStars);
    expect(emptyStars.length).toBe(expectedEmptyStars);
  });
});
