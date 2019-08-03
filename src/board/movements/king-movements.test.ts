import { isEqual, xorWith } from "lodash";

import { King } from "../../chess-pieces/king";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { TestAssistance } from "../../tests/test-assistance";
import { Cell } from "../cell";
import { KingMovements } from "./king-movements";

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
  const currentCell = { rowIndex: 0, columnIndex: 0, chessPiece: new King(Color.White) } as Cell;

  boardCells[0][0] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;

  const expected: Cell[] = [boardCells[1][0], boardCells[1][1], boardCells[0][1]];

  assertAvailableMovementCells(expected, currentCell);
});

// todo: add test for check (no cells under attack)
// todo: add test for check (attack enemy only)
// todo: add test for check (hide from enemy behind ally)
// todo: add test for check (no any cells available - checkmate)

// todo: castling (available) left
// todo: castling (available) right
// todo: castling (available) rook is under attack.
// todo: castling (available) rook crosses an attacked square.

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
