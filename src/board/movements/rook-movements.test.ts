import { Queen } from "../../chess-pieces/queen";
import { Rook } from "../../chess-pieces/rook";
import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Color } from "../../models/color";
import { BoardBuilder } from "../board-builder";
import { RookMovements } from "./rook-movements";
import { TestAssistance } from "./test-assistance";

let boardCells: Cell[][];
const boardState: BoardState = new BoardState();
let testAssistance: TestAssistance;

beforeEach(() => {
  boardCells = BoardBuilder.setupEmptyBoard();
  boardState.board = boardCells;
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
test("getAvailable should return correct cells for empty board", () => {
  boardCells[3][3].chessPiece = new Rook(Color.White);

  const expected: Cell[] = [
    boardCells[3][0],
    boardCells[3][1],
    boardCells[3][2],
    boardCells[3][4],
    boardCells[3][5],
    boardCells[3][6],
    boardCells[3][7],
    boardCells[0][3],
    boardCells[1][3],
    boardCells[2][3],
    boardCells[4][3],
    boardCells[5][3],
    boardCells[6][3],
    boardCells[7][3],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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
test("getAvailable should return correct cells from angle of the board", () => {
  boardCells[0][0].chessPiece = new Rook(Color.White);

  const expected: Cell[] = [
    boardCells[1][0],
    boardCells[2][0],
    boardCells[3][0],
    boardCells[4][0],
    boardCells[5][0],
    boardCells[6][0],
    boardCells[7][0],
    boardCells[0][1],
    boardCells[0][2],
    boardCells[0][3],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][0]);
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
test("getAvailable should return correct cells for board with enemy on the way", () => {
  boardCells[3][3].chessPiece = new Rook(Color.White);
  boardCells[3][2].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [
    boardCells[3][2],
    boardCells[3][4],
    boardCells[3][5],
    boardCells[3][6],
    boardCells[3][7],
    boardCells[0][3],
    boardCells[1][3],
    boardCells[2][3],
    boardCells[4][3],
    boardCells[5][3],
    boardCells[6][3],
    boardCells[7][3],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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
test("getAvailable should return correct cells for board with ally on the way", () => {
  boardCells[3][3].chessPiece = new Rook(Color.White);
  boardCells[3][1].chessPiece = new Queen(Color.White);

  const expected: Cell[] = [
    boardCells[3][2],
    boardCells[3][4],
    boardCells[3][5],
    boardCells[3][6],
    boardCells[3][7],
    boardCells[0][3],
    boardCells[1][3],
    boardCells[2][3],
    boardCells[4][3],
    boardCells[5][3],
    boardCells[6][3],
    boardCells[7][3],
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
// 3 |   |   |   |WR |BQ+|   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells check - capture only", () => {
  boardCells[3][3].chessPiece = new Rook(Color.White);
  boardCells[3][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [boardCells[3][4]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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
test("getAvailable should return correct cells check - hide King only", () => {
  boardCells[3][3].chessPiece = new Rook(Color.White);
  boardCells[5][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [boardCells[3][4]];

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
  boardCells[3][3].chessPiece = new Rook(Color.White);
  boardCells[2][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [];

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
});
