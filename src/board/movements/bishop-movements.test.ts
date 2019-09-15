import { Bishop } from "../../chess-pieces/bishop";
import { Queen } from "../../chess-pieces/queen";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Square } from "../../models/square";
import { BoardBuilder } from "../board-builder";
import { BishopMovements } from "./bishop-movements";
import { TestAssistance } from "./test-assistance";

let boardSquares: Square[][];
const boardState: BoardState = new BoardState();
let testAssistance: TestAssistance;

beforeEach(() => {
  boardSquares = BoardBuilder.setupEmptyBoard();
  boardState.board = boardSquares;
  testAssistance = new TestAssistance(boardState, new BishopMovements());
  testAssistance.setupKingsOnInitialPositions();
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   | + |
//   _________________________________
// 6 | + |   |   |   |   |   | + |   |
//   _________________________________
// 5 |   | + |   |   |   | + |   |   |
//   _________________________________
// 4 |   |   | + |   | + |   |   |   |
//   _________________________________
// 3 |   |   |   |WB |   |   |   |   |
//   _________________________________
// 2 |   |   | + |   | + |   |   |   |
//   _________________________________
// 1 |   | + |   |   |   | + |   |   |
//   _________________________________
// 0 | + |   |   |   |WKI|   | + |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares for empty board", () => {
  boardSquares[3][3].chessPiece = new Bishop(Color.White);

  const expected: Square[] = [
    boardSquares[6][0],
    boardSquares[5][1],
    boardSquares[4][2],
    boardSquares[0][0],
    boardSquares[1][1],
    boardSquares[2][2],
    boardSquares[4][4],
    boardSquares[5][5],
    boardSquares[6][6],
    boardSquares[7][7],
    boardSquares[2][4],
    boardSquares[1][5],
    boardSquares[0][6],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   | + |
//   _________________________________
// 6 |   |   |   |   |   |   | + |   |
//   _________________________________
// 5 |   |   |   |   |   | + |   |   |
//   _________________________________
// 4 |   |   |   |   | + |   |   |   |
//   _________________________________
// 3 |   |   |   | + |   |   |   |   |
//   _________________________________
// 2 |   |   | + |   |   |   |   |   |
//   _________________________________
// 1 |   | + |   |   |   |   |   |   |
//   _________________________________
// 0 |WB |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares from angle of the board", () => {
  boardSquares[0][0].chessPiece = new Bishop(Color.White);

  const expected: Square[] = [
    boardSquares[1][1],
    boardSquares[2][2],
    boardSquares[3][3],
    boardSquares[4][4],
    boardSquares[5][5],
    boardSquares[6][6],
    boardSquares[7][7],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][0]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   | + |
//   _________________________________
// 6 |   |   |   |   |   |   | + |   |
//   _________________________________
// 5 |   |BQ+|   |   |   | + |   |   |
//   _________________________________
// 4 |   |   | + |   | + |   |   |   |
//   _________________________________
// 3 |   |   |   |WB |   |   |   |   |
//   _________________________________
// 2 |   |   | + |   | + |   |   |   |
//   _________________________________
// 1 |   | + |   |   |   | + |   |   |
//   _________________________________
// 0 | + |   |   |   |WKI|   | + |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares for board with enemy on the way", () => {
  boardSquares[3][3].chessPiece = new Bishop(Color.White);
  boardSquares[5][1].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [
    boardSquares[5][1],
    boardSquares[4][2],
    boardSquares[0][0],
    boardSquares[1][1],
    boardSquares[2][2],
    boardSquares[4][4],
    boardSquares[5][5],
    boardSquares[6][6],
    boardSquares[7][7],
    boardSquares[2][4],
    boardSquares[1][5],
    boardSquares[0][6],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   | + |
//   _________________________________
// 6 |   |   |   |   |   |   | + |   |
//   _________________________________
// 5 |   |WQ |   |   |   | + |   |   |
//   _________________________________
// 4 |   |   | + |   | + |   |   |   |
//   _________________________________
// 3 |   |   |   |WB |   |   |   |   |
//   _________________________________
// 2 |   |   | + |   | + |   |   |   |
//   _________________________________
// 1 |   | + |   |   |   | + |   |   |
//   _________________________________
// 0 | + |   |   |   |WKI|   | + |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares for board with ally on the way", () => {
  boardSquares[3][3].chessPiece = new Bishop(Color.White);
  boardSquares[5][1].chessPiece = new Queen(Color.White);

  const expected: Square[] = [
    boardSquares[4][2],
    boardSquares[0][0],
    boardSquares[1][1],
    boardSquares[2][2],
    boardSquares[4][4],
    boardSquares[5][5],
    boardSquares[6][6],
    boardSquares[7][7],
    boardSquares[2][4],
    boardSquares[1][5],
    boardSquares[0][6],
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
// 4 |   |   |   |   |BQ+|   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |WB |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares check - capture only", () => {
  boardSquares[0][0].chessPiece = new Bishop(Color.White);
  boardSquares[4][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [boardSquares[4][4]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][0]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |BQ |   |   |   |
//   _________________________________
// 4 |   |   |   |   | + |   |   |   |
//   _________________________________
// 3 |   |   |   |WB |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   | + |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct squares check - hide King only", () => {
  boardSquares[3][3].chessPiece = new Bishop(Color.White);
  boardSquares[5][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [boardSquares[2][4], boardSquares[4][4]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |WB |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |BQ |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return empty array when King is in check and it is not possible to cover it", () => {
  boardSquares[4][3].chessPiece = new Bishop(Color.White);
  boardSquares[2][4].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[4][3]);
});
