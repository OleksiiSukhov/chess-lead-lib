import { isEqual, xorWith } from "lodash";

import { King } from "../../chess-pieces/king";
import { Pawn } from "../../chess-pieces/pawn";
import { Queen } from "../../chess-pieces/queen";
import { Rook } from "../../chess-pieces/rook";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { TestAssistance } from "../../tests/test-assistance";
import { Cell } from "../cell";
import { KingMovements } from "./king-movements";
import { Bishop } from "../../chess-pieces/bishop";

let kingMovements: KingMovements;
let boardCells: Cell[][];
const boardState: BoardState = new BoardState();

beforeEach(() => {
  kingMovements = new KingMovements();
  boardCells = TestAssistance.setupEmptyBoard();
  boardState.board = boardCells;
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   | + | + | + |   |   |   |
//   _________________________________
// 3 |   |   | + |WKI| + |   |   |   |
//   _________________________________
// 2 |   |   | + | + | + |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |   |   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells for empty board", () => {
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new King(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;

  const expected: Cell[] = [
    boardCells[4][2],
    boardCells[4][3],
    boardCells[4][4],
    boardCells[3][2],
    boardCells[3][4],
    boardCells[2][2],
    boardCells[2][3],
    boardCells[2][4],
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
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 | + | + |   |   |   |   |   |   |
//   _________________________________
// 0 |WKI| + |   |   |   |   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells from angle of the board", () => {
  const king = new King(Color.White);
  king.movedNumber = 10;

  const currentCell = { rowIndex: 0, columnIndex: 0, chessPiece: king } as Cell;

  boardCells[0][0] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;

  const expected: Cell[] = [boardCells[1][0], boardCells[1][1], boardCells[0][1]];

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
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 | + | + |   |   |   |   |   |   |
//   _________________________________
// 0 |WKI|   |   |   |BR |   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells check - hide from enemy on available cells", () => {
  const currentCell = { rowIndex: 0, columnIndex: 0, chessPiece: new King(Color.White) } as Cell;

  boardCells[0][0] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new Rook(Color.Black) } as Cell;

  const expected: Cell[] = [boardCells[1][0], boardCells[1][1]];

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
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |BQ+|   |   |   |   |   |   |   |
//   _________________________________
// 0 |WKI|   |   |   |   |   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells check - capture only", () => {
  const king = new King(Color.White);
  king.movedNumber = 10;

  const currentCell = { rowIndex: 0, columnIndex: 0, chessPiece: king } as Cell;

  boardCells[0][0] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[1][0] = { rowIndex: 1, columnIndex: 0, chessPiece: new Queen(Color.Black) } as Cell;

  const expected: Cell[] = [boardCells[1][0]];

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
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |BR |   |   |WP | + |   |   |
//   _________________________________
// 0 |BR |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells check - hide from enemy behind ally", () => {
  const currentCell = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

  boardCells[0][4] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[1][1] = { rowIndex: 1, columnIndex: 1, chessPiece: new Rook(Color.Black) } as Cell;
  boardCells[0][0] = { rowIndex: 0, columnIndex: 0, chessPiece: new Rook(Color.Black) } as Cell;
  boardCells[1][4] = { rowIndex: 1, columnIndex: 4, chessPiece: new Pawn(Color.White) } as Cell;

  const expected: Cell[] = [boardCells[1][5]];

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
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |BR |   |   |   |   |   |   |
//   _________________________________
// 0 |BR |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return empty array in case checkmate", () => {
  const currentCell = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

  boardCells[0][4] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[1][1] = { rowIndex: 1, columnIndex: 1, chessPiece: new Rook(Color.Black) } as Cell;
  boardCells[0][0] = { rowIndex: 0, columnIndex: 0, chessPiece: new Rook(Color.Black) } as Cell;

  const expected: Cell[] = [];

  assertAvailableMovementCells(expected, currentCell);
});

//   _________________________________
// 7 |   |   |   |   |   |   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   | + |WKI| + |   |   |
//   _________________________________
// 1 |   |   |   | + | + | + |   |   |
//   _________________________________
// 0 |   |   |   |   |   |   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable should return correct cells check - no next to enemy king cells", () => {
  const currentCell = { rowIndex: 2, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

  boardCells[2][4] = currentCell;
  boardCells[4][4] = { rowIndex: 4, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;

  const expected: Cell[] = [
    boardCells[2][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[2][5],
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
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   | + | + | + |   |   |
//   _________________________________
// 0 |WR |   | + | + |WKI| + | + |WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - available - white", () => {
  const currentCell = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

  boardCells[0][4] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][7] = { rowIndex: 0, columnIndex: 7, chessPiece: new Rook(Color.White) } as Cell;
  boardCells[0][0] = { rowIndex: 0, columnIndex: 0, chessPiece: new Rook(Color.White) } as Cell;

  const expected: Cell[] = [
    boardCells[0][2],
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
    boardCells[0][6],
  ];

  assertAvailableMovementCells(expected, currentCell);
});

//   _________________________________
// 7 |BR |   | + | + |BKI| + | + |BR |
//   _________________________________
// 6 |   |   |   | + | + | + |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
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
test("getAvailable for castling - available - black", () => {
  const currentCell = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;

  boardCells[7][4] = currentCell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[7][7] = { rowIndex: 7, columnIndex: 7, chessPiece: new Rook(Color.Black) } as Cell;
  boardCells[7][0] = { rowIndex: 7, columnIndex: 0, chessPiece: new Rook(Color.Black) } as Cell;

  const expected: Cell[] = [
    boardCells[7][2],
    boardCells[7][3],
    boardCells[6][3],
    boardCells[6][4],
    boardCells[6][5],
    boardCells[7][5],
    boardCells[7][6],
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
// 4 |   |   |   |BB |BB |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   | + | + | + |   |   |
//   _________________________________
// 0 |WR |   | + | + |WKI| + | + |WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - available - rook is under attack - white", () => {
  const currentCell = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

  boardCells[0][4] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[4][3] = { rowIndex: 4, columnIndex: 3, chessPiece: new Bishop(Color.Black) } as Cell;
  boardCells[4][4] = { rowIndex: 4, columnIndex: 4, chessPiece: new Bishop(Color.Black) } as Cell;

  boardCells[0][7] = { rowIndex: 0, columnIndex: 7, chessPiece: new Rook(Color.White) } as Cell;
  boardCells[0][0] = { rowIndex: 0, columnIndex: 0, chessPiece: new Rook(Color.White) } as Cell;

  const expected: Cell[] = [
    boardCells[0][2],
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
    boardCells[0][6],
  ];

  assertAvailableMovementCells(expected, currentCell);
});

//   _________________________________
// 7 |BR |   | + | + |BKI| + | + |BR |
//   _________________________________
// 6 |   |   |   | + | + | + |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |WB |WB |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - available - rook is under attack - black", () => {
  const currentCell = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;

  boardCells[7][4] = currentCell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[3][3] = { rowIndex: 3, columnIndex: 3, chessPiece: new Bishop(Color.White) } as Cell;
  boardCells[3][4] = { rowIndex: 3, columnIndex: 4, chessPiece: new Bishop(Color.White) } as Cell;

  boardCells[7][7] = { rowIndex: 7, columnIndex: 7, chessPiece: new Rook(Color.Black) } as Cell;
  boardCells[7][0] = { rowIndex: 7, columnIndex: 0, chessPiece: new Rook(Color.Black) } as Cell;

  const expected: Cell[] = [
    boardCells[7][2],
    boardCells[7][3],
    boardCells[6][3],
    boardCells[6][4],
    boardCells[6][5],
    boardCells[7][5],
    boardCells[7][6],
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
// 4 |   |   |   |   |   |BB |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   | + | + | + |   |   |
//   _________________________________
// 0 |WR |   | + | + |WKI| + | + |WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - available - rook crosses cell that is under attack - white", () => {
  const currentCell = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

  boardCells[0][4] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[4][5] = { rowIndex: 4, columnIndex: 5, chessPiece: new Bishop(Color.Black) } as Cell;

  boardCells[0][7] = { rowIndex: 0, columnIndex: 7, chessPiece: new Rook(Color.White) } as Cell;
  boardCells[0][0] = { rowIndex: 0, columnIndex: 0, chessPiece: new Rook(Color.White) } as Cell;

  const expected: Cell[] = [
    boardCells[0][2],
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
    boardCells[0][6],
  ];

  assertAvailableMovementCells(expected, currentCell);
});

//   _________________________________
// 7 |BR |   | + | + |BKI| + | + |BR |
//   _________________________________
// 6 |   |   |   | + | + | + |   |   |
//   _________________________________
// 5 |   |   |   |   |   |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |WB |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   |   |   |   |   |
//   _________________________________
// 0 |   |   |   |   |WKI|   |   |   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - available - rook crosses cell that is under attack - black", () => {
  const currentCell = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;

  boardCells[7][4] = currentCell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;
  boardCells[3][5] = { rowIndex: 3, columnIndex: 5, chessPiece: new Bishop(Color.White) } as Cell;

  boardCells[7][7] = { rowIndex: 7, columnIndex: 7, chessPiece: new Rook(Color.Black) } as Cell;
  boardCells[7][0] = { rowIndex: 7, columnIndex: 0, chessPiece: new Rook(Color.Black) } as Cell;

  const expected: Cell[] = [
    boardCells[7][2],
    boardCells[7][3],
    boardCells[6][3],
    boardCells[6][4],
    boardCells[6][5],
    boardCells[7][5],
    boardCells[7][6],
  ];

  assertAvailableMovementCells(expected, currentCell);
});

// todo: castling (not available) king previously moved during the game.
// todo: castling (not available) rook previously moved during the game.
// todo: castling (not available) There are pieces between the king and the rook.
// todo: castling (not available) king in check.
// todo: castling (not available) king should pass through any square that is under attack by an enemy piece
// todo: castling (not available) king should move to a square that would result in check.

function assertAvailableMovementCells(expected: Cell[], currentCell: Cell): void {
  const actual = kingMovements.getAvailable(boardState, currentCell, true);

  expect(xorWith(actual, expected, isEqual).length).toBe(0);
}
