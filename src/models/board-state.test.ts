import { BoardBuilder } from "../board/board-builder";
import { Bishop } from "../chess-pieces/bishop";
import { King } from "../chess-pieces/king";
import { Pawn } from "../chess-pieces/pawn";
import { Rook } from "../chess-pieces/rook";
import { Color } from "../models/color";
import { BoardState } from "./board-state";
import { Cell } from "./cell";
import { DrawType } from "./draw-type";
import { GameStatus } from "./game-status";
import { MovedChessPiece } from "./moved-chess-piece";
import { WinType } from "./win-type";

let boardState: BoardState;
let blackPawn: Pawn;
let whitePawn: Pawn;
let blackPawnMovements: MovedChessPiece;
let whitePawnMovements: MovedChessPiece;

beforeEach(() => {
  boardState = new BoardState();

  blackPawn = new Pawn(Color.Black);
  whitePawn = new Pawn(Color.White);

  blackPawnMovements = new MovedChessPiece(blackPawn.id);
  blackPawnMovements.fromCell = new Cell(6, 4);
  blackPawnMovements.fromCell = new Cell(4, 4);

  whitePawnMovements = new MovedChessPiece(whitePawn.id);
  whitePawnMovements.fromCell = new Cell(3, 3);
  whitePawnMovements.fromCell = new Cell(4, 3);
});

test("isLastMovementsPerformedBy should return true", () => {
  boardState.movements = [whitePawnMovements, blackPawnMovements];

  expect(boardState.isLastMovementsPerformedBy(blackPawn)).toBeTruthy();
});

test("isLastMovementsPerformedBy should return false", () => {
  boardState.movements = [blackPawnMovements, whitePawnMovements];

  expect(boardState.isLastMovementsPerformedBy(blackPawn)).toBeFalsy();
});

test("isLastMovementsPerformedBy should return false when there are no any movements", () => {
  boardState.movements = [];

  expect(boardState.isLastMovementsPerformedBy(blackPawn)).toBeFalsy();
});

test("resign should correctly set appropriate properties", () => {
  boardState.nextTurn = Color.White;

  const expectedBoardState = {
    ...boardState,
    nextTurn: undefined,
    winSide: Color.Black,
    gameStatus: GameStatus.Win,
    winType: WinType.Resignation,
  };

  boardState.resign(Color.White);

  expect(boardState).toEqual(expectedBoardState);
});

test("resign should throw error when wrong side resigns", () => {
  boardState.nextTurn = Color.Black;

  expect(() => boardState.resign(Color.White)).toThrow(
    "Resignation is not possible while opposite color turn.",
  );
});

test("resign should throw error when game is over - Win", () => {
  boardState.nextTurn = Color.White;
  boardState.gameStatus = GameStatus.Win;

  expect(() => boardState.resign(Color.White)).toThrow(
    "The game is over. Resignation is not possible.",
  );
});

test("resign should throw error when game is over - Draw", () => {
  boardState.nextTurn = Color.White;
  boardState.gameStatus = GameStatus.Draw;

  expect(() => boardState.resign(Color.White)).toThrow(
    "The game is over. Resignation is not possible.",
  );
});

//   _________________________________
// 7 |WR |   |   |   |BKI|   |   |   |
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
test("setNewGameStatus should change game status - check", () => {
  boardState.board = BoardBuilder.setupEmptyBoard();
  boardState.nextTurn = Color.White;

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[7][0].chessPiece = new Rook(Color.White);

  boardState.setNewGameStatus();

  expect(boardState.isCheck).toBeTruthy();
  expect(boardState.gameStatus).toBe(GameStatus.InProgress);
});

//   _________________________________
// 7 |WR |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |WR |   |   |   |   |   |   |
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
test("setNewGameStatus should change game status - checkmate", () => {
  boardState.board = BoardBuilder.setupEmptyBoard();
  boardState.nextTurn = Color.White;

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[7][0].chessPiece = new Rook(Color.White);
  boardState.board[6][1].chessPiece = new Rook(Color.White);

  boardState.setNewGameStatus();

  expect(boardState.isCheck).toBeTruthy();
  expect(boardState.gameStatus).toBe(GameStatus.Win);
  expect(boardState.winType).toBe(WinType.Checkmate);
  expect(boardState.winSide).toBe(Color.White);
});

//   _________________________________
// 7 |WR |   | + |   |BKI|   |   |   |
//   _________________________________
// 6 |   |WR |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |BB |   |   |
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
test("setNewGameStatus should change game status - not checkmate - hide king possible", () => {
  boardState.board = BoardBuilder.setupEmptyBoard();
  boardState.nextTurn = Color.White;

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[4][5].chessPiece = new Bishop(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[7][0].chessPiece = new Rook(Color.White);
  boardState.board[6][1].chessPiece = new Rook(Color.White);

  boardState.setNewGameStatus();

  expect(boardState.isCheck).toBeTruthy();
  expect(boardState.gameStatus).toBe(GameStatus.InProgress);
  expect(boardState.winType).toBeUndefined();
  expect(boardState.winSide).toBeUndefined();
});

test("setNewGameStatus should change game status - draw - kings only", () => {
  boardState.board = BoardBuilder.setupEmptyBoard();
  boardState.nextTurn = Color.White;

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);

  boardState.setNewGameStatus();

  expect(boardState.isCheck).toBeFalsy();
  expect(boardState.gameStatus).toBe(GameStatus.Draw);
  expect(boardState.drawType).toBe(DrawType.InsufficientMaterial);
  expect(boardState.winType).toBeUndefined();
  expect(boardState.winSide).toBeUndefined();
});

//   _________________________________
// 7 |BKI|   |   |   |   |   |   |   |
//   _________________________________
// 6 |   |   |WR |   |   |   |   |   |
//   _________________________________
// 5 |   |WR |   |   |   |   |   |   |
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
test("setNewGameStatus should change game status - draw - Stalemate", () => {
  boardState.board = BoardBuilder.setupEmptyBoard();
  boardState.nextTurn = Color.White;

  boardState.board[7][0].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[5][1].chessPiece = new Rook(Color.White);
  boardState.board[6][2].chessPiece = new Rook(Color.White);

  boardState.setNewGameStatus();

  expect(boardState.isCheck).toBeFalsy();
  expect(boardState.gameStatus).toBe(GameStatus.Draw);
  expect(boardState.drawType).toBe(DrawType.Stalemate);
  expect(boardState.winType).toBeUndefined();
  expect(boardState.winSide).toBeUndefined();
});

test("setDrawByAgreement should change game status accordingly", () => {
  boardState.board = BoardBuilder.setupEmptyBoard();
  boardState.nextTurn = Color.White;

  boardState.board[7][4].chessPiece = new King(Color.Black);
  boardState.board[0][4].chessPiece = new King(Color.White);
  boardState.board[0][0].chessPiece = new Rook(Color.White);

  boardState.setDrawByAgreement();

  expect(boardState.gameStatus).toBe(GameStatus.Draw);
  expect(boardState.drawType).toBe(DrawType.ByAgreement);
});
