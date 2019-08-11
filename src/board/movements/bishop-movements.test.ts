import { Bishop } from "../../chess-pieces/bishop";
import { Queen } from "../../chess-pieces/queen";
import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Color } from "../../models/color";
import { BoardBuilder } from "../board-builder";
import { BishopMovements } from "./bishop-movements";
import { TestAssistance } from "./test-assistance";

let boardCells: Cell[][];
const boardState: BoardState = new BoardState();
let testAssistance: TestAssistance;

beforeEach(() => {
  boardCells = BoardBuilder.setupEmptyBoard();
  boardState.board = boardCells;
  testAssistance = new TestAssistance(boardState, new BishopMovements());
  testAssistance.setupKingsOnInitialPositions();
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
  boardCells[3][3].chessPiece = new Bishop(Color.White);

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

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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
  boardCells[0][0].chessPiece = new Bishop(Color.White);

  const expected: Cell[] = [
    boardCells[1][1],
    boardCells[2][2],
    boardCells[3][3],
    boardCells[4][4],
    boardCells[5][5],
    boardCells[6][6],
    boardCells[7][7],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][0]);
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
  boardCells[3][3].chessPiece = new Bishop(Color.White);
  boardCells[5][1].chessPiece = new Queen(Color.Black);

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

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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
  boardCells[3][3].chessPiece = new Bishop(Color.White);
  boardCells[5][1].chessPiece = new Queen(Color.White);

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

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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
  boardCells[0][0].chessPiece = new Bishop(Color.White);
  boardCells[4][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [boardCells[4][4]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][0]);
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
  boardCells[3][3].chessPiece = new Bishop(Color.White);
  boardCells[5][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [boardCells[2][4], boardCells[4][4]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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
  boardCells[4][3].chessPiece = new Bishop(Color.White);
  boardCells[2][4].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [];

  testAssistance.assertAvailableMovementCells(expected, boardCells[4][3]);
});
