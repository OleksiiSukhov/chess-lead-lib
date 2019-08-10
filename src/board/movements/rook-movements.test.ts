import { isEqual, xorWith } from "lodash";

import { Queen } from "../../chess-pieces/queen";
import { Rook } from "../../chess-pieces/rook";
import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Color } from "../../models/color";
import { TestAssistance } from "../../tests/test-assistance";
import { RookMovements } from "./rook-movements";

let rookMovements: RookMovements;
let boardCells: Cell[][];
const boardState: BoardState = new BoardState();

beforeEach(() => {
  rookMovements = new RookMovements();
  boardCells = TestAssistance.setupEmptyBoard();
  TestAssistance.setupKingsOnInitialPositions(boardCells);
  boardState.board = boardCells;
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
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Rook(Color.White) } as Cell;

  boardCells[3][3] = currentCell;

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

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 0, columnIndex: 0, chessPiece: new Rook(Color.White) } as Cell;

  boardCells[0][0] = currentCell;

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

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Rook(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[3][2] = { rowIndex: 3, columnIndex: 2, chessPiece: new Queen(Color.Black) } as Cell;

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

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Rook(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[3][1] = { rowIndex: 3, columnIndex: 1, chessPiece: new Queen(Color.White) } as Cell;

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

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Rook(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[3][4] = { rowIndex: 3, columnIndex: 4, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [boardCells[3][4]];

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Rook(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[5][4] = { rowIndex: 5, columnIndex: 4, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [boardCells[3][4]];

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Rook(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[2][4] = { rowIndex: 2, columnIndex: 4, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [];

  assertAvailableMovementCells(expected, currentCell);
});

function assertAvailableMovementCells(expected: Cell[], currentCell: Cell): void {
  const actual = rookMovements.getAvailable(boardState, currentCell, true);
  expect(xorWith(actual, expected, isEqual).length).toBe(0);
}
