import { Knight } from "../../chess-pieces/knight";
import { Queen } from "../../chess-pieces/queen";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Square } from "../../models/square";
import { BoardBuilder } from "../board-builder";
import { KnightMovements } from "./knight-movements";
import { TestAssistance } from "./test-assistance";

let boardSquares: Square[][];
const boardState: BoardState = new BoardState();
let testAssistance: TestAssistance;

beforeEach(() => {
  boardSquares = BoardBuilder.setupEmptyBoard();
  boardState.board = boardSquares;
  testAssistance = new TestAssistance(boardState, new KnightMovements());
  testAssistance.setupKingsOnInitialPositions();
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   | + |   | + |   |   |   |
//   _________________________________
// 4 |   | + |   |   |   | + |   |   |
//   _________________________________
// 3 |   |   |   |WKN|   |   |   |   |
//   _________________________________
// 2 |   | + |   |   |   | + |   |   |
//   _________________________________
// 1 |   |   | + |   | + |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares for empty board", () => {
  boardSquares[3][3].chessPiece = new Knight(Color.White);

  const expected: Square[] = [
    boardSquares[1][2],
    boardSquares[1][4],
    boardSquares[5][2],
    boardSquares[5][4],
    boardSquares[2][1],
    boardSquares[2][5],
    boardSquares[4][1],
    boardSquares[4][5],
  ];

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
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   | + |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   | + |   |   |   |   |   |
//   _________________________________
// 0 |WKN|   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares from angle of the board", () => {
  boardSquares[0][0].chessPiece = new Knight(Color.White);

  const expected: Square[] = [boardSquares[2][1], boardSquares[1][2]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][0]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |BQ+|   | + |   |   |   |
//   _________________________________
// 4 |   | + |   |   |   | + |   |   |
//   _________________________________
// 3 |   |   |   |WKN|   |   |   |   |
//   _________________________________
// 2 |   | + |   |   |   | + |   |   |
//   _________________________________
// 1 |   |   | + |   | + |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares for board with enemy on the way", () => {
  boardSquares[3][3].chessPiece = new Knight(Color.White);
  boardSquares[5][2].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [
    boardSquares[1][2],
    boardSquares[1][4],
    boardSquares[5][2],
    boardSquares[5][4],
    boardSquares[2][1],
    boardSquares[2][5],
    boardSquares[4][1],
    boardSquares[4][5],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |WQ |   | + |   |   |   |
//   _________________________________
// 4 |   | + |   |   |   | + |   |   |
//   _________________________________
// 3 |   |   |   |WKN|   |   |   |   |
//   _________________________________
// 2 |   | + |   |   |   | + |   |   |
//   _________________________________
// 1 |   |   | + |   | + |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares for board with ally on the way", () => {
  boardSquares[3][3].chessPiece = new Knight(Color.White);
  boardSquares[5][2].chessPiece = new Queen(Color.White);

  const expected: Square[] = [
    boardSquares[1][2],
    boardSquares[1][4],
    boardSquares[5][4],
    boardSquares[2][1],
    boardSquares[2][5],
    boardSquares[4][1],
    boardSquares[4][5],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |WKN|   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |BQ+|   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares check - capture only", () => {
  boardSquares[4][2].chessPiece = new Knight(Color.White);
  boardSquares[3][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [boardSquares[3][4]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[4][2]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |BQ |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   | + |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |WKN|   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares check - hide King only", () => {
  boardSquares[1][3].chessPiece = new Knight(Color.White);
  boardSquares[5][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [boardSquares[3][4]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[1][3]);
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
// 2 |   |   |   |   |BQ |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |WKN|
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return empty array when King is in check and it is not possible to cover it", () => {
  boardSquares[0][7].chessPiece = new Knight(Color.White);
  boardSquares[2][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][7]);
});
