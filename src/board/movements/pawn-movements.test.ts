import { Pawn } from "../../chess-pieces/pawn";
import { Queen } from "../../chess-pieces/queen";
import { Rook } from "../../chess-pieces/rook";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { GameStatus } from "../../models/game-status";
import { Square } from "../../models/square";
import { BoardBuilder } from "../board-builder";
import { PawnMovements } from "./pawn-movements";
import { TestAssistance } from "./test-assistance";

let boardSquares: Square[][];
let boardState: BoardState;
let testAssistance: TestAssistance;

beforeEach(() => {
  boardSquares = BoardBuilder.setupEmptyBoard();
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
test("getAvailable should return correct squares for initial position (white)", () => {
  boardSquares[1][3].chessPiece = new Pawn(Color.White);

  const expected: Square[] = [boardSquares[3][3], boardSquares[2][3]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[1][3]);
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
test("getAvailable should return correct squares for initial position (black)", () => {
  boardSquares[6][3].chessPiece = new Pawn(Color.Black);

  const expected: Square[] = [boardSquares[5][3], boardSquares[4][3]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[6][3]);
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
  boardSquares[1][3].chessPiece = new Pawn(Color.White);
  boardSquares[2][3].chessPiece = new Queen(Color.White);

  const expected: Square[] = [];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[1][3]);
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
  boardSquares[6][3].chessPiece = new Pawn(Color.Black);
  boardSquares[5][3].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[6][3]);
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
test("getAvailable should return correct squares for diagonal capture (white)", () => {
  boardSquares[2][2].chessPiece = new Pawn(Color.White);
  boardSquares[3][3].chessPiece = new Queen(Color.Black);
  boardSquares[3][1].chessPiece = new Queen(Color.White);

  const expected: Square[] = [boardSquares[3][2], boardSquares[3][3]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[2][2]);
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
test("getAvailable should return correct squares for diagonal capture (black)", () => {
  boardSquares[5][3].chessPiece = new Pawn(Color.Black);
  boardSquares[4][4].chessPiece = new Queen(Color.Black);
  boardSquares[4][2].chessPiece = new Queen(Color.White);

  const expected: Square[] = [boardSquares[4][2], boardSquares[4][3]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[5][3]);
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
test("getAvailable should return correct squares for initial position and diagonal capture (white)", () => {
  boardSquares[1][2].chessPiece = new Pawn(Color.White);
  boardSquares[2][3].chessPiece = new Queen(Color.Black);
  boardSquares[2][1].chessPiece = new Queen(Color.White);

  const expected: Square[] = [boardSquares[2][2], boardSquares[3][2], boardSquares[2][3]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[1][2]);
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
test("getAvailable should return correct squares for initial position and diagonal capture (black)", () => {
  boardSquares[6][2].chessPiece = new Pawn(Color.Black);
  boardSquares[5][3].chessPiece = new Queen(Color.Black);
  boardSquares[5][1].chessPiece = new Queen(Color.White);

  const expected: Square[] = [boardSquares[4][2], boardSquares[5][2], boardSquares[5][1]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[6][2]);
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
  boardSquares[2][3].chessPiece = new Pawn(Color.White);
  boardSquares[3][3].chessPiece = new Queen(Color.White);

  const expected: Square[] = [];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[2][3]);
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
  boardSquares[5][3].chessPiece = new Pawn(Color.Black);
  boardSquares[4][3].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[5][3]);
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

  boardSquares[4][3].chessPiece = new Pawn(Color.White);
  boardSquares[5][2].chessPiece = new Queen(Color.Black);
  boardSquares[4][4].chessPiece = enemyChessPiece;

  const expected: Square[] = [boardSquares[5][2], boardSquares[5][3], boardSquares[5][4]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementSquares(expected, boardSquares[4][3]);
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

  boardSquares[3][3].chessPiece = new Pawn(Color.Black);
  boardSquares[2][2].chessPiece = new Queen(Color.White);
  boardSquares[3][4].chessPiece = enemyChessPiece;

  const expected: Square[] = [boardSquares[2][2], boardSquares[2][3], boardSquares[2][4]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
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

  boardSquares[4][3].chessPiece = new Pawn(Color.White);
  boardSquares[5][2].chessPiece = new Queen(Color.Black);
  boardSquares[4][4].chessPiece = enemyChessPiece;

  const expected: Square[] = [boardSquares[5][2], boardSquares[5][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementSquares(expected, boardSquares[4][3]);
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

  boardSquares[3][3].chessPiece = new Pawn(Color.Black);
  boardSquares[2][2].chessPiece = new Queen(Color.White);
  boardSquares[3][4].chessPiece = enemyChessPiece;

  const expected: Square[] = [boardSquares[2][2], boardSquares[2][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
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

  boardSquares[5][3].chessPiece = new Pawn(Color.White);
  boardSquares[6][2].chessPiece = new Queen(Color.Black);
  boardSquares[5][4].chessPiece = enemyChessPiece;

  const expected: Square[] = [boardSquares[6][2], boardSquares[6][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementSquares(expected, boardSquares[5][3]);
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

  boardSquares[2][3].chessPiece = new Pawn(Color.Black);
  boardSquares[1][2].chessPiece = new Queen(Color.White);
  boardSquares[2][4].chessPiece = enemyChessPiece;

  const expected: Square[] = [boardSquares[1][2], boardSquares[1][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementSquares(expected, boardSquares[2][3]);
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

  boardSquares[4][3].chessPiece = new Pawn(Color.White);
  boardSquares[4][2].chessPiece = enemyChessPiece;

  const expected: Square[] = [boardSquares[5][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementSquares(expected, boardSquares[4][3]);
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

  boardSquares[3][3].chessPiece = new Pawn(Color.Black);
  boardSquares[3][2].chessPiece = enemyChessPiece;

  const expected: Square[] = [boardSquares[2][3]];

  setupBoardStateMock(true);
  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
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

  boardSquares[4][3].chessPiece = new Pawn(Color.White);
  boardSquares[5][2].chessPiece = new Queen(Color.Black);
  boardSquares[4][4].chessPiece = enemyChessPiece;

  const expected: Square[] = [boardSquares[5][2], boardSquares[5][3]];

  setupBoardStateMock(false);
  testAssistance.assertAvailableMovementSquares(expected, boardSquares[4][3]);
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

  boardSquares[3][3].chessPiece = new Pawn(Color.Black);
  boardSquares[2][2].chessPiece = new Queen(Color.White);
  boardSquares[3][4].chessPiece = enemyChessPiece;

  const expected: Square[] = [boardSquares[2][2], boardSquares[2][3]];

  setupBoardStateMock(false);
  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
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
test("getAvailable should return correct squares check - capture only", () => {
  boardSquares[2][3].chessPiece = new Pawn(Color.White);
  boardSquares[3][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [boardSquares[3][4]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[2][3]);
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
test("getAvailable should return correct squares check - hide King only", () => {
  boardSquares[3][4].chessPiece = new Pawn(Color.White);
  boardSquares[5][4].chessPiece = new Queen(Color.Black);
  boardSquares[4][5].chessPiece = new Rook(Color.Black);

  const expected: Square[] = [boardSquares[4][4]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][4]);
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
  boardSquares[3][3].chessPiece = new Pawn(Color.White);
  boardSquares[2][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
});

function setupBoardStateMock(lastMovementsPerformedByResult: boolean = false): void {
  const BoardStateMock = jest.fn(() => ({
    board: boardSquares,
    gameStatus: GameStatus.InProgress,
    isCheck: false,
    movements: [],
    isLastMovementsPerformedBy: jest.fn().mockImplementation(() => {
      return lastMovementsPerformedByResult;
    }),
    resign: jest.fn(),
    isGameFinished: jest.fn(),
    switchNextTurn: jest.fn(),
    setDrawByAgreement: jest.fn(),
    setNewGameStatus: jest.fn(),
    repetitionNumber: 0,
  }));

  boardState = new BoardStateMock();
  testAssistance = new TestAssistance(boardState, new PawnMovements());
  testAssistance.setupKingsOnInitialPositions();
}
