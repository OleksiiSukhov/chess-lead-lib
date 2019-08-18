/* tslint:disable:no-string-literal */

import { ChessLead } from ".";
import { BoardBuilder } from "./board/board-builder";
import { King } from "./chess-pieces/king";
import { Rook } from "./chess-pieces/rook";
import { BoardState } from "./models/board-state";
import { Cell } from "./models/cell";
import { Color } from "./models/color";
import { GameStatus } from "./models/game-status";
import { Guard } from "./validators/guard";

test("constructor should call BoardBuilder.createInitial when boardState was not passed", () => {
  const createInitialMock = jest.fn();
  BoardBuilder.createInitial = createInitialMock.bind(BoardBuilder);

  const chessLead = new ChessLead();

  expect(createInitialMock).toHaveBeenCalled();
});

test("chessBoardState should return correct board state object", () => {
  const chessLead = new ChessLead();
  const testBoardState = new BoardState();
  testBoardState.gameStatus = GameStatus.Win;

  chessLead["boardState"] = testBoardState;

  expect(chessLead.chessBoardState).toBe(testBoardState);
});

test("getAcceptableMovements should call GetAcceptableMovementsInputValidator.validate", () => {
  const validateMock = jest.fn();
  Guard.validateCell = validateMock.bind(Guard);

  const chessLead = new ChessLead();
  const cell = new Cell(0, 0);

  chessLead.getAcceptableMovements(cell);

  expect(validateMock).toHaveBeenCalledWith(cell);
});

test("getAcceptableMovements should return empty array when cell is empty", () => {
  const chessLead = new ChessLead(new BoardState());
  const cell = new Cell(0, 0);

  expect(chessLead.getAcceptableMovements(cell)).toStrictEqual([]);
});

test("getAcceptableMovements should return empty array when game is finished", () => {
  const finishedGameStatuses = [GameStatus.Win, GameStatus.Draw];
  const boardState = new BoardState();
  const cell = new Cell(4, 2);

  finishedGameStatuses.forEach(status => {
    boardState.gameStatus = status;
    const chessLead = new ChessLead(boardState);

    expect(chessLead.getAcceptableMovements(cell)).toStrictEqual([]);
  });
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 | + |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |WR |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("move should change position of the chess piece", () => {
  const boardState = new BoardState();
  boardState.nextTurn = Color.White;
  boardState.board = BoardBuilder.setupEmptyBoard();
  const chessPieceToMove = new Rook(Color.White);

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[0][0].chessPiece = chessPieceToMove;

  const chessLead = new ChessLead(boardState);

  chessLead.move(boardState.board[0][0], boardState.board[0][2]);

  expect(boardState.board[0][0].chessPiece).toBeUndefined();
  expect(boardState.board[0][2].chessPiece).toEqual(chessPieceToMove);
});

test("move should throw error when movement is forbidden", () => {
  const boardState = new BoardState();
  boardState.nextTurn = Color.White;
  boardState.board = BoardBuilder.setupEmptyBoard();
  const chessPieceToMove = new Rook(Color.White);

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[0][0].chessPiece = chessPieceToMove;

  const chessLead = new ChessLead(boardState);

  expect(() => chessLead.move(boardState.board[0][0], boardState.board[1][2])).toThrow(
    "Movement to specified cell is forbidden.",
  );
});

test("move should throw error when fromCell is empty", () => {
  const boardState = new BoardState();
  boardState.nextTurn = Color.White;
  boardState.board = BoardBuilder.setupEmptyBoard();

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);

  const chessLead = new ChessLead(boardState);

  expect(() => chessLead.move(boardState.board[0][0], boardState.board[1][3])).toThrow(
    "fromCell cannot be empty.",
  );
});

[GameStatus.Draw, GameStatus.Win].forEach(gameStatus => {
  test(`move should throw error when game is over - ${gameStatus}`, () => {
    const boardState = new BoardState();
    boardState.nextTurn = Color.White;
    boardState.board = BoardBuilder.setupEmptyBoard();
    boardState.gameStatus = gameStatus;

    const chessPieceToMove = new Rook(Color.White);

    boardState.board[7][4].chessPiece = new King(Color.Black);
    boardState.board[0][4].chessPiece = new King(Color.White);
    boardState.board[0][0].chessPiece = chessPieceToMove;

    const chessLead = new ChessLead(boardState);

    expect(() => chessLead.move(boardState.board[0][0], boardState.board[0][2])).toThrow(
      "The game is over. Movement is not possible.",
    );
  });
});

test("move should increment movedNumber for moved chess piece", () => {
  const boardState = new BoardState();
  boardState.nextTurn = Color.White;
  boardState.board = BoardBuilder.setupEmptyBoard();
  const chessPieceToMove = new Rook(Color.White);
  chessPieceToMove.movedNumber = 3;

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[0][0].chessPiece = chessPieceToMove;

  const chessLead = new ChessLead(boardState);

  chessLead.move(boardState.board[0][0], boardState.board[0][2]);

  expect(chessPieceToMove.movedNumber).toBe(4);
});

test("move should throw error when wrong turn color", () => {
  const boardState = new BoardState();
  boardState.board = BoardBuilder.setupEmptyBoard();
  boardState.nextTurn = Color.Black;
  const chessPieceToMove = new Rook(Color.White);

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[0][0].chessPiece = chessPieceToMove;

  const chessLead = new ChessLead(boardState);

  expect(() => chessLead.move(boardState.board[0][0], boardState.board[1][2])).toThrow(
    "Wrong turn color for specified fromCell.",
  );
});
