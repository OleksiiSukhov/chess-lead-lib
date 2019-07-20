import { isEqual, xorWith } from "lodash";

import { Bishop } from "../../chess-pieces/bishop";
import { Color } from "../../models/color";
import { TestBoardAssistance } from "../../tests/test-board-assistance";
import { Cell } from "../cell";
import { BishopMovements } from "./bishop-movements";
import { King } from "../../chess-pieces/king";

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
test("getAvailable should return correct available movement cells move for empty board", () => {
  const bishopMovements = new BishopMovements();

  const boardCells: Cell[][] = TestBoardAssistance.setupEmptyBoard();
  const currentCell = { rowIndex: 3, columnIndex: 3, chessPiece: new Bishop(Color.White) } as Cell;

  boardCells[3][3] = currentCell;
  boardCells[7][4] = { rowIndex: 7, columnIndex: 4, chessPiece: new King(Color.Black) } as Cell;
  boardCells[0][4] = { rowIndex: 0, columnIndex: 4, chessPiece: new King(Color.White) } as Cell;

  const expectedAvailableCells: Cell[] = [
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

  const actual = bishopMovements.getAvailable(boardCells, currentCell);

  expect(xorWith(actual, expectedAvailableCells, isEqual).length).toBe(0);
});
