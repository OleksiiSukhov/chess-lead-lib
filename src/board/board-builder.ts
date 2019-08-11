import { Bishop } from "../chess-pieces/bishop";
import { King } from "../chess-pieces/king";
import { Knight } from "../chess-pieces/knight";
import { Pawn } from "../chess-pieces/pawn";
import { Queen } from "../chess-pieces/queen";
import { Rook } from "../chess-pieces/rook";
import { BoardState } from "../models/board-state";
import { Cell } from "../models/cell";
import { Color } from "../models/color";

export class BoardBuilder {
  public static createInitial(): BoardState {
    const boardState = new BoardState();
    boardState.nextTurn = Color.White;
    boardState.board = BoardBuilder.setupEmptyBoard();

    BoardBuilder.setMainChessPieces(boardState.board, Color.White);
    BoardBuilder.setMainChessPieces(boardState.board, Color.Black);

    BoardBuilder.setPawns(boardState.board, Color.White);
    BoardBuilder.setPawns(boardState.board, Color.Black);

    return boardState;
  }

  public static setupEmptyBoard(): Cell[][] {
    const cells: Cell[][] = [];

    for (let row = 0; row < 8; row++) {
      cells.push([]);
      for (let column = 0; column < 8; column++) {
        cells[row].push(new Cell(row, column));
      }
    }

    return cells;
  }

  private static setPawns(board: Cell[][], color: Color): void {
    const row = color === Color.White ? 1 : 6;

    for (let column = 0; column < 8; column++) {
      board[row][column].chessPiece = new Pawn(color);
    }
  }

  private static setMainChessPieces(board: Cell[][], color: Color): void {
    const row = color === Color.White ? 0 : 7;

    board[row][0].chessPiece = new Rook(color);
    board[row][1].chessPiece = new Knight(color);
    board[row][2].chessPiece = new Bishop(color);
    board[row][3].chessPiece = new Queen(color);
    board[row][4].chessPiece = new King(color);
    board[row][5].chessPiece = new Bishop(color);
    board[row][6].chessPiece = new Knight(color);
    board[row][7].chessPiece = new Rook(color);
  }
}
