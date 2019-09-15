import { Queen } from "../../chess-pieces/queen";
import { Rook } from "../../chess-pieces/rook";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Square } from "../../models/square";
import { BoardBuilder } from "../board-builder";
import { RookMovements } from "./rook-movements";
import { TestAssistance } from "./test-assistance";

let boardSquares: Square[][];
const boardState: BoardState = new BoardState();
let testAssistance: TestAssistance;

beforeEach(() => {
  boardSquares = BoardBuilder.setupEmptyBoard();
  boardState.board = boardSquares;
  testAssistance = new TestAssistance(boardState, new RookMovements());
  testAssistance.setupKingsOnInitialPositions();
});

//   _________________________________
// 7 |   |   |   | + |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   | + |   |   |   |   |
//   _________________________________
// 5 |   |   |   | + |   |   |   |   |
//   _________________________________
// 4 |   |   |   | + |   |   |   |   |
//   _________________________________
// 3 | + | + | + |WR | + | + | + | + |
//   _________________________________
// 2 |   |   |   | + |   |   |   |   |
//   _________________________________
// 1 |   |   |   | + |   |   |   |   |
//   _________________________________
// 0 |   |   |   | + |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares for empty board", () => {
  boardSquares[3][3].chessPiece = new Rook(Color.White);

  const expected: Square[] = [
    boardSquares[3][0],
    boardSquares[3][1],
    boardSquares[3][2],
    boardSquares[3][4],
    boardSquares[3][5],
    boardSquares[3][6],
    boardSquares[3][7],
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[2][3],
    boardSquares[4][3],
    boardSquares[5][3],
    boardSquares[6][3],
    boardSquares[7][3],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
});

//   _________________________________
// 7 | + |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 | + |   |   |   |   |   |   |   |
//   _________________________________
// 5 | + |   |   |   |   |   |   |   |
//   _________________________________
// 4 | + |   |   |   |   |   |   |   |
//   _________________________________
// 3 | + |   |   |   |   |   |   |   |
//   _________________________________
// 2 | + |   |   |   |   |   |   |   |
//   _________________________________
// 1 | + |   |   |   |   |   |   |   |
//   _________________________________
// 0 |WR | + | + | + |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares from angle of the board", () => {
  boardSquares[0][0].chessPiece = new Rook(Color.White);

  const expected: Square[] = [
    boardSquares[1][0],
    boardSquares[2][0],
    boardSquares[3][0],
    boardSquares[4][0],
    boardSquares[5][0],
    boardSquares[6][0],
    boardSquares[7][0],
    boardSquares[0][1],
    boardSquares[0][2],
    boardSquares[0][3],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][0]);
});

//   _________________________________
// 7 |   |   |   | + |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   | + |   |   |   |   |
//   _________________________________
// 5 |   |   |   | + |   |   |   |   |
//   _________________________________
// 4 |   |   |   | + |   |   |   |   |
//   _________________________________
// 3 |   |   |BQ+|WR | + | + | + | + |
//   _________________________________
// 2 |   |   |   | + |   |   |   |   |
//   _________________________________
// 1 |   |   |   | + |   |   |   |   |
//   _________________________________
// 0 |   |   |   | + |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares for board with enemy on the way", () => {
  boardSquares[3][3].chessPiece = new Rook(Color.White);
  boardSquares[3][2].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [
    boardSquares[3][2],
    boardSquares[3][4],
    boardSquares[3][5],
    boardSquares[3][6],
    boardSquares[3][7],
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[2][3],
    boardSquares[4][3],
    boardSquares[5][3],
    boardSquares[6][3],
    boardSquares[7][3],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
});

//   _________________________________
// 7 |   |   |   | + |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   | + |   |   |   |   |
//   _________________________________
// 5 |   |   |   | + |   |   |   |   |
//   _________________________________
// 4 |   |   |   | + |   |   |   |   |
//   _________________________________
// 3 |   |WQ | + |WR | + | + | + | + |
//   _________________________________
// 2 |   |   |   | + |   |   |   |   |
//   _________________________________
// 1 |   |   |   | + |   |   |   |   |
//   _________________________________
// 0 |   |   |   | + |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares for board with ally on the way", () => {
  boardSquares[3][3].chessPiece = new Rook(Color.White);
  boardSquares[3][1].chessPiece = new Queen(Color.White);

  const expected: Square[] = [
    boardSquares[3][2],
    boardSquares[3][4],
    boardSquares[3][5],
    boardSquares[3][6],
    boardSquares[3][7],
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[2][3],
    boardSquares[4][3],
    boardSquares[5][3],
    boardSquares[6][3],
    boardSquares[7][3],
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
// 3 |   |   |   |WR |BQ+|   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares check - capture only", () => {
  boardSquares[3][3].chessPiece = new Rook(Color.White);
  boardSquares[3][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [boardSquares[3][4]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
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
// 3 |   |   |   |WR | + |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares check - hide King only", () => {
  boardSquares[3][3].chessPiece = new Rook(Color.White);
  boardSquares[5][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [boardSquares[3][4]];

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
// 3 |   |   |   |WR |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |BQ |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return empty array when King is in check and it is not possible to cover it", () => {
  boardSquares[3][3].chessPiece = new Rook(Color.White);
  boardSquares[2][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
});
