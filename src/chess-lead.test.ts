/* tslint:disable:no-string-literal */

import { ChessLead } from ".";
import { BoardBuilder } from "./board/board-builder";
import { Bishop } from "./chess-pieces/bishop";
import { ChessPiece } from "./chess-pieces/chess-piece";
import { ChessPieceType } from "./chess-pieces/chess-piece-type";
import { King } from "./chess-pieces/king";
import { Pawn } from "./chess-pieces/pawn";
import { Rook } from "./chess-pieces/rook";
import { BoardState } from "./models/board-state";
import { Cell } from "./models/cell";
import { Color } from "./models/color";
import { GameStatus } from "./models/game-status";
import { MovedChessPiece } from "./models/moved-chess-piece";
import { Guard } from "./validators/guard";

let validateGameStatus: any;
let validateChessPieceOnCell: any;
let validateChessPieceColor: any;
let validateMovement: any;
let validateCell: any;

let createInitial: any;

beforeEach(() => {
  validateGameStatus = Guard.validateGameStatus;
  validateChessPieceOnCell = Guard.validateChessPieceOnCell;
  validateChessPieceColor = Guard.validateChessPieceColor;
  validateMovement = Guard.validateMovement;
  validateCell = Guard.validateCell;

  createInitial = BoardBuilder.createInitial;
});

afterEach(() => {
  Guard.validateGameStatus = validateGameStatus.bind(Guard);
  Guard.validateChessPieceOnCell = validateChessPieceOnCell.bind(Guard);
  Guard.validateChessPieceColor = validateChessPieceColor.bind(Guard);
  Guard.validateMovement = validateMovement.bind(Guard);
  Guard.validateCell = validateCell.bind(Guard);

  BoardBuilder.createInitial = createInitial.bind(BoardBuilder);
});

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
  const chessLead = new ChessLead();
  const cell = new Cell(0, 0);
  const validateMock = setupValidateCellMock();

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
  setupMoveValidatorMocks();

  const boardState = getBoardStateMock();
  const chessPieceToMove = new Rook(Color.White);

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[0][0].chessPiece = chessPieceToMove;

  const chessLead = new ChessLead(boardState);

  chessLead.move(boardState.board[0][0], boardState.board[0][2]);

  expect(boardState.board[0][0].chessPiece).toBeUndefined();
  expect(boardState.board[0][2].chessPiece).toEqual(chessPieceToMove);
});

test("move should increment movedNumber for moved chess piece", () => {
  setupMoveValidatorMocks();
  const boardState = getBoardStateMock();
  const chessPiece = boardState.board[0][0].chessPiece;

  if (!chessPiece) {
    throw Error("Test setup failed.");
  }

  chessPiece.movedNumber = 3;
  const chessLead = new ChessLead(boardState);

  chessLead.move(boardState.board[0][0], boardState.board[1][1]);

  expect(chessPiece.movedNumber).toBe(4);
});

test("move should call switchNextTurn", () => {
  setupMoveValidatorMocks();
  const boardState = getBoardStateMock();
  boardState.nextTurn = Color.White;
  const chessLead = new ChessLead(boardState);

  chessLead.move(boardState.board[0][0], boardState.board[1][1]);

  expect(boardState.switchNextTurn).toHaveBeenCalled();
});

test("move should call validators", () => {
  const validateGameStatusMock = setupValidateGameStatusMock();
  const validateChessPieceOnCellMock = setupValidateChessPieceOnCellMock();
  const validateChessPieceColorMock = setupValidateChessPieceColorMock();
  const validateMovementMock = setupValidateMovementMock();

  const boardState = getBoardStateMock();
  const chessLead = new ChessLead(boardState);

  chessLead.move(boardState.board[0][0], boardState.board[1][1]);

  expect(validateGameStatusMock).toHaveBeenCalled();
  expect(validateChessPieceOnCellMock).toHaveBeenCalled();
  expect(validateChessPieceColorMock).toHaveBeenCalled();
  expect(validateMovementMock).toHaveBeenCalled();
});

test("move should call setNewGameStatus", () => {
  setupMoveValidatorMocks();
  const boardState = getBoardStateMock();
  const chessLead = new ChessLead(boardState);

  chessLead.move(boardState.board[0][0], boardState.board[1][1]);

  expect(boardState.setNewGameStatus).toHaveBeenCalled();
});

//   _________________________________
// 7 |BR |BKN|BB |BQ |BKI|BB |BKN|BR |
//   _________________________________
// 6 |BP |BP |BP |BP | 2 |BP |BP |BP |
//   _________________________________
// 5 |   |   |   |   |BP |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |WP |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |WP |WP |WP |WP | 1 |WP |WP |WP |
//   _________________________________
// 0 |WR |WKN|WB |WQ |WKI|WB |WKN|WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("move should add new MovedChessPiece to performed list of movements", () => {
  setupMoveValidatorMocks();

  const expectedMovements: MovedChessPiece[] = [];
  const boardState = BoardBuilder.createInitial();
  const chessLead = new ChessLead(boardState);

  expect(boardState.movements).toEqual(expectedMovements);

  let chessPieceId = (boardState.board[1][4].chessPiece as ChessPiece).id;
  let movement = new MovedChessPiece(chessPieceId);
  movement.fromCell = boardState.board[1][4];
  movement.toCell = boardState.board[3][4];

  chessLead.move(boardState.board[1][4], boardState.board[3][4]);
  expectedMovements.push(movement);

  expect(boardState.movements).toEqual(expectedMovements);

  chessPieceId = (boardState.board[6][4].chessPiece as ChessPiece).id;
  movement = new MovedChessPiece(chessPieceId);
  movement.fromCell = boardState.board[6][4];
  movement.toCell = boardState.board[5][4];

  chessLead.move(boardState.board[6][4], boardState.board[5][4]);
  expectedMovements.push(movement);

  expect(boardState.movements).toEqual(expectedMovements);
});

//   _________________________________
// 7 |   | + |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |WP |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("move should perform Pawn promotion - White", () => {
  const boardState = getBoardStateMock();
  boardState.nextTurn = Color.White;

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[6][1].chessPiece = new Pawn(Color.White);

  const chessLead = new ChessLead(boardState);

  chessLead.move(boardState.board[6][1], boardState.board[7][1], ChessPieceType.Bishop);

  const newChessPiece = boardState.board[7][1].chessPiece as ChessPiece;

  expect(newChessPiece).not.toBeUndefined();
  expect(boardState.board[6][1].chessPiece).toBeUndefined();
  expect(newChessPiece.chessPieceType).toBe(ChessPieceType.Bishop);
  expect(newChessPiece).toBeInstanceOf(Bishop);
  expect(newChessPiece.color).toBe(Color.White);
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
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |BP |   |   |   |   |   |   |
//   _________________________________
// 0 |   | + |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("move should perform Pawn promotion - Black", () => {
  const boardState = getBoardStateMock();
  boardState.nextTurn = Color.Black;

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[1][1].chessPiece = new Pawn(Color.Black);

  const chessLead = new ChessLead(boardState);

  chessLead.move(boardState.board[1][1], boardState.board[0][1], ChessPieceType.Bishop);

  const newChessPiece = boardState.board[0][1].chessPiece as ChessPiece;

  expect(newChessPiece).not.toBeUndefined();
  expect(boardState.board[1][1].chessPiece).toBeUndefined();
  expect(newChessPiece.chessPieceType).toBe(ChessPieceType.Bishop);
  expect(newChessPiece).toBeInstanceOf(Bishop);
  expect(newChessPiece.color).toBe(Color.Black);
});

//   _________________________________
// 7 |   | + |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |WP |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("move should perform Pawn promotion - set check", () => {
  const boardState = new BoardState();
  boardState.board = BoardBuilder.setupEmptyBoard();
  boardState.nextTurn = Color.White;

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[6][1].chessPiece = new Pawn(Color.White);

  const chessLead = new ChessLead(boardState);

  chessLead.move(boardState.board[6][1], boardState.board[7][1], ChessPieceType.Rook);

  expect(chessLead.chessBoardState.isCheck).toBeTruthy();
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
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |WR |   | + |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("move should perform castling - White - Left", () => {
  const boardState = getBoardStateMock();
  boardState.nextTurn = Color.White;

  const king = new King(Color.White);
  const rook = new Rook(Color.White);

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = king;
  boardState.board[0][0].chessPiece = rook;

  const chessLead = new ChessLead(boardState);
  chessLead.move(boardState.board[0][4], boardState.board[0][2]);

  expect(boardState.board[0][2].chessPiece).toEqual(king);
  expect(boardState.board[0][3].chessPiece).toEqual(rook);
  expect(boardState.board[0][4].chessPiece).toBeUndefined();
  expect(boardState.board[0][0].chessPiece).toBeUndefined();
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
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   | + |WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("move should perform castling - White - Right", () => {
  const boardState = getBoardStateMock();
  boardState.nextTurn = Color.White;

  const king = new King(Color.White);
  const rook = new Rook(Color.White);

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = king;
  boardState.board[0][7].chessPiece = rook;

  const chessLead = new ChessLead(boardState);
  chessLead.move(boardState.board[0][4], boardState.board[0][6]);

  expect(boardState.board[0][6].chessPiece).toEqual(king);
  expect(boardState.board[0][5].chessPiece).toEqual(rook);
  expect(boardState.board[0][4].chessPiece).toBeUndefined();
  expect(boardState.board[0][7].chessPiece).toBeUndefined();
});

//   _________________________________
// 7 |BR |   | + |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("move should perform castling - Black - Left", () => {
  const boardState = getBoardStateMock();
  boardState.nextTurn = Color.Black;

  const king = new King(Color.Black);
  const rook = new Rook(Color.Black);

  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[7][4].chessPiece = king;
  boardState.board[7][0].chessPiece = rook;

  const chessLead = new ChessLead(boardState);
  chessLead.move(boardState.board[7][4], boardState.board[7][2]);

  expect(boardState.board[7][2].chessPiece).toEqual(king);
  expect(boardState.board[7][3].chessPiece).toEqual(rook);
  expect(boardState.board[7][4].chessPiece).toBeUndefined();
  expect(boardState.board[7][0].chessPiece).toBeUndefined();
});

//   _________________________________
// 7 |   |   |   |   |BKI|   | + |BR |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("move should perform castling - Black - Right", () => {
  const boardState = getBoardStateMock();
  boardState.nextTurn = Color.Black;

  const king = new King(Color.Black);
  const rook = new Rook(Color.Black);

  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[7][4].chessPiece = king;
  boardState.board[7][7].chessPiece = rook;

  const chessLead = new ChessLead(boardState);
  chessLead.move(boardState.board[7][4], boardState.board[7][6]);

  expect(boardState.board[7][6].chessPiece).toEqual(king);
  expect(boardState.board[7][5].chessPiece).toEqual(rook);
  expect(boardState.board[7][4].chessPiece).toBeUndefined();
  expect(boardState.board[7][7].chessPiece).toBeUndefined();
});

function setupMoveValidatorMocks(): void {
  setupValidateGameStatusMock();
  setupValidateChessPieceOnCellMock();
  setupValidateChessPieceColorMock();
  setupValidateMovementMock();
}

function setupValidateCellMock(): any {
  const validateMock = jest.fn();
  Guard.validateCell = validateMock.bind(Guard);

  return validateMock;
}

function setupValidateGameStatusMock(): any {
  const validateGameStatusMock = jest.fn();
  Guard.validateGameStatus = validateGameStatusMock.bind(Guard);

  return validateGameStatusMock;
}

function setupValidateChessPieceOnCellMock(): any {
  const validateChessPieceOnCellMock = jest.fn();
  Guard.validateChessPieceOnCell = validateChessPieceOnCellMock.bind(Guard);

  return validateChessPieceOnCellMock;
}

function setupValidateChessPieceColorMock(): any {
  const validateChessPieceColorMock = jest.fn();
  Guard.validateChessPieceColor = validateChessPieceColorMock.bind(Guard);

  return validateChessPieceColorMock;
}

function setupValidateMovementMock(): any {
  const validateMovementMock = jest.fn();
  Guard.validateMovement = validateMovementMock.bind(Guard);

  return validateMovementMock;
}

function getBoardStateMock(): BoardState {
  const BoardStateMock = jest.fn(() => ({
    board: BoardBuilder.setupEmptyBoard(),
    gameStatus: GameStatus.InProgress,
    isCheck: false,
    movements: [],
    isLastMovementsPerformedBy: jest.fn(),
    resign: jest.fn(),
    isGameFinished: jest.fn(),
    switchNextTurn: jest.fn(),
    setDrawByAgreement: jest.fn(),
    setNewGameStatus: jest.fn(),
    repetitionNumber: 0,
  }));

  const boardStateMock = new BoardStateMock();
  boardStateMock.board[0][0].chessPiece = new King(Color.White);

  return boardStateMock;
}
