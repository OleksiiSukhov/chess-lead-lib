import { isEqual, xorWith } from "lodash";

import { King } from "../../chess-pieces/king";
import { Queen } from "../../chess-pieces/queen";
import { Rook } from "../../chess-pieces/rook";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { TestAssistance } from "../../tests/test-assistance";
import { Cell } from "../cell";
import { RookMovements } from "./rook-movements";

let rookMovements: RookMovements;
let boardCells: Cell[][];
const boardState: BoardState = new BoardState();

beforeEach(() => {
  rookMovements = new RookMovements();
  boardCells = TestAssistance.setupEmptyBoard();
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
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

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
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

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
// 3 |   |BQ+| + |WR | + | + | + | + |
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
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[3][1] = { rowIndex: 3, columnIndex: 1, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [
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
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
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

// todo: add test for check (attack enemy only)
// todo: add test for check (hide king from enemy)
// todo: add test for check (no any cells available)

function assertAvailableMovementCells(expected: Cell[], currentCell: Cell): void {
  const actual = rookMovements.getAvailable(boardState, currentCell);
  expect(xorWith(actual, expected, isEqual).length).toBe(0);
}
