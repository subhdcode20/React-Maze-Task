import React, { Component} from 'react';
import GameBoard from '../components/gameBoard'
import _ from 'lodash'
import KeyHandler, {KEYPRESS} from 'react-key-handler';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boardHeight:10,
      boardWidth:10,
      randomPositions:[],
      playerPosition: {x: 0, y: 0},
      prevPlayerPos: {x: 0, y: 0},
      totalMoves: 0,
      // totalObstaclesLeft: 0
    }
    this.generateRandomObstacles= this.generateRandomObstacles.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyRight = this.handleKeyRight.bind(this)
    this.handleKeyLeft = this.handleKeyLeft.bind(this)
    this.countTotalMoves = this.countTotalMoves.bind(this)
    this.setGameEndCount = this.setGameEndCount.bind(this)
  }
  componentWillMount() {
    let { boardHeight, boardWidth} = this.state
    let playerPosition =  {x: Math.floor(boardHeight/2), y: Math.floor(boardWidth/2)}
    this.setState({playerPosition})
  }
  componentDidMount() {
    this.generateRandomObstacles()
  }

  generateRandomObstacles() {
    let {randomPositions} = this.state
    // randomPositions = _.times(5, _.random(0, 10))
    let randomValues = []
    for(let i=0; i<5; i++) {
      randomValues.push(_.random(0,9))
      console.log('randomValues=', randomValues);
    }
    for(let i=0; i<randomValues.length; i++) {
      for(let j=0; j<randomValues.length; j++) {
        if(i != j && randomValues[i] != randomValues[j]) {
          let newRandomPosition = {
            x: randomValues[i],
            y: randomValues[j]
          }
          if(!randomPositions.includes(newRandomPosition)) {
            randomPositions.push(newRandomPosition)
          }
        }
      }
    }
    console.log('randomPositions=', randomPositions);
    this.setState({randomPositions})
    // totalObstaclesLeft: randomPositions.length
  }
  countTotalMoves() {
    this.setState({totalMoves: ++this.state.totalMoves})
  }
  handleKeyUp(e) {
    e.preventDefault()
    console.log("handleKeyPress", e);
    let {playerPosition, boardHeight, boardWidth} = this.state
    console.log('current x position', playerPosition);
    let prevPos = {
      x: playerPosition.x,
      y: playerPosition.y
    }
    let newX = playerPosition.x
    if(--newX >= 0) {
      console.log('new x position', newX);
      playerPosition["x"] = newX
      this.setState({playerPosition, prevPlayerPos: prevPos})
      this.countTotalMoves()
    }
  }
  handleKeyDown(e) {
    e.preventDefault()
    console.log("handleKeyPress", e);
    let {playerPosition, boardHeight, boardWidth} = this.state
    console.log('current x position', playerPosition);
    let prevPos = {
      x: playerPosition.x,
      y: playerPosition.y
    }
    console.log('current prevPosition', prevPos);
    let newX = playerPosition.x
    if(++newX < boardHeight) {
      console.log('new x position', newX);
      playerPosition["x"] = newX
      this.setState({playerPosition, prevPlayerPos: prevPos})
      this.countTotalMoves()
    }
  }
  handleKeyRight(e) {
    e.preventDefault()
    console.log("handleKeyPress", e);
    let {playerPosition, boardHeight, boardWidth} = this.state
    console.log('current y position', playerPosition);
    let prevPos = {
      x: playerPosition.x,
      y: playerPosition.y
    }
    console.log('current prevPosition', prevPos);
    let newY = playerPosition.y
    if(++newY < boardHeight) {
      console.log('new y position', newY);
      playerPosition["y"] = newY
      this.setState({playerPosition, prevPlayerPos: prevPos})
      this.countTotalMoves()
    }
  }
  handleKeyLeft(e) {
    e.preventDefault()
    console.log("handleKeyPress", e);
    let {playerPosition, boardHeight, boardWidth} = this.state
    console.log('current x position', playerPosition);
    let prevPos = {
      x: playerPosition.x,
      y: playerPosition.y
    }
    let newY = playerPosition.y
    if(--newY >= 0) {
      console.log('new y position', newY);
      playerPosition["y"] = newY
      this.setState({playerPosition, prevPlayerPos: prevPos})
      this.countTotalMoves()
    }
  }
  setGameEndCount() {
    // this.setState({totalObstaclesLeft: --this.state.totalObstaclesLeft})
  }
  render() {
    console.log('game state = ', this.state);
    return (
      <div>
        <KeyHandler keyValue="ArrowUp" onKeyHandle={this.handleKeyUp}/>
        <KeyHandler keyValue="ArrowDown" onKeyHandle={this.handleKeyDown}/>
        <KeyHandler keyValue="ArrowRight" onKeyHandle={this.handleKeyRight}/>
        <KeyHandler keyValue="ArrowLeft" onKeyHandle={this.handleKeyLeft}/>

        <GameBoard randomPositions={this.state.randomPositions} boardWidth={this.state.boardWidth}  boardHeight={this.state.boardHeight} playerPosition={this.state.playerPosition}
        prevPlayerPos={this.state.prevPlayerPos} totalMoves={this.state.totalMoves}
        />
      </div>
    )
  }
}

export default Game
