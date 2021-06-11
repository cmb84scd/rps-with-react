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
  userImage: string,
  compImage: string }> {

  constructor(props: any) {
    super(props);
    this.state = {
      showStart: true,
      msg: '',
      msg1: '',
      msg2: '',
      winMsg: '',
      userImage: '',
      compImage: ''
    }
  }

  handleStart() {
    this.setState({
      showStart: false,
      msg: '',
      msg1: '',
      msg2: '',
      winMsg: '',
      userImage: '',
      compImage: ''
    })
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

  renderUserImage(choice: number){
    if(choice === 0){
      this.setState({userImage: rock})
    }else if(choice === 1){
      this.setState({userImage: paper})
    }else{
      this.setState({userImage: scissors})
    }
  }

  renderCompImage(){
    if(game.computerGuess.move === 0){
      this.setState({compImage: rock})
    }else if(game.computerGuess.move === 1){
      this.setState({compImage: paper})
    }else{
      this.setState({compImage: scissors})
    }
  }

  handleEnd() {
    if(game.winMessage !== ''){
      this.setState({showStart: true})
    }
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
                <button onClick={() => this.handleGame(0)}>Rock</button>
                <button onClick={() => this.handleGame(1)}>Paper</button>
                <button onClick={() => this.handleGame(2)}>Scissors</button>
              </div>
            </>
          }
          {this.state.userImage !== "" &&
            <>
            <h3>{this.state.msg}<br></br>
            {this.state.msg1}<br></br>
            {this.state.msg2}</h3>
            <h1>{this.state.winMsg}</h1>
            <div className="left-image"><img src={this.state.userImage} alt="user-img"></img></div>
            <div className="right-image"><img src={this.state.compImage} alt="comp-img"></img></div>
            </>
          }
        </div>
      </div>
    );
  }
}

export default App;
