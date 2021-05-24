import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders start game button', () => {
  render(<App />);
  const buttonElement = screen.getByText('Start Game');
  expect(buttonElement).toBeInTheDocument();
});
