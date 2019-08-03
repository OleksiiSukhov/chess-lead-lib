import { cloneDeep } from "lodash";
import { King } from "../../chess-pieces/king";
import { BoardState } from "../../models/board-state";
import { Cell } from "../cell";
import { Movements } from "./movements";

export class RookMovements extends Movements {
  constructor() {
    super();

    this.maxMovementSquares = 7;
    this.directions = [
      { row: 0, column: -1 },
      { row: 0, column: 1 },
      { row: -1, column: 0 },
      { row: 1, column: 0 },
    ];
  }

  public getAvailable(
    boardState: BoardState,
    currentCell: Cell,
    checkCheckingNeeded: boolean,
  ): Cell[] {
    this.validateGetAvailableArguments(boardState.board, currentCell);

    let availableSquares = this.getAvailableBasedOnDirections(boardState.board, currentCell);

    if (!checkCheckingNeeded) {
      return availableSquares;
    }

    const initialSquareState = cloneDeep(
      boardState.board[currentCell.rowIndex][currentCell.columnIndex],
    );

    if (!initialSquareState.chessPiece) {
      throw Error("chess piece for current square should be defined");
    }

    const currentChessPieceColor = initialSquareState.chessPiece.color;

    let allyKingSquare: Cell | undefined;

    for (let row = 0; row < 8; row++) {
      if (allyKingSquare) {
        break;
      }

      for (let cell = 0; cell < 8; cell++) {
        const chessPiece = boardState.board[row][cell].chessPiece;

        if (
          chessPiece &&
          chessPiece instanceof King &&
          chessPiece.color === currentChessPieceColor
        ) {
          allyKingSquare = boardState.board[row][cell];
          break;
        }
      }
    }

    const boardStateCopy = cloneDeep(boardState);

    // remove current chess piece from current cell
    boardStateCopy.board[currentCell.rowIndex][currentCell.columnIndex].chessPiece = undefined;

    // make a test move (using initial list of available cells)
    availableSquares.forEach(availableSquare => {
      const previousSquareState = cloneDeep(
        boardStateCopy.board[availableSquare.rowIndex][availableSquare.columnIndex],
      );

      // simulate move of current cess piece to next available cell
      boardStateCopy.board[availableSquare.rowIndex][
        availableSquare.columnIndex
      ].chessPiece = cloneDeep(initialSquareState.chessPiece);

      // get all enemies available cells
      boardStateCopy.board.forEach(boardRow => {
        boardRow.forEach(boardCell => {
          const chessPiece = boardCell.chessPiece;
          if (!chessPiece || chessPiece.color === currentChessPieceColor) {
            return;
          }

          // get available cells for current chess piece
          const enemyAvailableCells = chessPiece
            .movements()
            .getAvailable(boardStateCopy, boardCell, false);

          // check if current color king is in check for current enemyAvailableCells
          const isKingInCheck = enemyAvailableCells.some(enemyAvailableCell => {
            if (!allyKingSquare) {
              return false;
            }

            return (
              enemyAvailableCell.rowIndex === allyKingSquare.rowIndex &&
              enemyAvailableCell.columnIndex === allyKingSquare.columnIndex
            );
          });

          if (isKingInCheck) {
            availableSquares = availableSquares.filter(
              square =>
                square.rowIndex !== availableSquare.rowIndex ||
                square.columnIndex !== availableSquare.columnIndex,
            );
          }
        });
      });

      // restore previousSquareState and initial current cell on the board
      boardStateCopy.board[availableSquare.rowIndex][
        availableSquare.columnIndex
      ] = previousSquareState;
    });

    return availableSquares;
  }
}
