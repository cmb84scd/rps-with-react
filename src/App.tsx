import React from 'react';
import './App.css';
import game from "./models/rps"

class App extends React.Component<{}, { 
  showStart: boolean,
  msg: string,
  msg1: string,
  msg2: string,
  winMsg: string }> {
    
  constructor(props: any) {
    super(props);
    this.state = {
      showStart: true,
      msg: '',
      msg1: '',
      msg2: '',
      winMsg: ''
    }
  }

  handleStart() {
    this.setState({showStart: false})
    game.startGame()
  }

  handleUserChoice(choice: number) {
    game.handleUserChoice(choice)
    this.setState({
      msg: game.message[0],
      msg1: game.message[1],
      msg2: game.message[2],
      winMsg: game.winMessage
    })
  }

  render() {
    return (
      <div className="App">
        <div className="game-wrapper">
          {this.state.showStart === true &&
            <button onClick={() => this.handleStart()} className="start-button">
              Start Game
            </button>
          }
          {this.state.showStart === false &&
            <>
              <div className="game-buttons">
                <button onClick={() => this.handleUserChoice(0)}>Rock</button>
                <button onClick={() => this.handleUserChoice(1)}>Paper</button>
                <button onClick={() => this.handleUserChoice(2)}>Scissors</button>
              </div>
              {this.state.msg}<br></br>
              {this.state.msg1}<br></br>
              {this.state.msg2}<br></br><br></br>
              {this.state.winMsg}
            </>
          }
        </div>
      </div>
    );
  }
}

export default App;
