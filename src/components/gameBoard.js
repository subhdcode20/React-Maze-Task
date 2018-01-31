import React, { Component} from 'react';
import {Grid} from 'semantic-ui-react'
import pressed from "pressed"
// Initialize the system
pressed.start()

class GameBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boardHeight: 10,
      boardWidth: 10,
      // playerPosition: {x:0, y:0},
      board: [],
      entityStates: {
        obstacle: 'X',
        empty: ' ',
        player: 'O'
      }
    }
    this.setObstacles = this.setObstacles.bind(this)
    this.setPlayerPosition = this.setPlayerPosition.bind(this)
    this.setBoard = this.setBoard.bind(this)
    // this.checkGameEnd = this.checkGameEnd.bind(this)
  }
  componentWillMount() {
    let { boardHeight, boardWidth, playerPosition} = this.props
    let board = []
    console.log('this in will mount', this);
    // let playerPosition =  {x:Math.floor(boardHeight/2), y: Math.floor(boardWidth/2)}
    for(let i=0; i<boardHeight; i++) {
      let innerArray = []
      // obj["array"] = []
      for(let j=0; j<boardWidth; j++) {
        let obj = {}
        obj['x'] = i
        obj['y'] = j
        if(playerPosition.x == i && playerPosition.y == j) {
          console.log('found player at ' , i, j);
          obj['state'] = this.state.entityStates.player
          console.log('obj player= ', obj);
        } else {
          obj['state'] = this.state.entityStates.empty
        }
        // innerArray.push(obj)
        let temp = []
        innerArray.push(obj)
        temp.push(obj)
        if(obj.state == 'O') {
          console.log('innerArray player= ', obj, innerArray);
          console.log('temp ', temp);
        }
      }
      board.push(innerArray)

      // throw Error('check')
    }
    console.log('board in will mount=', board, playerPosition)
    this.setState({board: board, playerPosition }, ()=> {
      console.log('board state set', this.state.board);
      this.setPlayerPosition(playerPosition)
      this.setObstacles(this.props.randomPositions)
    })
  }
  setPlayerPosition(playerPosition) {
    let {board} = this.state
    board[playerPosition.x][playerPosition.y]["state"] = this.state.entityStates.player
    console.log("board player =", board[playerPosition.x][playerPosition.y]);
    this.setState({board})
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps= ', nextProps, this.state);
    if(nextProps === this.props) {

    } else {
      this.setBoard(nextProps)
    }
  }
  // checkGameEnd() {
  //   if(endCount == 1) {
  //     alert("Congratulations! Game Over. Total Moves: " + this.props.totalMoves)
  //   }
  // }
  setBoard(props) {
    let { boardHeight, boardWidth, playerPosition, prevPlayerPos} = props
    let newTotalObstacles = this.state.totalObstaclesLeft
    console.log('totalObstaclesLeft in  setBoard', this.state, (this.state.totalObstaclesLeft && this.state.totalObstaclesLeft == 0));
    if(this.state.totalObstaclesLeft != undefined && this.state.totalObstaclesLeft === 0) {
      console.log('last obstacle');
        alert("Congratulations! Game Over. Total Moves: " + this.props.totalMoves)
    } else {

    console.log('set board prev player pos ', prevPlayerPos);
    console.log('set board prev player pos ', playerPosition);
    let {board} = this.state
    // let board = []
    console.log('this in setBoard', this);
    let newPlayerPos = playerPosition
    if(board[newPlayerPos.x][newPlayerPos.y]["state"] == this.state.entityStates.obstacle) {
      // this.props.setGameEndCount()
      --newTotalObstacles
    }
    board[newPlayerPos.x][newPlayerPos.y]["state"] = this.state.entityStates.player
    board[prevPlayerPos.x][prevPlayerPos.y]["state"] = this.state.entityStates.empty
    this.setState({board: board, playerPosition , totalObstaclesLeft: newTotalObstacles}, ()=> {
      console.log('board state set', this.state.board);
      this.setPlayerPosition(playerPosition)
      // this.setObstacles(this.props.randomPositions)
    })
    }
  }
  setObstacles(randomPositions) {
    let {board, playerPosition} = this.state
    console.log('in setObstacles = ', board, randomPositions);
    let totalObstaclesLeft = 0
    for(let i=0; i<randomPositions.length; i++) {
      if(randomPositions[i].x != playerPosition.x && randomPositions[i].y != playerPosition.y) {
        console.log('randomPositions index =', i);
        console.log("values at index= ",randomPositions[i].x, randomPositions[i].y);
        console.log('board for values= ', board[randomPositions[i].x][randomPositions[i].y]);
        if(board[randomPositions[i].x][randomPositions[i].y]["state"] != this.state.entityStates.obstacle) {
          ++totalObstaclesLeft
          board[randomPositions[i].x][randomPositions[i].y]["state"] = this.state.entityStates.obstacle
        } else {
          console.log('SAME OBSTACLE POSITION');
        }
      }
    }
    this.setState({board, totalObstaclesLeft})
    console.log('board after obstacles=', board);
  }
  render() {
    let {board} = this.state
    console.log('board=', board);
    console.log(this.props);
    if(pressed('down')) {
      console.log('pressed down');
    }
    return (
      <table style={{width: 500}}>
      <tbody>
        {board.map((item, index) => (
          <tr style={{width: 500}} >
            {
              item.map((innerItem) => (
                <td style={{border: "2px solid black", margin: 0, width: 50, height: 40, textAlign: 'center', verticalAlign: 'middle'}}>
                  <p>{innerItem.state}</p>
                </td>
              ))
            }
          </tr>
        ))}
        </tbody>
      </table>
    )
  }
}

export default GameBoard
