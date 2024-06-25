import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';

describe('playing the game', () => {
  describe('render right buttons and clear screen at the right time', () => {
    it('renders right buttons at the right time', async () => {
      const user = userEvent.setup()
      render(<App />)
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      const startButton = screen.getByRole('button', { name: 'Start Game' });
      expect(startButton).toBeInTheDocument();

      await user.click(startButton);

      const rockButton = screen.getByRole('button', { name: 'Rock' });
      const paperButton = screen.getByRole('button', { name: 'Paper' });
      const scissorsButton = screen.getByRole('button', { name: 'Scissors' });

      expect(rockButton).toBeInTheDocument();
      expect(paperButton).toBeInTheDocument();
      expect(scissorsButton).toBeInTheDocument();
      expect(startButton).not.toBeInTheDocument();

      await user.click(scissorsButton);
      await user.click(scissorsButton);

      expect(screen.getByRole('button', { name: 'Start Game' })).toBeInTheDocument();
      expect(rockButton).not.toBeInTheDocument();
      expect(paperButton).not.toBeInTheDocument();
      expect(scissorsButton).not.toBeInTheDocument();
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('clears messages and images from previous game on starting a new one', async () => {
      const user = userEvent.setup()
      render(<App />)
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      await user.click(screen.getByRole('button', { name: 'Start Game' }));
      await user.click(screen.getByRole('button', { name: 'Scissors' }));
      await user.click(screen.getByRole('button', { name: 'Scissors' }));

      const msgHeading = screen.getByRole('heading', { name: 'Computer wins with Rock Computer wins with Rock' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You lost that round!' });
      const userImg = screen.getByRole('img', { name: 'user-scissors' });
      const compImg = screen.getByRole('img', { name: 'comp-rock' });

      await user.click(screen.getByRole('button', { name: 'Start Game' }));

      expect(msgHeading).not.toBeInTheDocument();
      expect(winMsgHeading).not.toBeInTheDocument();
      expect(userImg).not.toBeInTheDocument();
      expect(compImg).not.toBeInTheDocument();
      jest.spyOn(global.Math, 'random').mockRestore();
    });
  });

  describe('setting an optional username', () => {
    it('allows you to set a username', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.type(screen.getByRole('textbox'), 'Cat');
      await user.click(screen.getByRole('button', { name: 'Start Game' }));
      const heading = screen.getByRole('heading', { name: "Cat vs Computer! It's a best of 3 game, so make your choice(s) to play Rock Paper Scissors!" });
      expect(heading).toBeInTheDocument();
    });

    it('defaults to User if no name is entered', async () => {
      const user = userEvent.setup()
      render(<App />)
      await user.click(screen.getByRole('button', { name: 'Start Game' }));
      const heading = screen.getByRole('heading', { name: "User vs Computer! It's a best of 3 game, so make your choice(s) to play Rock Paper Scissors!" });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('playing with comp choosing rock', () => {
    it('the user wins both plays and the game', async () => {
      const user = userEvent.setup()
      render(<App />)
      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      await user.type(screen.getByRole('textbox'), 'Cat');
      await user.click(screen.getByRole('button', { name: 'Start Game' }));
      await user.click(screen.getByRole('button', { name: 'Paper' }));

      const msgHeading1 = screen.getByRole('heading', { name: 'Cat wins with Paper' });
      const userImg = screen.getByRole('img', { name: 'user-paper' });
      const compImg = screen.getByRole('img', { name: 'comp-rock' });

      expect(msgHeading1).toBeInTheDocument();
      expect(userImg).toHaveAttribute('src', 'paper.png');
      expect(compImg).toHaveAttribute('src', 'rock.png');

      await user.click(screen.getByRole('button', { name: 'Paper' }));

      const msgHeading2 = screen.getByRole('heading', { name: 'Cat wins with Paper Cat wins with Paper' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You won that round!' });

      expect(msgHeading2).toBeInTheDocument();
      expect(winMsgHeading).toBeInTheDocument();
      jest.spyOn(global.Math, 'random').mockRestore();
    });
  });

  describe('playing with comp choosing scissors, then rock', () => {
    it('the computer wins both plays and the game', async () => {
      const user = userEvent.setup()
      render(<App />)
      jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
      // Due to the way the spy is working, 0.8 = 2.
      await user.click(screen.getByRole('button', { name: 'Start Game' }));
      await user.click(screen.getByRole('button', { name: 'Paper' }));

      const msgHeading1 = screen.getByRole('heading', { name: 'Computer wins with Scissors' });
      const userImg1 = screen.getByRole('img', { name: 'user-paper' });
      const compImg1 = screen.getByRole('img', { name: 'comp-scissors' });

      expect(msgHeading1).toBeInTheDocument();
      expect(userImg1).toHaveAttribute('src', 'paper.png');
      expect(compImg1).toHaveAttribute('src', 'scissors.png');

      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      await user.click(screen.getByRole('button', { name: 'Scissors' }));

      const msgHeading2 = screen.getByRole('heading', { name: 'Computer wins with Scissors Computer wins with Rock' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You lost that round!' });
      const userImg2 = screen.getByRole('img', { name: 'user-scissors' });
      const compImg2 = screen.getByRole('img', { name: 'comp-rock' });

      expect(msgHeading2).toBeInTheDocument();
      expect(winMsgHeading).toBeInTheDocument();
      expect(userImg2).toHaveAttribute('src', 'scissors.png');
      expect(compImg2).toHaveAttribute('src', 'rock.png');
      jest.spyOn(global.Math, 'random').mockRestore();
    });
  });

  describe('playing with different user/comp selections', () => {
    it('comp wins the first play, user the second, the third play and game is drawn', async () => {
      const user = userEvent.setup()
      render(<App />)
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // 0.5 = 1
      await user.click(screen.getByRole('button', { name: 'Start Game' }));
      await user.click(screen.getByRole('button', { name: 'Rock' }));

      const msgHeading1 = screen.getByRole('heading', { name: 'Computer wins with Paper' });
      const userImg1 = screen.getByRole('img', { name: 'user-rock' });
      const compImg1 = screen.getByRole('img', { name: 'comp-paper' });

      expect(msgHeading1).toBeInTheDocument();
      expect(userImg1).toHaveAttribute('src', 'rock.png');
      expect(compImg1).toHaveAttribute('src', 'paper.png');

      jest.spyOn(global.Math, 'random').mockReturnValue(0);
      await user.click(screen.getByRole('button', { name: 'Paper' }));

      const msgHeading2 = screen.getByRole('heading', { name: 'Computer wins with Paper User wins with Paper' });
      const userImg2 = screen.getByRole('img', { name: 'user-paper' });
      const compImg2 = screen.getByRole('img', { name: 'comp-rock' });

      expect(msgHeading2).toBeInTheDocument();
      expect(userImg2).toHaveAttribute('src', 'paper.png');
      expect(compImg2).toHaveAttribute('src', 'rock.png');

      jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
      await user.click(screen.getByRole('button', { name: 'Scissors' }));

      const msgHeading3 = screen.getByRole('heading', { name: 'Computer wins with Paper User wins with Paper Neither wins with Scissors' });
      const winMsgHeading = screen.getByRole('heading', { name: 'You drew that round' });
      const userImg3 = screen.getByRole('img', { name: 'user-scissors' });
      const compImg3 = screen.getByRole('img', { name: 'comp-scissors' });

      expect(msgHeading3).toBeInTheDocument();
      expect(winMsgHeading).toBeInTheDocument();
      expect(userImg3).toHaveAttribute('src', 'scissors.png');
      expect(compImg3).toHaveAttribute('src', 'scissors.png');
      jest.spyOn(global.Math, 'random').mockRestore();
    });
  });
});
