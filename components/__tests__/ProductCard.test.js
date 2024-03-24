import React from 'react';
import {render} from '@testing-library/react-native';
import ProductCard from '../ProductCard';

jest.mock('axios');

describe('ProductCard component', () => {
  it('renders without crashing', () => {
    render(<ProductCard movieId={1}/>); //this movieId is for the specific movie "Spider-Man: Across the Spider-Verse"
  });
});
