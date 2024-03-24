import React from 'react';
import {render} from '@testing-library/react-native';
import UserReviewBar from '../UserReviewBar';

describe('UserReviewBar component', () => {
  it('renders the correct number of filled and empty stars based on rating', () => {
    const ratingNum = 7; // Example rating number
    const expectedFilledStars = Math.floor(ratingNum / 2);
    const expectedEmptyStars = 5 - expectedFilledStars;

    const {getAllByTestId} = render(<UserReviewBar ratingNum={ratingNum}/>);

    const filledStars = getAllByTestId('filled-star');
    const emptyStars = getAllByTestId('empty-star');

    expect(filledStars.length).toBe(expectedFilledStars);
    expect(emptyStars.length).toBe(expectedEmptyStars);
  });
});
