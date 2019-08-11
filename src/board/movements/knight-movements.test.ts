import { Knight } from "../../chess-pieces/knight";
import { Queen } from "../../chess-pieces/queen";
import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Color } from "../../models/color";
import { BoardBuilder } from "../board-builder";
import { KnightMovements } from "./knight-movements";
import { TestAssistance } from "./test-assistance";

let boardCells: Cell[][];
const boardState: BoardState = new BoardState();
let testAssistance: TestAssistance;

beforeEach(() => {
  boardCells = BoardBuilder.setupEmptyBoard();
  boardState.board = boardCells;
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
test("getAvailable should return correct cells for empty board", () => {
  boardCells[3][3].chessPiece = new Knight(Color.White);

  const expected: Cell[] = [
    boardCells[1][2],
    boardCells[1][4],
    boardCells[5][2],
    boardCells[5][4],
    boardCells[2][1],
    boardCells[2][5],
    boardCells[4][1],
    boardCells[4][5],
  ];

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
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   | + |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   | + |   |   |   |   |   |
//   _________________________________
// 0 |WKN|   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells from angle of the board", () => {
  boardCells[0][0].chessPiece = new Knight(Color.White);

  const expected: Cell[] = [boardCells[2][1], boardCells[1][2]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][0]);
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
test("getAvailable should return correct cells for board with enemy on the way", () => {
  boardCells[3][3].chessPiece = new Knight(Color.White);
  boardCells[5][2].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [
    boardCells[1][2],
    boardCells[1][4],
    boardCells[5][2],
    boardCells[5][4],
    boardCells[2][1],
    boardCells[2][5],
    boardCells[4][1],
    boardCells[4][5],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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
test("getAvailable should return correct cells for board with ally on the way", () => {
  boardCells[3][3].chessPiece = new Knight(Color.White);
  boardCells[5][2].chessPiece = new Queen(Color.White);

  const expected: Cell[] = [
    boardCells[1][2],
    boardCells[1][4],
    boardCells[5][4],
    boardCells[2][1],
    boardCells[2][5],
    boardCells[4][1],
    boardCells[4][5],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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
test("getAvailable should return correct cells check - capture only", () => {
  boardCells[4][2].chessPiece = new Knight(Color.White);
  boardCells[3][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [boardCells[3][4]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[4][2]);
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
test("getAvailable should return correct cells check - hide King only", () => {
  boardCells[1][3].chessPiece = new Knight(Color.White);
  boardCells[5][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [boardCells[3][4]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[1][3]);
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
  boardCells[0][7].chessPiece = new Knight(Color.White);
  boardCells[2][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][7]);
});
