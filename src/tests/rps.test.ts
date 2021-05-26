import game from "../models/rps"

describe('RockPaperScissors', () => {
    describe('Startgame', () => {
        it('the scores are 0', () => {
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toBe(0)
            expect(game.counter).toBe(0)
        });

        it('the messages are empty', () => {
            expect(game.message).toStrictEqual([])
            expect(game.winMessage).toBe('')
        });

        it('resets the scores to zero', () => {
            game.userScore = 2
            game.computerScore = 1
            game.startGame()
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toBe(0)
        });

        it('resets the messages', () => {
            game.message = ['You win', 'Comp wins', 'You win']
            game.winMessage = 'You won this round'
            game.startGame()
            expect(game.message).toStrictEqual([])
            expect(game.winMessage).toBe('')
        });
    });

    describe('handleUserChoice', () => {
        beforeEach(() => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0);
        });

        afterEach(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        });
        
        it('the user wins the first play', () => {
            game.handleUserChoice(1)
            expect(game.userScore).toBe(1)
            expect(game.message).toStrictEqual(['User wins with Paper'])
            expect(game.counter).toBe(1)
        });

        it('the user wins the second play and the game', () => {
            game.handleUserChoice(1)
            expect(game.userScore).toBe(2)
            expect(game.message).toStrictEqual(['User wins with Paper', 'User wins with Paper'])
            expect(game.counter).toBe(0)
            expect(game.winMessage).toBe('You won that round!')
        });
    });
});
