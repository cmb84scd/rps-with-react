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
            game.computerScore = 3
            game.startGame()
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toBe(0)
            expect(game.counter).toBe(0)
        });

        it('resets the messages', () => {
            game.message = ['You win', 'Comp wins', 'You win']
            game.winMessage = 'You won this round'
            game.startGame()
            expect(game.message).toStrictEqual([])
            expect(game.winMessage).toBe('')
        })
    });
});
