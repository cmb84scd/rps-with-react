import React from 'react';
import './App.css';
import game from "./models/rps"
import rock from "./img/rock.png"
import paper from "./img/paper.png"
import scissors from "./img/scissors.png"

class App extends React.Component<{}, {
  showStart: boolean,
  msg: string,
  msg1: string,
  msg2: string,
  winMsg: string,
  userImage: string[],
  compImage: string[],
  userName: string
}> {

  constructor(props: any) {
    super(props);
    this.state = {
      showStart: true,
      msg: '',
      msg1: '',
      msg2: '',
      winMsg: '',
      userImage: [],
      compImage: [],
      userName: ''
    }
  }

  handleStart() {
    this.setState({
      showStart: false,
      msg: '',
      msg1: '',
      msg2: '',
      winMsg: '',
      userImage: [],
      compImage: []
    })
    game.setUserName(this.state.userName)
    game.startGame()
  }

  handleGame(choice: number) {
    game.handleUserChoice(choice)
    this.renderUserImage(choice)
    this.renderCompImage()
    this.setState({
      msg: game.message[0],
      msg1: game.message[1],
      msg2: game.message[2],
      winMsg: game.winMessage
    })
    this.handleEnd()
  }

  renderUserImage(choice: number) {
    if (choice === 0) {
      this.setState({ userImage: [rock, 'user-rock'] })
    } else if (choice === 1) {
      this.setState({ userImage: [paper, 'user-paper'] })
    } else {
      this.setState({ userImage: [scissors, 'user-scissors'] })
    }
  }

  renderCompImage() {
    if (game.computerGuess.move === 0) {
      this.setState({ compImage: [rock, 'comp-rock'] })
    } else if (game.computerGuess.move === 1) {
      this.setState({ compImage: [paper, 'comp-paper'] })
    } else {
      this.setState({ compImage: [scissors, 'comp-scissors'] })
    }
  }

  handleEnd() {
    if (game.winMessage !== '') {
      this.setState({ showStart: true })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="game-wrapper">
          {this.state.showStart === true &&
            <>
              <h1>Rock Paper Scissors</h1>
              <h1>Let's Play!</h1>
              <h3>Please enter your name for a more personal experience:</h3>
              <input type="text" value={this.state.userName} onChange={(e) => this.setState({ userName: e.currentTarget.value })}></input><br></br>
              <button onClick={() => this.handleStart()} className="start-button">Start Game</button>
            </>
          }
          {this.state.showStart === false &&
            <>
              {this.state.userName !== '' &&
                <h2>{this.state.userName} vs Computer!<br></br><br></br>It's a best of 3 game, so make your choice(s) to play<br></br>Rock Paper Scissors!</h2>
              }
              {this.state.userName === '' &&
                <h2>User vs Computer!<br></br><br></br>It's a best of 3 game, so make your choice(s) to play<br></br>Rock Paper Scissors!</h2>
              }
              <div className="game-buttons">
                <button onClick={() => this.handleGame(0)}>Rock</button>
                <button onClick={() => this.handleGame(1)}>Paper</button>
                <button onClick={() => this.handleGame(2)}>Scissors</button>
              </div>
            </>
          }
          {this.state.msg !== "" &&
            <>
              <h3>{this.state.msg}<br></br>
                {this.state.msg1}<br></br>
                {this.state.msg2}</h3>
              <h1>{this.state.winMsg}</h1>
              <div className="left-image"><img src={this.state.userImage[0]} alt={this.state.userImage[1]}></img></div>
              <div className="right-image"><img src={this.state.compImage[0]} alt={this.state.compImage[1]}></img></div>
            </>
          }
        </div>
      </div>
    );
  }
}

export default App;
