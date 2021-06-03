import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';

describe('playing the game', () => {

  beforeEach(() => render(<App />));

  it('renders start game button', () => {
    const startButton = screen.getByRole('button', { name: 'Start Game' });
    expect(startButton).toBeInTheDocument();
  });

  it('renders game buttons upon clicking start game', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
    const rockButton = screen.getByRole('button', { name: 'Rock' });
    const paperButton = screen.getByRole('button', { name: 'Paper' });
    const scissorsButton = screen.getByRole('button', { name: 'Scissors' });
    expect(rockButton).toBeInTheDocument();
    expect(paperButton).toBeInTheDocument();
    expect(scissorsButton).toBeInTheDocument();
  });

  describe('playing with comp choosing rock', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
    });

    afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('the user wins the first play', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      fireEvent.click(screen.getByRole('button', { name: 'Paper' }));
      const msgHeading = screen.getByRole('heading', { name: 'User wins with Paper' });
      expect(msgHeading).toBeInTheDocument();
    });

    it('the user wins the second play and the game', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      fireEvent.click(screen.getByRole('button', { name: 'Paper' }));
      fireEvent.click(screen.getByRole('button', { name: 'Paper' }));
      const msgHeading = screen.getByRole('heading', { name: 'User wins with Paper User wins with Paper' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You won that round!' });
      expect(msgHeading).toBeInTheDocument();
      expect(winMsgHeading).toBeInTheDocument();
    });
  });

  describe('playing with comp choosing scissors', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
      // Due to the way the spy is working, 0.8 = 2.
    });

    afterAll(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('the computer wins the first play', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      fireEvent.click(screen.getByRole('button', { name: 'Paper' }));
      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Scissors' });
      expect(msgHeading).toBeInTheDocument();
    });

    it('the computer wins the second play and the game', () => {
      fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      fireEvent.click(screen.getByRole('button', { name: 'Paper' }));
      fireEvent.click(screen.getByRole('button', { name: 'Paper' }));
      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Scissors Computer wins with Scissors' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You lost that round!' });
      expect(msgHeading).toBeInTheDocument();
      expect(winMsgHeading).toBeInTheDocument();
    });
  });

  describe('playing with different user/comp selections', () => {
    afterAll(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('the computer wins the first play', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // 0.5 = 1
      fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      fireEvent.click(screen.getByRole('button', { name: 'Rock' }));
      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Paper' });
      expect(msgHeading).toBeInTheDocument();
    });

    it('the user wins the second play', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
      fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      fireEvent.click(screen.getByRole('button', { name: 'Rock' }));
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      fireEvent.click(screen.getByRole('button', { name: 'Paper' }));
      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Paper User wins with Paper' });
      expect(msgHeading).toBeInTheDocument();
    });

    it('the third play and the game is drawn', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
      fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      fireEvent.click(screen.getByRole('button', { name: 'Rock' }));
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      fireEvent.click(screen.getByRole('button', { name: 'Paper' }));
      jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
      fireEvent.click(screen.getByRole('button', { name: 'Scissors' }));
      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Paper User wins with Paper Neither wins with Scissors' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You drew that round' });
      expect(msgHeading).toBeInTheDocument();
      expect(winMsgHeading).toBeInTheDocument();
    });
  });
});
