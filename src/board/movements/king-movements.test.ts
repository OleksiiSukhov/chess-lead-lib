import { Bishop } from "../../chess-pieces/bishop";
import { King } from "../../chess-pieces/king";
import { Knight } from "../../chess-pieces/knight";
import { Pawn } from "../../chess-pieces/pawn";
import { Queen } from "../../chess-pieces/queen";
import { Rook } from "../../chess-pieces/rook";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Square } from "../../models/square";
import { BoardBuilder } from "../board-builder";
import { KingMovements } from "./king-movements";
import { TestAssistance } from "./test-assistance";

let boardSquares: Square[][];
const boardState: BoardState = new BoardState();
let testAssistance: TestAssistance;

beforeEach(() => {
  boardSquares = BoardBuilder.setupEmptyBoard();
  boardState.board = boardSquares;
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
test("getAvailable should return correct squares for empty board", () => {
  boardSquares[3][3].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);

  const expected: Square[] = [
    boardSquares[4][2],
    boardSquares[4][3],
    boardSquares[4][4],
    boardSquares[3][2],
    boardSquares[3][4],
    boardSquares[2][2],
    boardSquares[2][3],
    boardSquares[2][4],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[3][3]);
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
test("getAvailable should return correct squares from angle of the board", () => {
  const king = new King(Color.White);
  king.movedNumber = 10;

  boardSquares[0][0].chessPiece = king;
  boardSquares[7][4].chessPiece = new King(Color.Black);

  const expected: Square[] = [boardSquares[1][0], boardSquares[1][1], boardSquares[0][1]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][0]);
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
test("getAvailable should return correct squares check - hide from enemy on available squares", () => {
  boardSquares[0][0].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[0][4].chessPiece = new Rook(Color.Black);

  const expected: Square[] = [boardSquares[1][0], boardSquares[1][1]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][0]);
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
test("getAvailable should return correct squares check - capture only", () => {
  const king = new King(Color.White);
  king.movedNumber = 10;

  boardSquares[0][0].chessPiece = king;
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[1][0].chessPiece = new Queen(Color.Black);

  const expected: Square[] = [boardSquares[1][0]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][0]);
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
test("getAvailable should return correct squares check - hide from enemy behind ally", () => {
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[1][1].chessPiece = new Rook(Color.Black);
  boardSquares[0][0].chessPiece = new Rook(Color.Black);
  boardSquares[1][4].chessPiece = new Pawn(Color.White);

  const expected: Square[] = [boardSquares[1][5]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[1][1].chessPiece = new Rook(Color.Black);
  boardSquares[0][0].chessPiece = new Rook(Color.Black);

  const expected: Square[] = [];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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
test("getAvailable should return correct squares check - no next to enemy king squares", () => {
  boardSquares[2][4].chessPiece = new King(Color.White);
  boardSquares[4][4].chessPiece = new King(Color.Black);

  const expected: Square[] = [
    boardSquares[2][3],
    boardSquares[1][3],
    boardSquares[1][4],
    boardSquares[1][5],
    boardSquares[2][5],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[2][4]);
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
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[0][7].chessPiece = new Rook(Color.White);
  boardSquares[0][0].chessPiece = new Rook(Color.White);

  const expected: Square[] = [
    boardSquares[0][2],
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[1][4],
    boardSquares[1][5],
    boardSquares[0][5],
    boardSquares[0][6],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][7].chessPiece = new Rook(Color.Black);
  boardSquares[7][0].chessPiece = new Rook(Color.Black);

  const expected: Square[] = [
    boardSquares[7][2],
    boardSquares[7][3],
    boardSquares[6][3],
    boardSquares[6][4],
    boardSquares[6][5],
    boardSquares[7][5],
    boardSquares[7][6],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[7][4]);
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
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[4][3].chessPiece = new Bishop(Color.Black);
  boardSquares[4][4].chessPiece = new Bishop(Color.Black);
  boardSquares[0][7].chessPiece = new Rook(Color.White);
  boardSquares[0][0].chessPiece = new Rook(Color.White);

  const expected: Square[] = [
    boardSquares[0][2],
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[1][4],
    boardSquares[1][5],
    boardSquares[0][5],
    boardSquares[0][6],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[3][3].chessPiece = new Bishop(Color.White);
  boardSquares[3][4].chessPiece = new Bishop(Color.White);
  boardSquares[7][7].chessPiece = new Rook(Color.Black);
  boardSquares[7][0].chessPiece = new Rook(Color.Black);

  const expected: Square[] = [
    boardSquares[7][2],
    boardSquares[7][3],
    boardSquares[6][3],
    boardSquares[6][4],
    boardSquares[6][5],
    boardSquares[7][5],
    boardSquares[7][6],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[7][4]);
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
test("getAvailable for castling - available - rook crosses square that is under attack - white", () => {
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[4][5].chessPiece = new Bishop(Color.Black);
  boardSquares[0][7].chessPiece = new Rook(Color.White);
  boardSquares[0][0].chessPiece = new Rook(Color.White);

  const expected: Square[] = [
    boardSquares[0][2],
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[1][4],
    boardSquares[1][5],
    boardSquares[0][5],
    boardSquares[0][6],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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
test("getAvailable for castling - available - rook crosses square that is under attack - black", () => {
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[3][5].chessPiece = new Bishop(Color.White);
  boardSquares[7][7].chessPiece = new Rook(Color.Black);
  boardSquares[7][0].chessPiece = new Rook(Color.Black);

  const expected: Square[] = [
    boardSquares[7][2],
    boardSquares[7][3],
    boardSquares[6][3],
    boardSquares[6][4],
    boardSquares[6][5],
    boardSquares[7][5],
    boardSquares[7][6],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[7][4]);
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

  boardSquares[0][4].chessPiece = king;
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[0][7].chessPiece = new Rook(Color.White);
  boardSquares[0][0].chessPiece = new Rook(Color.White);

  const expected: Square[] = [
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[1][4],
    boardSquares[1][5],
    boardSquares[0][5],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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

  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[0][7].chessPiece = new Rook(Color.White);
  boardSquares[0][0].chessPiece = leftRook;

  const expected: Square[] = [
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[1][4],
    boardSquares[1][5],
    boardSquares[0][5],
    boardSquares[0][6],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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

  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[0][7].chessPiece = rightRook;
  boardSquares[0][0].chessPiece = new Rook(Color.White);

  const expected: Square[] = [
    boardSquares[0][2],
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[1][4],
    boardSquares[1][5],
    boardSquares[0][5],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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
test("getAvailable for castling - not available - squares occupied", () => {
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[0][7].chessPiece = new Rook(Color.White);
  boardSquares[0][0].chessPiece = new Rook(Color.White);
  boardSquares[0][6].chessPiece = new Knight(Color.White);
  boardSquares[0][1].chessPiece = new Knight(Color.White);

  const expected: Square[] = [
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[1][4],
    boardSquares[1][5],
    boardSquares[0][5],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[5][4].chessPiece = new Rook(Color.Black);
  boardSquares[0][7].chessPiece = new Rook(Color.White);
  boardSquares[0][0].chessPiece = new Rook(Color.White);

  const expected: Square[] = [
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[1][5],
    boardSquares[0][5],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[5][3].chessPiece = new Rook(Color.Black);
  boardSquares[5][5].chessPiece = new Rook(Color.Black);
  boardSquares[0][7].chessPiece = new Rook(Color.White);
  boardSquares[0][0].chessPiece = new Rook(Color.White);

  const expected: Square[] = [boardSquares[1][4]];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
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
  boardSquares[0][4].chessPiece = new King(Color.White);
  boardSquares[7][4].chessPiece = new King(Color.Black);
  boardSquares[5][2].chessPiece = new Rook(Color.Black);
  boardSquares[5][6].chessPiece = new Rook(Color.Black);
  boardSquares[0][7].chessPiece = new Rook(Color.White);
  boardSquares[0][0].chessPiece = new Rook(Color.White);

  const expected: Square[] = [
    boardSquares[0][3],
    boardSquares[1][3],
    boardSquares[1][4],
    boardSquares[1][5],
    boardSquares[0][5],
  ];

  testAssistance.assertAvailableMovementSquares(expected, boardSquares[0][4]);
});
