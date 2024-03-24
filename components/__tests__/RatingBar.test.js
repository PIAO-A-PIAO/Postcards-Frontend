import React from 'react';
import {render} from '@testing-library/react-native';
import RatingBar from '../RatingBar';

describe('RatingBar component', () => {
  it('renders without crashing', () => {
    const mockChangeMovieRating = jest.fn();
    const mockQues = {
      "_id": "62d1ebe986b1e75c4ded2666",
      "cat_id": "62d1d2f3c9b0232c732752ff",
      "description": "",
      "id": 7,
      "question": "Audio Mixing"
    };
    // an actual ques object
    render(
      <RatingBar changeMovieRating={mockChangeMovieRating} ques={mockQues}/>
    );
  });
});
