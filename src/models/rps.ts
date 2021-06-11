interface guess {
    move: number // 0, 1 or 2
    player: string // "User" or "Computer"
}

enum moves {
    Rock,
    Paper,
    Scissors
}

class RockPaperScissors {
    userScore: number
    computerScore: number
    counter: number
    message: string[]
    winMessage: string
    computerGuess: guess

    constructor() {
        this.userScore = 0
        this.computerScore = 0
        this.counter = 0
        this.message = []
        this.winMessage = ''
        this.computerGuess = {} as any
    }

    startGame(): void {
        this.userScore = 0
        this.computerScore = 0
        this.message = []
        this.winMessage = ''
        this.computerGuess = {} as any
    }

    getComputerMove() {
        let move = Math.floor(Math.random() * 3)
        return {
            move: move,
            player: "Computer"
        }
    }

    handleUserChoice(choice: number): void {
        let userGuess: guess = {
            move: choice,
            player: "User"
        }
        this.computerGuess = this.getComputerMove()
        let winner: guess = this.calculateWinner(userGuess, this.computerGuess)
        if (winner.player === "User") this.userScore++
        if (winner.player === "Computer") this.computerScore++
        this.message.push(`${winner.player} wins with ${moves[winner.move]}`)
        this.checkRoundProgress()
    }

    checkRoundProgress(): void {
        this.counter++
        if (this.userScore === 2 || this.computerScore === 2 || this.counter === 3) {
            this.counter = 0
            if (this.userScore > this.computerScore) this.winMessage = "You won that round!"
            else if (this.userScore === this.computerScore) this.winMessage = "You drew that round"
            else this.winMessage = "You lost that round!"
        }
    }

    calculateWinner(guessOne: guess, guessTwo: guess): guess {
        if (guessOne.move === guessTwo.move)
            return {player: "Neither", move: guessOne.move}
        else if ((guessOne.move === moves.Rock && guessTwo.move === moves.Paper) ||
            (guessOne.move === moves.Paper && guessTwo.move === moves.Scissors) ||
            (guessOne.move === moves.Scissors && guessTwo.move === moves.Rock))
            return guessTwo
        else
            return guessOne
    }
}
let game = new RockPaperScissors()
export default game
