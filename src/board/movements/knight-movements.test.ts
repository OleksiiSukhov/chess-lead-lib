import { isEqual, xorWith } from "lodash";

import { King } from "../../chess-pieces/king";
import { Knight } from "../../chess-pieces/knight";
import { Queen } from "../../chess-pieces/queen";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { TestAssistance } from "../../tests/test-assistance";
import { Cell } from "../cell";
import { KnightMovements } from "./knight-movements";

let knightMovements: KnightMovements;
let boardCells: Cell[][];
const boardState: BoardState = new BoardState();

beforeEach(() => {
  knightMovements = new KnightMovements();
  boardCells = TestAssistance.setupEmptyBoard();
  TestAssistance.setupKingsOnInitialPositions(boardCells);
  boardState.board = boardCells;
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
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Knight(Color.White) } as Cell;

  boardCells[3][3] = currentCell;

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
// 2 |   | + |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   | + |   |   |   |   |   |
//   _________________________________
// 0 |WKN|   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells from angle of the board", () => {
  const currentCell = { rowIndex: 0, columnIndex: 0, chessPiece: new Knight(Color.White) } as Cell;

  boardCells[0][0] = currentCell;

  const expected: Cell[] = [boardCells[2][1], boardCells[1][2]];

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Knight(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[5][2] = { rowIndex: 5, columnIndex: 2, chessPiece: new Queen(Color.Black) } as Cell;

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

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Knight(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[5][2] = { rowIndex: 5, columnIndex: 2, chessPiece: new Queen(Color.White) } as Cell;

  const expected: Cell[] = [
    boardCells[1][2],
    boardCells[1][4],
    boardCells[5][4],
    boardCells[2][1],
    boardCells[2][5],
    boardCells[4][1],
    boardCells[4][5],
  ];

  assertAvailableMovementCells(expected, currentCell);
});

// todo: add test for check (attack enemy only)
// todo: add test for check (hide king from enemy)
// todo: add test for check (no any cells available)

function assertAvailableMovementCells(expected: Cell[], currentCell: Cell): void {
  const actual = knightMovements.getAvailable(boardState, currentCell);
  expect(xorWith(actual, expected, isEqual).length).toBe(0);
}
