// tslint:disable: no-string-literal

import { Bishop } from "../chess-pieces/bishop";
import { King } from "../chess-pieces/king";
import { Knight } from "../chess-pieces/knight";
import { Pawn } from "../chess-pieces/pawn";
import { Queen } from "../chess-pieces/queen";
import { Rook } from "../chess-pieces/rook";
import { BoardState } from "../models/board-state";
import { Color } from "../models/color";
import { GameStatus } from "../models/game-status";
import { Square } from "../models/square";
import { BoardBuilder } from "./board-builder";

//   _________________________________
// 7 |BR |BKN|BB |BQ |BKI|BB |BKN|BR |
//   _________________________________
// 6 |BP |BP |BP |BP |BP |BP |BP |BP |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |WP |WP |WP |WP |WP |WP |WP |WP |
//   _________________________________
// 0 |WR |WKN|WB |WQ |WKI|WB |WKN|WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("createInitial should return initial board state", () => {
  const expectedBoardState = new BoardState();

  expectedBoardState.isCheck = false;
  expectedBoardState.nextTurn = Color.White;
  expectedBoardState.winSide = undefined;
  expectedBoardState.gameStatus = GameStatus.InProgress;
  expectedBoardState.drawType = undefined;
  expectedBoardState.winType = undefined;
  expectedBoardState.repetitionNumber = 0;
  expectedBoardState.movements = [];

  expectedBoardState.board = BoardBuilder.setupEmptyBoard();

  setMainChessPieces(expectedBoardState.board, 0, Color.White);
  setMainChessPieces(expectedBoardState.board, 7, Color.Black);
  setPawns(expectedBoardState.board, 1, Color.White);
  setPawns(expectedBoardState.board, 6, Color.Black);

  const actualBoardState = BoardBuilder.createInitial();

  actualBoardState.board.forEach(row => {
    row.forEach(square => {
      const chessPiece = expectedBoardState.board[square.rowIndex][square.columnIndex].chessPiece;

      if (chessPiece && square.chessPiece) {
        chessPiece["chessPieceId"] = square.chessPiece.id;
      }
    });
  });

  expect(actualBoardState).toEqual(expectedBoardState);
});

function setPawns(board: Square[][], row: number, color: Color): void {
  board[row][0].chessPiece = new Pawn(color);
  board[row][1].chessPiece = new Pawn(color);
  board[row][2].chessPiece = new Pawn(color);
  board[row][3].chessPiece = new Pawn(color);
  board[row][4].chessPiece = new Pawn(color);
  board[row][5].chessPiece = new Pawn(color);
  board[row][6].chessPiece = new Pawn(color);
  board[row][7].chessPiece = new Pawn(color);
}

function setMainChessPieces(board: Square[][], row: number, color: Color): void {
  board[row][0].chessPiece = new Rook(color);
  board[row][1].chessPiece = new Knight(color);
  board[row][2].chessPiece = new Bishop(color);
  board[row][3].chessPiece = new Queen(color);
  board[row][4].chessPiece = new King(color);
  board[row][5].chessPiece = new Bishop(color);
  board[row][6].chessPiece = new Knight(color);
  board[row][7].chessPiece = new Rook(color);
}
