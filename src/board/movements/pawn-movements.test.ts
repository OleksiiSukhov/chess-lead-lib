import { Pawn } from "../../chess-pieces/pawn";
import { Queen } from "../../chess-pieces/queen";
import { Rook } from "../../chess-pieces/rook";
import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Color } from "../../models/color";
import { GameStatus } from "../../models/game-status";
import { BoardBuilder } from "../board-builder";
import { PawnMovements } from "./pawn-movements";
import { TestAssistance } from "./test-assistance";

let boardCells: Cell[][];
let boardState: BoardState;
let testAssistance: TestAssistance;

beforeEach(() => {
  boardCells = BoardBuilder.setupEmptyBoard();
  setupBoardStateMock();
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
// 3 |   |   |   | + |   |   |   |   |
//   _________________________________
// 2 |   |   |   | + |   |   |   |   |
//   _________________________________
// 1 |   |   |   |WP |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells for initial position (white)", () => {
  boardCells[1][3].chessPiece = new Pawn(Color.White);

  const expected: Cell[] = [boardCells[3][3], boardCells[2][3]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[1][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |BP |   |   |   |   |
//   _________________________________
// 5 |   |   |   | + |   |   |   |   |
//   _________________________________
// 4 |   |   |   | + |   |   |   |   |
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
test("getAvailable should return correct cells for initial position (black)", () => {
  boardCells[6][3].chessPiece = new Pawn(Color.Black);

  const expected: Cell[] = [boardCells[5][3], boardCells[4][3]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[6][3]);
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
// 2 |   |   |   |WQ |   |   |   |   |
//   _________________________________
// 1 |   |   |   |WP |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return empty array for initial position when no any options (white)", () => {
  boardCells[1][3].chessPiece = new Pawn(Color.White);
  boardCells[2][3].chessPiece = new Queen(Color.White);

  const expected: Cell[] = [];

  testAssistance.assertAvailableMovementCells(expected, boardCells[1][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |BP |   |   |   |   |
//   _________________________________
// 5 |   |   |   |BQ |   |   |   |   |
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
test("getAvailable should return empty array for initial position when no any options (black)", () => {
  boardCells[6][3].chessPiece = new Pawn(Color.Black);
  boardCells[5][3].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [];

  testAssistance.assertAvailableMovementCells(expected, boardCells[6][3]);
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
// 3 |   |WQ | + |BQ+|   |   |   |   |
//   _________________________________
// 2 |   |   |WP |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells for diagonal capture (white)", () => {
  boardCells[2][2].chessPiece = new Pawn(Color.White);
  boardCells[3][3].chessPiece = new Queen(Color.Black);
  boardCells[3][1].chessPiece = new Queen(Color.White);

  const expected: Cell[] = [boardCells[3][2], boardCells[3][3]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[2][2]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |BP |   |   |   |   |
//   _________________________________
// 4 |   |   |WQ+| + |BQ |   |   |   |
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
test("getAvailable should return correct cells for diagonal capture (black)", () => {
  boardCells[5][3].chessPiece = new Pawn(Color.Black);
  boardCells[4][4].chessPiece = new Queen(Color.Black);
  boardCells[4][2].chessPiece = new Queen(Color.White);

  const expected: Cell[] = [boardCells[4][2], boardCells[4][3]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[5][3]);
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
// 3 |   |   | + |   |   |   |   |   |
//   _________________________________
// 2 |   |WQ | + |BQ+|   |   |   |   |
//   _________________________________
// 1 |   |   |WP |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells for initial position and diagonal capture (white)", () => {
  boardCells[1][2].chessPiece = new Pawn(Color.White);
  boardCells[2][3].chessPiece = new Queen(Color.Black);
  boardCells[2][1].chessPiece = new Queen(Color.White);

  const expected: Cell[] = [boardCells[2][2], boardCells[3][2], boardCells[2][3]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[1][2]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |BP |   |   |   |   |   |
//   _________________________________
// 5 |   |WQ+| + |BQ |   |   |   |   |
//   _________________________________
// 4 |   |   | + |   |   |   |   |   |
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
test("getAvailable should return correct cells for initial position and diagonal capture (black)", () => {
  boardCells[6][2].chessPiece = new Pawn(Color.Black);
  boardCells[5][3].chessPiece = new Queen(Color.Black);
  boardCells[5][1].chessPiece = new Queen(Color.White);

  const expected: Cell[] = [boardCells[4][2], boardCells[5][2], boardCells[5][1]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[6][2]);
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
// 3 |   |   |   |WQ |   |   |   |   |
//   _________________________________
// 2 |   |   |   |WP |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return empty array when no any options (white)", () => {
  boardCells[2][3].chessPiece = new Pawn(Color.White);
  boardCells[3][3].chessPiece = new Queen(Color.White);

  const expected: Cell[] = [];

  testAssistance.assertAvailableMovementCells(expected, boardCells[2][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |BP |   |   |   |   |
//   _________________________________
// 4 |   |   |   |BQ |   |   |   |   |
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
test("getAvailable should return empty array when no any options (black)", () => {
  boardCells[5][3].chessPiece = new Pawn(Color.Black);
  boardCells[4][3].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [];

  testAssistance.assertAvailableMovementCells(expected, boardCells[5][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |BQ+| + | + |   |   |   |
//   _________________________________
// 4 |   |   |   |WP |BP |   |   |   |
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
test("getAvailable for en passant when all conditions are true (white)", () => {
  const enemyChessPiece = new Pawn(Color.Black);
  enemyChessPiece.movedNumber = 1;

  boardCells[4][3].chessPiece = new Pawn(Color.White);
  boardCells[5][2].chessPiece = new Queen(Color.Black);
  boardCells[4][4].chessPiece = enemyChessPiece;

  const expected: Cell[] = [boardCells[5][2], boardCells[5][3], boardCells[5][4]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementCells(expected, boardCells[4][3]);
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
// 3 |   |   |   |BP |WP |   |   |   |
//   _________________________________
// 2 |   |   |WQ+| + | + |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for en passant when all conditions are true (black)", () => {
  const enemyChessPiece = new Pawn(Color.White);
  enemyChessPiece.movedNumber = 1;

  boardCells[3][3].chessPiece = new Pawn(Color.Black);
  boardCells[2][2].chessPiece = new Queen(Color.White);
  boardCells[3][4].chessPiece = enemyChessPiece;

  const expected: Cell[] = [boardCells[2][2], boardCells[2][3], boardCells[2][4]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |BQ+| + |   |   |   |   |
//   _________________________________
// 4 |   |   |   |WP |BP |   |   |   |
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
test("getAvailable without en passant when it is not first move (white)", () => {
  const enemyChessPiece = new Pawn(Color.Black);
  enemyChessPiece.movedNumber = 2;

  boardCells[4][3].chessPiece = new Pawn(Color.White);
  boardCells[5][2].chessPiece = new Queen(Color.Black);
  boardCells[4][4].chessPiece = enemyChessPiece;

  const expected: Cell[] = [boardCells[5][2], boardCells[5][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementCells(expected, boardCells[4][3]);
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
// 3 |   |   |   |BP |WP |   |   |   |
//   _________________________________
// 2 |   |   |WQ+| + |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable without en passant when it is not first move (black)", () => {
  const enemyChessPiece = new Pawn(Color.White);
  enemyChessPiece.movedNumber = 2;

  boardCells[3][3].chessPiece = new Pawn(Color.Black);
  boardCells[2][2].chessPiece = new Queen(Color.White);
  boardCells[3][4].chessPiece = enemyChessPiece;

  const expected: Cell[] = [boardCells[2][2], boardCells[2][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |BQ+| + |   |   |   |   |
//   _________________________________
// 5 |   |   |   |WP |BP |   |   |   |
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
test("getAvailable without en passant when one square move (white)", () => {
  const enemyChessPiece = new Pawn(Color.Black);
  enemyChessPiece.movedNumber = 1;

  boardCells[5][3].chessPiece = new Pawn(Color.White);
  boardCells[6][2].chessPiece = new Queen(Color.Black);
  boardCells[5][4].chessPiece = enemyChessPiece;

  const expected: Cell[] = [boardCells[6][2], boardCells[6][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementCells(expected, boardCells[5][3]);
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
// 2 |   |   |   |BP |WP |   |   |   |
//   _________________________________
// 1 |   |   |WQ+| + |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable without en passant when one square move (black)", () => {
  const enemyChessPiece = new Pawn(Color.White);
  enemyChessPiece.movedNumber = 1;

  boardCells[2][3].chessPiece = new Pawn(Color.Black);
  boardCells[1][2].chessPiece = new Queen(Color.White);
  boardCells[2][4].chessPiece = enemyChessPiece;

  const expected: Cell[] = [boardCells[1][2], boardCells[1][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementCells(expected, boardCells[2][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   | + |   |   |   |   |
//   _________________________________
// 4 |   |   |BQ |WP |   |   |   |   |
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
test("getAvailable without en passant when enemy is not pawn (white)", () => {
  const enemyChessPiece = new Queen(Color.Black);
  enemyChessPiece.movedNumber = 1;

  boardCells[4][3].chessPiece = new Pawn(Color.White);
  boardCells[4][2].chessPiece = enemyChessPiece;

  const expected: Cell[] = [boardCells[5][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementCells(expected, boardCells[4][3]);
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
// 3 |   |   |WQ |BP |   |   |   |   |
//   _________________________________
// 2 |   |   |   | + |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable without en passant when enemy is not pawn (black)", () => {
  const enemyChessPiece = new Queen(Color.White);
  enemyChessPiece.movedNumber = 1;

  boardCells[3][3].chessPiece = new Pawn(Color.Black);
  boardCells[3][2].chessPiece = enemyChessPiece;

  const expected: Cell[] = [boardCells[2][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |BQ+| + |   |   |   |   |
//   _________________________________
// 4 |   |   |   |WP |BP |   |   |   |
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
test("getAvailable without en passant when not enemy pawn last moved (white)", () => {
  const enemyChessPiece = new Pawn(Color.Black);
  enemyChessPiece.movedNumber = 1;

  boardCells[4][3].chessPiece = new Pawn(Color.White);
  boardCells[5][2].chessPiece = new Queen(Color.Black);
  boardCells[4][4].chessPiece = enemyChessPiece;

  const expected: Cell[] = [boardCells[5][2], boardCells[5][3]];

  setupBoardStateMock(false);
  testAssistance.assertAvailableMovementCells(expected, boardCells[4][3]);
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
// 3 |   |   |   |BP |WP |   |   |   |
//   _________________________________
// 2 |   |   |WQ+| + |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable without en passant when not enemy pawn last moved(black)", () => {
  const enemyChessPiece = new Pawn(Color.White);
  enemyChessPiece.movedNumber = 1;

  boardCells[3][3].chessPiece = new Pawn(Color.Black);
  boardCells[2][2].chessPiece = new Queen(Color.White);
  boardCells[3][4].chessPiece = enemyChessPiece;

  const expected: Cell[] = [boardCells[2][2], boardCells[2][3]];

  setupBoardStateMock(false);
  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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
// 3 |   |   |   |   |BQ+|   |   |   |
//   _________________________________
// 2 |   |   |   |WP |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells check - capture only", () => {
  boardCells[2][3].chessPiece = new Pawn(Color.White);
  boardCells[3][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [boardCells[3][4]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[2][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |BQ |   |   |   |
//   _________________________________
// 4 |   |   |   |   | + |BR |   |   |
//   _________________________________
// 3 |   |   |   |   |WP |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells check - hide King only", () => {
  boardCells[3][4].chessPiece = new Pawn(Color.White);
  boardCells[5][4].chessPiece = new Queen(Color.Black);
  boardCells[4][5].chessPiece = new Rook(Color.Black);

  const expected: Cell[] = [boardCells[4][4]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][4]);
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
// 3 |   |   |   |WP |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |BQ |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return empty array when King is in check and it is not possible to cover it", () => {
  boardCells[3][3].chessPiece = new Pawn(Color.White);
  boardCells[2][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [];

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
});

function setupBoardStateMock(lastMovementsPerformedByResult: boolean = false): void {
  const BoardStateMock = jest.fn(() => ({
    board: boardCells,
    gameStatus: GameStatus.InProgress,
    isCheck: false,
    movements: [],
    isLastMovementsPerformedBy: jest.fn().mockImplementation(() => {
      return lastMovementsPerformedByResult;
    }),
    repetitionNumber: 0,
  }));

  boardState = new BoardStateMock();
  testAssistance = new TestAssistance(boardState, new PawnMovements());
  testAssistance.setupKingsOnInitialPositions();
}
