import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

describe('playing the game', () => {

  beforeEach(() => render(<App />));

  it('renders start game button', () => {
    const buttonElement = screen.getByText('Start Game');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders game buttons upon clicking start game', () => {
    fireEvent.click(screen.getByText('Start Game'));
    const rock = screen.getByText('Rock');
    const paper = screen.getByText('Paper');
    const scissors = screen.getByText('Scissors');
    expect(rock).toBeInTheDocument();
    expect(paper).toBeInTheDocument();
    expect(scissors).toBeInTheDocument();
  });

  describe('playing with comp choosing rock', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
    });

    afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('the user wins the first play', () => {
      fireEvent.click(screen.getByText('Start Game'));
      fireEvent.click(screen.getByText('Paper'));
      const msg = screen.getByText('User wins with Paper');
      expect(msg).toBeInTheDocument();
    });

    it('the user wins the second play and the game', () => {
      fireEvent.click(screen.getByText('Start Game'));
      fireEvent.click(screen.getByText('Paper'));
      fireEvent.click(screen.getByText('Paper'));
      const msg = screen.getByText('User wins with PaperUser wins with Paper');
      const winMsg = screen.getByText('You won that round!');
      expect(msg).toBeInTheDocument();
      expect(winMsg).toBeInTheDocument();
    });
  });
});
