import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
      nrows: 5,
      ncols: 5,
      chanceLightStartsOn: 0.8
  }
  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
        hasWon: false,
        board: this.createBoard()
    }
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.randState = this.randState.bind(this);
    
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    
    // TODO: create array-of-arrays of true/false values
    for(let i=0; i < this.props.nrows; i++){
      let inner = [];
      for(let j=0; j < this.props.ncols; j++){
        inner.push(this.randState());
      }
      board.push(inner);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("FLIPPING!", coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // TODO: flip this cell and the cells around it
    flipCell(y,x);
    flipCell(y,x-1);
    flipCell(y,x+1);
    flipCell(y-1,x);
    flipCell(y+1,x);
    
    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(rows => rows.every(cells => !cells))
    this.setState({board, hasWon});
  }
  randState(){
      return Math.random() > this.props.chanceLightStartsOn
  }

  /** Render game board or winning message. */

  render() {
        if(this.state.hasWon){
          return (
            <div class="container Board-win">
              <div class="neon-orange">You </div>
              <div class="neon-blue"> Won! </div>
            </div>
          )
        }
        let tblBoard = []
        for(let y=0; y < this.props.nrows; y++){
          let rows = []
          for(let x=0 ; x < this.props.ncols; x++){
            let coord = `${y}-${x}`
            rows.push(<Cell key={coord} flipCellsAroundMe = {this.flipCellsAround.bind(this,coord)}isLit={this.state.board[y][x]}/>)
          }
          tblBoard.push(<tr>{rows}</tr>)
        }
        return(
        // if the game is won, just show a winning msg & render nothing else
          <div>
            <div class="container">
              <div class="neon-orange">Lights </div>
              <div class="neon-blue">Out </div>
            </div>
            <table className="Board">
              <tbody>
                {tblBoard}
              </tbody>
            </table>
          </div>

        // TODO

        // make table board

        // TODO

        )

  }
}


export default Board;


// {this.state.board.map(rows => (
//   <tr>
//     {rows.map(cols =>(
//       <Cell isLit={cols}/>
//     ))}
//   </tr>
// ))}