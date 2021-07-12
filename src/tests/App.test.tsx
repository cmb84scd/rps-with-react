import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import game from '../models/rps';

describe('playing the game', () => {

  beforeEach(() => render(<App />));

  describe('render right buttons and clear screen at the right time', () => {
    it('renders start game button when page loads', () => {
      const startButton = screen.getByRole('button', { name: 'Start Game' });
      expect(startButton).toBeInTheDocument();
    });

    it('renders game buttons upon clicking start game', () => {
      const startButton = screen.getByRole('button', { name: 'Start Game' });
      userEvent.click(startButton);

      const rockButton = screen.getByRole('button', { name: 'Rock' });
      const paperButton = screen.getByRole('button', { name: 'Paper' });
      const scissorsButton = screen.getByRole('button', { name: 'Scissors' });

      expect(rockButton).toBeInTheDocument();
      expect(paperButton).toBeInTheDocument();
      expect(scissorsButton).toBeInTheDocument();
      expect(startButton).not.toBeInTheDocument();
    });

    it('renders start game button when game ends', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));

      const rockButton = screen.getByRole('button', { name: 'Rock' });
      const paperButton = screen.getByRole('button', { name: 'Paper' });
      const scissorsButton = screen.getByRole('button', { name: 'Scissors' });

      userEvent.click(scissorsButton);
      userEvent.click(scissorsButton);

      expect(screen.getByRole('button', { name: 'Start Game' })).toBeInTheDocument();
      expect(rockButton).not.toBeInTheDocument();
      expect(paperButton).not.toBeInTheDocument();
      expect(scissorsButton).not.toBeInTheDocument();
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('clears messages and images from previous game on starting a new one', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      userEvent.click(screen.getByRole('button', { name: 'Scissors' }));
      userEvent.click(screen.getByRole('button', { name: 'Scissors' }));

      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Rock Computer wins with Rock' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You lost that round!' });
      const userImg = screen.getByRole('img', { name: 'user-scissors' });
      const compImg = screen.getByRole('img', { name: 'comp-rock' });

      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));

      expect(msgHeading).not.toBeInTheDocument();
      expect(winMsgHeading).not.toBeInTheDocument();
      expect(userImg).not.toBeInTheDocument();
      expect(compImg).not.toBeInTheDocument();
      jest.spyOn(global.Math, 'random').mockRestore();
    });
  });

  describe('setting an optional username', () => {
    it('allows you to set a username', () => {
      userEvent.type(screen.getByRole('textbox'), 'Cat');
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      const heading = screen.getByRole('heading', { name: "Cat vs Computer! It's a best of 3 game, so make your choice(s) to play Rock Paper Scissors!" });
      expect(heading).toBeInTheDocument();
    });

    it('defaults to User if no name is entered', () => {
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      const heading = screen.getByRole('heading', { name: "User vs Computer! It's a best of 3 game, so make your choice(s) to play Rock Paper Scissors!" });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('playing with comp choosing rock', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
    });

    afterAll(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('the user wins the first play', () => {
      userEvent.type(screen.getByRole('textbox'), 'Cat');
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      userEvent.click(screen.getByRole('button', { name: 'Paper' }));

      const msgHeading = screen.getByRole('heading', { name: 'Cat wins with Paper' });
      const userImg = screen.getByRole('img', { name: 'user-paper' });
      const compImg = screen.getByRole('img', { name: 'comp-rock' });

      expect(msgHeading).toBeInTheDocument();
      expect(userImg).toHaveAttribute('src', 'paper.png');
      expect(compImg).toHaveAttribute('src', 'rock.png');
    });

    it('the user wins the second play and the game', () => {
      userEvent.type(screen.getByRole('textbox'), 'Cat');
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      userEvent.click(screen.getByRole('button', { name: 'Paper' }));
      userEvent.click(screen.getByRole('button', { name: 'Paper' }));

      const msgHeading = screen.getByRole('heading', { name: 'Cat wins with Paper Cat wins with Paper' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You won that round!' });

      expect(msgHeading).toBeInTheDocument();
      expect(winMsgHeading).toBeInTheDocument();
    });
  });

  describe('playing with comp choosing scissors, then rock', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
      // Due to the way the spy is working, 0.8 = 2.
    });

    afterAll(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('the computer wins the first play', () => {
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      userEvent.click(screen.getByRole('button', { name: 'Paper' }));

      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Scissors' });
      const userImg = screen.getByRole('img', { name: 'user-paper' });
      const compImg = screen.getByRole('img', { name: 'comp-scissors' });

      expect(msgHeading).toBeInTheDocument();
      expect(userImg).toHaveAttribute('src', 'paper.png');
      expect(compImg).toHaveAttribute('src', 'scissors.png');
    });

    it('the computer wins the second play and the game', () => {
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      userEvent.click(screen.getByRole('button', { name: 'Paper' }));
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      userEvent.click(screen.getByRole('button', { name: 'Scissors' }));

      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Scissors Computer wins with Rock' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You lost that round!' });
      const userImg = screen.getByRole('img', { name: 'user-scissors' });
      const compImg = screen.getByRole('img', { name: 'comp-rock' });

      expect(msgHeading).toBeInTheDocument();
      expect(winMsgHeading).toBeInTheDocument();
      expect(userImg).toHaveAttribute('src', 'scissors.png');
      expect(compImg).toHaveAttribute('src', 'rock.png');
    });
  });

  describe('playing with different user/comp selections', () => {
    afterAll(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('the computer wins the first play', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // 0.5 = 1
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      userEvent.click(screen.getByRole('button', { name: 'Rock' }));

      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Paper' });
      const userImg = screen.getByRole('img', { name: 'user-rock' });
      const compImg = screen.getByRole('img', { name: 'comp-paper' });

      expect(msgHeading).toBeInTheDocument();
      expect(userImg).toHaveAttribute('src', 'rock.png');
      expect(compImg).toHaveAttribute('src', 'paper.png');
    });

    it('the user wins the second play', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      userEvent.click(screen.getByRole('button', { name: 'Rock' }));

      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      userEvent.click(screen.getByRole('button', { name: 'Paper' }));

      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Paper User wins with Paper' });

      expect(msgHeading).toBeInTheDocument();
    });

    it('the third play and the game is drawn', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
      userEvent.click(screen.getByRole('button', { name: 'Start Game' }));
      userEvent.click(screen.getByRole('button', { name: 'Rock' }));

      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      userEvent.click(screen.getByRole('button', { name: 'Paper' }));

      jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
      userEvent.click(screen.getByRole('button', { name: 'Scissors' }));

      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Paper User wins with Paper Neither wins with Scissors' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You drew that round' });
      const userImg = screen.getByRole('img', { name: 'user-scissors' });
      const compImg = screen.getByRole('img', { name: 'comp-scissors' });

      expect(msgHeading).toBeInTheDocument();
      expect(winMsgHeading).toBeInTheDocument();
      expect(userImg).toHaveAttribute('src', 'scissors.png');
      expect(compImg).toHaveAttribute('src', 'scissors.png');
    });
  });
});
