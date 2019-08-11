import { Bishop } from "../../chess-pieces/bishop";
import { King } from "../../chess-pieces/king";
import { Knight } from "../../chess-pieces/knight";
import { Pawn } from "../../chess-pieces/pawn";
import { Queen } from "../../chess-pieces/queen";
import { Rook } from "../../chess-pieces/rook";
import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Color } from "../../models/color";
import { BoardBuilder } from "../board-builder";
import { KingMovements } from "./king-movements";
import { TestAssistance } from "./test-assistance";

let boardCells: Cell[][];
const boardState: BoardState = new BoardState();
let testAssistance: TestAssistance;

beforeEach(() => {
  boardCells = BoardBuilder.setupEmptyBoard();
  boardState.board = boardCells;
  testAssistance = new TestAssistance(boardState, new KingMovements());
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
  boardCells[3][3].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);

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

  testAssistance.assertAvailableMovementCells(expected, boardCells[3][3]);
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

  boardCells[0][0].chessPiece = king;
  boardCells[7][4].chessPiece = new King(Color.Black);

  const expected: Cell[] = [boardCells[1][0], boardCells[1][1], boardCells[0][1]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][0]);
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
  boardCells[0][0].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[0][4].chessPiece = new Rook(Color.Black);

  const expected: Cell[] = [boardCells[1][0], boardCells[1][1]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][0]);
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

  boardCells[0][0].chessPiece = king;
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[1][0].chessPiece = new Queen(Color.Black);

  const expected: Cell[] = [boardCells[1][0]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][0]);
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
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[1][1].chessPiece = new Rook(Color.Black);
  boardCells[0][0].chessPiece = new Rook(Color.Black);
  boardCells[1][4].chessPiece = new Pawn(Color.White);

  const expected: Cell[] = [boardCells[1][5]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
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
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[1][1].chessPiece = new Rook(Color.Black);
  boardCells[0][0].chessPiece = new Rook(Color.Black);

  const expected: Cell[] = [];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
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
  boardCells[2][4].chessPiece = new King(Color.White);
  boardCells[4][4].chessPiece = new King(Color.Black);

  const expected: Cell[] = [
    boardCells[2][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[2][5],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[2][4]);
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
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[0][7].chessPiece = new Rook(Color.White);
  boardCells[0][0].chessPiece = new Rook(Color.White);

  const expected: Cell[] = [
    boardCells[0][2],
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
    boardCells[0][6],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
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
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][7].chessPiece = new Rook(Color.Black);
  boardCells[7][0].chessPiece = new Rook(Color.Black);

  const expected: Cell[] = [
    boardCells[7][2],
    boardCells[7][3],
    boardCells[6][3],
    boardCells[6][4],
    boardCells[6][5],
    boardCells[7][5],
    boardCells[7][6],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[7][4]);
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
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[4][3].chessPiece = new Bishop(Color.Black);
  boardCells[4][4].chessPiece = new Bishop(Color.Black);
  boardCells[0][7].chessPiece = new Rook(Color.White);
  boardCells[0][0].chessPiece = new Rook(Color.White);

  const expected: Cell[] = [
    boardCells[0][2],
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
    boardCells[0][6],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
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
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[3][3].chessPiece = new Bishop(Color.White);
  boardCells[3][4].chessPiece = new Bishop(Color.White);
  boardCells[7][7].chessPiece = new Rook(Color.Black);
  boardCells[7][0].chessPiece = new Rook(Color.Black);

  const expected: Cell[] = [
    boardCells[7][2],
    boardCells[7][3],
    boardCells[6][3],
    boardCells[6][4],
    boardCells[6][5],
    boardCells[7][5],
    boardCells[7][6],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[7][4]);
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
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[4][5].chessPiece = new Bishop(Color.Black);
  boardCells[0][7].chessPiece = new Rook(Color.White);
  boardCells[0][0].chessPiece = new Rook(Color.White);

  const expected: Cell[] = [
    boardCells[0][2],
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
    boardCells[0][6],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
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
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[3][5].chessPiece = new Bishop(Color.White);
  boardCells[7][7].chessPiece = new Rook(Color.Black);
  boardCells[7][0].chessPiece = new Rook(Color.Black);

  const expected: Cell[] = [
    boardCells[7][2],
    boardCells[7][3],
    boardCells[6][3],
    boardCells[6][4],
    boardCells[6][5],
    boardCells[7][5],
    boardCells[7][6],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[7][4]);
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
// 0 |WR |   |   | + |WKI| + |   |WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - not available - king moved", () => {
  const king = new King(Color.White);
  king.movedNumber = 2;

  boardCells[0][4].chessPiece = king;
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[0][7].chessPiece = new Rook(Color.White);
  boardCells[0][0].chessPiece = new Rook(Color.White);

  const expected: Cell[] = [
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
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
// 0 |WR |   |   | + |WKI| + | + |WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - not available - left rook moved", () => {
  const leftRook = new Rook(Color.White);
  leftRook.movedNumber = 2;

  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[0][7].chessPiece = new Rook(Color.White);
  boardCells[0][0].chessPiece = leftRook;

  const expected: Cell[] = [
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
    boardCells[0][6],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
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
// 0 |WR |   | + | + |WKI| + |   |WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - not available - right rook moved", () => {
  const rightRook = new Rook(Color.White);
  rightRook.movedNumber = 2;

  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[0][7].chessPiece = rightRook;
  boardCells[0][0].chessPiece = new Rook(Color.White);

  const expected: Cell[] = [
    boardCells[0][2],
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
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
// 0 |WR |WKN|   | + |WKI| + |WKN|WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - not available - cells occupied", () => {
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[0][7].chessPiece = new Rook(Color.White);
  boardCells[0][0].chessPiece = new Rook(Color.White);
  boardCells[0][6].chessPiece = new Knight(Color.White);
  boardCells[0][1].chessPiece = new Knight(Color.White);

  const expected: Cell[] = [
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |   |BR |   |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   | + |   | + |   |   |
//   _________________________________
// 0 |WR |   |   | + |WKI| + |   |WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - not available - king is in check", () => {
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[5][4].chessPiece = new Rook(Color.Black);
  boardCells[0][7].chessPiece = new Rook(Color.White);
  boardCells[0][0].chessPiece = new Rook(Color.White);

  const expected: Cell[] = [boardCells[0][3], boardCells[1][3], boardCells[1][5], boardCells[0][5]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |   |BR |   |BR |   |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   |   | + |   |   |   |
//   _________________________________
// 0 |WR |   |   |   |WKI|   |   |WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - not available - check is on the way", () => {
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[5][3].chessPiece = new Rook(Color.Black);
  boardCells[5][5].chessPiece = new Rook(Color.Black);
  boardCells[0][7].chessPiece = new Rook(Color.White);
  boardCells[0][0].chessPiece = new Rook(Color.White);

  const expected: Cell[] = [boardCells[1][4]];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
});

//   _________________________________
// 7 |   |   |   |   |BKI|   |   |   |
//   _________________________________
// 6 |   |   |   |   |   |   |   |   |
//   _________________________________
// 5 |   |   |BR |   |   |   |BR |   |
//   _________________________________
// 4 |   |   |   |   |   |   |   |   |
//   _________________________________
// 3 |   |   |   |   |   |   |   |   |
//   _________________________________
// 2 |   |   |   |   |   |   |   |   |
//   _________________________________
// 1 |   |   |   | + | + | + |   |   |
//   _________________________________
// 0 |WR |   |   | + |WKI| + |   |WR |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getAvailable for castling - not available - king is in check at the end of movement", () => {
  boardCells[0][4].chessPiece = new King(Color.White);
  boardCells[7][4].chessPiece = new King(Color.Black);
  boardCells[5][2].chessPiece = new Rook(Color.Black);
  boardCells[5][6].chessPiece = new Rook(Color.Black);
  boardCells[0][7].chessPiece = new Rook(Color.White);
  boardCells[0][0].chessPiece = new Rook(Color.White);

  const expected: Cell[] = [
    boardCells[0][3],
    boardCells[1][3],
    boardCells[1][4],
    boardCells[1][5],
    boardCells[0][5],
  ];

  testAssistance.assertAvailableMovementCells(expected, boardCells[0][4]);
});
