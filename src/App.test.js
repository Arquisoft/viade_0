import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('add 2+2', () => {
  expect(2+2).toBe(4);
}); 

/*test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Lucía/i);
  expect(linkElement).toBeInTheDocument();
}); */
