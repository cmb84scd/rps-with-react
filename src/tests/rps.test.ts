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

        afterAll(() => {
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

    describe('handleUserChoice with comp choosing Scissors, then paper', () => {
        afterAll(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        });

        it('the computer wins the first play', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.8); // 0.8 = 2
            game.startGame()
            game.handleUserChoice(1)
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toStrictEqual(1)
            expect(game.message).toStrictEqual(['Computer wins with Scissors'])
            expect(game.counter).toBe(1)
        });

        it('the computer wins the second play and the game', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // 0.5 = 1
            game.handleUserChoice(0)
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toStrictEqual(2)
            expect(game.message).toStrictEqual(['Computer wins with Scissors', 'Computer wins with Paper'])
            expect(game.counter).toBe(0)
            expect(game.winMessage).toBe('You lost that round!')
        });
    });

    describe('handleUserChoice with different comp selections', () => {
        afterAll(() => {
            jest.spyOn(global.Math, 'random').mockRestore();
        });

        it('the computer wins the first play with rock', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0);
            game.startGame()
            game.handleUserChoice(2)
            expect(game.userScore).toBe(0)
            expect(game.computerScore).toStrictEqual(1)
            expect(game.message).toStrictEqual(['Computer wins with Rock'])
            expect(game.counter).toBe(1)
        });

        it('the player wins the second play', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
            game.handleUserChoice(0)
            expect(game.userScore).toBe(1)
            expect(game.computerScore).toStrictEqual(1)
            expect(game.message).toStrictEqual(['Computer wins with Rock', 'User wins with Rock'])
            expect(game.counter).toBe(2)
        });

        it('the third play and the game is drawn', () => {
            jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
            game.handleUserChoice(1)
            expect(game.userScore).toBe(1)
            expect(game.computerScore).toStrictEqual(1)
            expect(game.message).toStrictEqual(['Computer wins with Rock', 'User wins with Rock', 'Neither wins with Paper'])
            expect(game.counter).toBe(0)
            expect(game.winMessage).toBe('You drew that round')
        });
    });
});
