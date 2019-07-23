import { isEqual, xorWith } from "lodash";

import { King } from "../../chess-pieces/king";
import { Pawn } from "../../chess-pieces/pawn";
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

  const expected: Cell[] = [
    boardCells[3][3],
    boardCells[2][3],
  ];

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

  const expected: Cell[] = [
    boardCells[5][3],
    boardCells[4][3],
  ];

  assertAvailableMovementCells(expected, currentCell);
});

// todo: initial position (white)
// todo: initial position (black)
// todo: not initial position (white)
// todo: not initial position (black)
// todo: no any options to move (white)
// todo: no any options to move (black)
// todo: diagonal capture (initial position) (white)
// todo: diagonal capture (initial position) (black)
// todo: diagonal capture (not initial position) (white)
// todo: diagonal capture (not initial position) (black)
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
