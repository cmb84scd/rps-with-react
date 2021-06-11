// declare function loadImage(imgPath: string): void
// declare function image(
//     imgPath: string,
//     xPos: number,
//     yPos: number,
//     width: number,
//     height: number
// ): void
// declare function millis(): number

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
    // imageList: any[]
    // leftImage: string
    // rightImage: string
    message: string[]
    winMessage: string

    constructor() {
        this.userScore = 0
        this.computerScore = 0
        this.counter = 0
        // this.imageList = []
        // this.leftImage = ''
        // this.rightImage = ''
        this.message = []
        this.winMessage = ''
    }

    startGame(): void {
        this.userScore = 0
        this.computerScore = 0
        this.message = []
        this.winMessage = ''
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
        // this.setImageFromChoice(userGuess)
        let computerGuess: guess = this.getComputerMove()
        // this.setImageFromChoice(computerGuess)
        let winner: guess = this.calculateWinner(userGuess, computerGuess)
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
        else if (guessOne.move === moves.Rock && guessTwo.move === moves.Paper)
            return guessTwo
        else if (guessOne.move === moves.Paper && guessTwo.move === moves.Scissors)
            return guessTwo
        else if (guessOne.move === moves.Scissors && guessTwo.move === moves.Rock)
            return guessTwo
        else
            return guessOne
    }

    // setImageFromChoice(choice: guess): void {
    //     if (choice.player === "User") {
    //         this.leftImage = this.imageList[choice.move]
    //     } else {
    //         this.rightImage = this.imageList[choice.move]
    //     }
    // }

    // preload(): void {
    //     this.imageList = [loadImage('../../img/rock.png'), loadImage('../../img/paper.png'), loadImage('../../img/scissors.png')]
    // }

    // draw(): void {
    //     var bobAmount = Math.sin(millis() / 60) * 3
    //     if (this.leftImage) {
    //         image(
    //             this.leftImage,
    //             100,
    //             window.innerHeight / 2 - 263 + 100 + bobAmount,
    //             263,
    //             263
    //         )
    //     }
    //     if (this.rightImage) {
    //         image(
    //             this.rightImage,
    //             window.innerWidth - 263 - 100,
    //             window.innerHeight / 2 - 263 + 100 + bobAmount,
    //             263,
    //             263
    //         )
    //     }
    // }
}
let game = new RockPaperScissors()
export default game
