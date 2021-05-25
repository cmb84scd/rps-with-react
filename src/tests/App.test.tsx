import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

describe('playing the game', () => {
  
  beforeEach(() => render(<App />));

  it('renders start game button', () => {
    const buttonElement = screen.getByText('Start Game');
    expect(buttonElement).toBeInTheDocument();
  });

  it('game buttons upon clicking start game', () => {
    fireEvent.click(screen.getByText('Start Game'));
    const rock = screen.getByText('Rock');
    const paper = screen.getByText('Paper');
    const scissors = screen.getByText('Scissors');
    expect(rock).toBeInTheDocument();
    expect(paper).toBeInTheDocument();
    expect(scissors).toBeInTheDocument();
  });
});
