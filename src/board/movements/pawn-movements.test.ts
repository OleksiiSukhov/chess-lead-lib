import { isEqual, xorWith } from "lodash";

import { King } from "../../chess-pieces/king";
import { Pawn } from "../../chess-pieces/pawn";
import { Queen } from "../../chess-pieces/queen";
import { Color } from "../../models/color";
import { TestAssistance } from "../../tests/test-assistance";
import { Cell } from "../cell";
import { PawnMovements } from "./pawn-movements";

let pawnMovements: PawnMovements;
let boardCells: Cell[][];

beforeEach(() => {
  pawnMovements = new PawnMovements();
  boardCells = TestAssistance.setupEmptyBoard();
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
  const currentCell = { rowIndex: 1, columnIndex: 3, chessPiece: new Pawn(Color.White) } as Cell;

  boardCells[1][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

  const expected: Cell[] = [boardCells[3][3], boardCells[2][3]];

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 6, columnIndex: 3, chessPiece: new Pawn(Color.Black) } as Cell;

  boardCells[6][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

  const expected: Cell[] = [boardCells[5][3], boardCells[4][3]];

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
  const currentCell = { rowIndex: 1, columnIndex: 3, chessPiece: new Pawn(Color.White) } as Cell;

  boardCells[1][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[2][3] = { rowIndex: 2, columnIndex: 3, chessPiece: new Queen(Color.White) } as Cell;

  const expected: Cell[] = [];

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 6, columnIndex: 3, chessPiece: new Pawn(Color.Black) } as Cell;

  boardCells[6][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[5][3] = { rowIndex: 5, columnIndex: 3, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [];

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
// 3 |   |   |WQ | + |BQ+|   |   |   |
//   _________________________________
// 2 |   |   |   |WP |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells for diagonal capture (white)", () => {
  const currentCell = { rowIndex: 2, columnIndex: 3, chessPiece: new Pawn(Color.White) } as Cell;

  boardCells[2][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[3][4] = { rowIndex: 3, columnIndex: 4, chessPiece: new Queen(Color.Black) } as Cell;
  boardCells[3][2] = { rowIndex: 3, columnIndex: 2, chessPiece: new Queen(Color.White) } as Cell;

  const expected: Cell[] = [boardCells[3][3], boardCells[3][4]];

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 5, columnIndex: 3, chessPiece: new Pawn(Color.Black) } as Cell;

  boardCells[5][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[4][4] = { rowIndex: 4, columnIndex: 4, chessPiece: new Queen(Color.Black) } as Cell;
  boardCells[4][2] = { rowIndex: 4, columnIndex: 2, chessPiece: new Queen(Color.White) } as Cell;

  const expected: Cell[] = [boardCells[4][2], boardCells[4][3]];

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
// 3 |   |   |   | + |   |   |   |   |
//   _________________________________
// 2 |   |   |WQ | + |BQ+|   |   |   |
//   _________________________________
// 1 |   |   |   |WP |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells for initial position and diagonal capture (white)", () => {
  const currentCell = { rowIndex: 1, columnIndex: 3, chessPiece: new Pawn(Color.White) } as Cell;

  boardCells[1][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[2][4] = { rowIndex: 2, columnIndex: 4, chessPiece: new Queen(Color.Black) } as Cell;
  boardCells[2][2] = { rowIndex: 2, columnIndex: 2, chessPiece: new Queen(Color.White) } as Cell;

  const expected: Cell[] = [boardCells[2][3], boardCells[3][3], boardCells[2][4]];

  assertAvailableMovementCells(expected, currentCell);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |BP |   |   |   |   |
//   _________________________________
// 5 |   |   |WQ+| + |BQ |   |   |   |
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
test("getAvailable should return correct cells for initial position and diagonal capture (black)", () => {
  const currentCell = { rowIndex: 6, columnIndex: 3, chessPiece: new Pawn(Color.Black) } as Cell;

  boardCells[6][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[5][4] = { rowIndex: 5, columnIndex: 4, chessPiece: new Queen(Color.Black) } as Cell;
  boardCells[5][2] = { rowIndex: 5, columnIndex: 2, chessPiece: new Queen(Color.White) } as Cell;

  const expected: Cell[] = [boardCells[4][3], boardCells[5][3], boardCells[5][2]];

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
  const currentCell = { rowIndex: 2, columnIndex: 3, chessPiece: new Pawn(Color.White) } as Cell;

  boardCells[2][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[3][3] = { rowIndex: 3, columnIndex: 3, chessPiece: new Queen(Color.White) } as Cell;

  const expected: Cell[] = [];

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 5, columnIndex: 3, chessPiece: new Pawn(Color.Black) } as Cell;

  boardCells[5][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[4][3] = { rowIndex: 4, columnIndex: 3, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [];

  assertAvailableMovementCells(expected, currentCell);
});

// todo: promotion (white)
// todo: promotion (black)
// todo: en passant (white)
// todo: en passant (black)

// todo: add test for check (attack enemy only)
// todo: add test for check (hide king from enemy)
// todo: add test for check (no any cells available)

function assertAvailableMovementCells(expected: Cell[], currentCell: Cell): void {
  const actual = pawnMovements.getAvailable(boardCells, currentCell);
  expect(xorWith(actual, expected, isEqual).length).toBe(0);
}
