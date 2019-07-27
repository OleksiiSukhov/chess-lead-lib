import { Cell } from "../board/cell";
import { Pawn } from "../chess-pieces/pawn";
import { Color } from "../models/color";
import { BoardState } from "./board-state";
import { MovedChessPiece } from "./moved-chess-piece";

let boardState: BoardState;
let blackPawn: Pawn;
let whitePawn: Pawn;
let blackPawnMovements: MovedChessPiece;
let whitePawnMovements: MovedChessPiece;

beforeEach(() => {
  boardState = new BoardState();

  blackPawn = new Pawn(Color.Black);
  whitePawn = new Pawn(Color.White);

  blackPawnMovements = new MovedChessPiece(blackPawn.id);
  blackPawnMovements.fromCell = new Cell(6, 4);
  blackPawnMovements.fromCell = new Cell(4, 4);

  whitePawnMovements = new MovedChessPiece(whitePawn.id);
  whitePawnMovements.fromCell = new Cell(3, 3);
  whitePawnMovements.fromCell = new Cell(4, 3);
});

test("isLastMovementsPerformedBy should return true", () => {
  boardState.movements = [whitePawnMovements, blackPawnMovements];

  expect(boardState.isLastMovementsPerformedBy(blackPawn)).toBeTruthy();
});

test("isLastMovementsPerformedBy should return false", () => {
  boardState.movements = [blackPawnMovements, whitePawnMovements];

  expect(boardState.isLastMovementsPerformedBy(blackPawn)).toBeFalsy();
});

test("isLastMovementsPerformedBy should return false when there are no any movements", () => {
  boardState.movements = [];

  expect(boardState.isLastMovementsPerformedBy(blackPawn)).toBeFalsy();
});
