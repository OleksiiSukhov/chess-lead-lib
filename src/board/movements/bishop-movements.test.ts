import { isEqual, xorWith } from "lodash";

import { Bishop } from "../../chess-pieces/bishop";
import { Queen } from "../../chess-pieces/queen";
import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Color } from "../../models/color";
import { TestAssistance } from "../../tests/test-assistance";
import { BishopMovements } from "./bishop-movements";
import { BoardBuilder } from "../board-builder";

let bishopMovements: BishopMovements;
let boardCells: Cell[][];
const boardState: BoardState = new BoardState();

beforeEach(() => {
  bishopMovements = new BishopMovements();
  boardCells = BoardBuilder.setupEmptyBoard();
  TestAssistance.setupKingsOnInitialPositions(boardCells);
  boardState.board = boardCells;
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
test("getAvailable should return correct cells for empty board", () => {
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Bishop(Color.White) } as Cell;

  boardCells[3][3] = currentCell;

  const expected: Cell[] = [
    boardCells[6][0],
    boardCells[5][1],
    boardCells[4][2],
    boardCells[0][0],
    boardCells[1][1],
    boardCells[2][2],
    boardCells[4][4],
    boardCells[5][5],
    boardCells[6][6],
    boardCells[7][7],
    boardCells[2][4],
    boardCells[1][5],
    boardCells[0][6],
  ];

  assertAvailableMovementCells(expected, currentCell);
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
test("getAvailable should return correct cells from angle of the board", () => {
  const currentCell = { rowIndex: 0, columnIndex: 0, chessPiece: new Bishop(Color.White) } as Cell;

  boardCells[0][0] = currentCell;

  const expected: Cell[] = [
    boardCells[1][1],
    boardCells[2][2],
    boardCells[3][3],
    boardCells[4][4],
    boardCells[5][5],
    boardCells[6][6],
    boardCells[7][7],
  ];

  assertAvailableMovementCells(expected, currentCell);
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
test("getAvailable should return correct cells for board with enemy on the way", () => {
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Bishop(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[5][1] = { rowIndex: 5, columnIndex: 1, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [
    boardCells[5][1],
    boardCells[4][2],
    boardCells[0][0],
    boardCells[1][1],
    boardCells[2][2],
    boardCells[4][4],
    boardCells[5][5],
    boardCells[6][6],
    boardCells[7][7],
    boardCells[2][4],
    boardCells[1][5],
    boardCells[0][6],
  ];

  assertAvailableMovementCells(expected, currentCell);
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
test("getAvailable should return correct cells for board with ally on the way", () => {
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Bishop(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[5][1] = { rowIndex: 5, columnIndex: 1, chessPiece: new Queen(Color.White) } as Cell;

  const expected: Cell[] = [
    boardCells[4][2],
    boardCells[0][0],
    boardCells[1][1],
    boardCells[2][2],
    boardCells[4][4],
    boardCells[5][5],
    boardCells[6][6],
    boardCells[7][7],
    boardCells[2][4],
    boardCells[1][5],
    boardCells[0][6],
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
test("getAvailable should return correct cells check - capture only", () => {
  const currentCell = { rowIndex: 0, columnIndex: 0, chessPiece: new Bishop(Color.White) } as Cell;

  boardCells[0][0] = currentCell;
  boardCells[4][4] = { rowIndex: 4, columnIndex: 4, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [boardCells[4][4]];

  assertAvailableMovementCells(expected, currentCell);
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
test("getAvailable should return correct cells check - hide King only", () => {
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Bishop(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[5][4] = { rowIndex: 5, columnIndex: 4, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [boardCells[2][4], boardCells[4][4]];

  assertAvailableMovementCells(expected, currentCell);
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
  const currentCell = { rowIndex: 4, columnIndex: 3, chessPiece: new Bishop(Color.White) } as Cell;

  boardCells[4][3] = currentCell;
  boardCells[2][4] = { rowIndex: 2, columnIndex: 4, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [];

  assertAvailableMovementCells(expected, currentCell);
});

function assertAvailableMovementCells(expected: Cell[], currentCell: Cell): void {
  const actual = bishopMovements.getAvailable(boardState, currentCell, true);
  expect(xorWith(actual, expected, isEqual).length).toBe(0);
}
