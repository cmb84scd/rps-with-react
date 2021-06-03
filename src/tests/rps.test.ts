import { useCallback } from "react";
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
            game.winMessage = 'You won that round!'
            game.startGame()
            expect(game.message).toStrictEqual([])
            expect(game.winMessage).toBe('')
        });
    });

    describe('handleUserChoice with comp choosing Rock', () => {
        beforeEach(() => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0);
        });

        afterEach(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        });

        it('the user wins the first play', () => {
            game.handleUserChoice(1)
            expect(game.userScore).toBe(1)
            expect(game.computerScore).toBe(0)
            expect(game.message).toStrictEqual(['User wins with Paper'])
            expect(game.counter).toBe(1)
        });

        it('the user wins the second play and the game', () => {
            game.handleUserChoice(1)
            expect(game.userScore).toBe(2)
            expect(game.computerScore).toBe(0)
            expect(game.message).toStrictEqual(['User wins with Paper', 'User wins with Paper'])
            expect(game.counter).toBe(0)
            expect(game.winMessage).toBe('You won that round!')
        });
    });

    describe('handleUserChoice with comp choosing Scissors', () => {
        beforeEach(() => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
            // Due to the way the spy is working, 0.8 = 2.
        });

        afterEach(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        });

        it('the computer wins the first play', () => {
            game.startGame()
            game.handleUserChoice(1)
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toStrictEqual(1)
            expect(game.message).toStrictEqual(['Computer wins with Scissors'])
            expect(game.counter).toBe(1)
        });

        it('the computer wins the second play and the game', () => {
            game.handleUserChoice(1)
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toStrictEqual(2)
            expect(game.message).toStrictEqual(['Computer wins with Scissors', 'Computer wins with Scissors'])
            expect(game.counter).toBe(0)
            expect(game.winMessage).toBe('You lost that round!')
        });
    });

    describe('handleUserChoice with comp choosing Paper', () => {
        beforeEach(() => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
            // Due to the way the spy is working, 0.5 = 1.
        });

        afterEach(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        });

        it('the first play is drawn', () => {
            game.startGame()
            game.handleUserChoice(1)
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toStrictEqual(0)
            expect(game.message).toStrictEqual(['Neither wins with Paper'])
            expect(game.counter).toBe(1)
        });

        it('the second play is drawn', () => {
            game.handleUserChoice(1)
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toStrictEqual(0)
            expect(game.message).toStrictEqual(['Neither wins with Paper', 'Neither wins with Paper'])
            expect(game.counter).toBe(2)
        });

        it('the third play and the game is drawn', () => {
            game.handleUserChoice(1)
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toStrictEqual(0)
            expect(game.message).toStrictEqual(['Neither wins with Paper', 'Neither wins with Paper', 'Neither wins with Paper'])
            expect(game.counter).toBe(0)
            expect(game.winMessage).toBe('You drew that round')
        });
    });
});
