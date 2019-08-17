import { Pawn } from "../chess-pieces/pawn";
import { Color } from "../models/color";
import { BoardState } from "./board-state";
import { Cell } from "./cell";
import { GameStatus } from "./game-status";
import { MovedChessPiece } from "./moved-chess-piece";
import { WinType } from "./win-type";

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

test("resign should correctly set appropriate properties", () => {
  boardState.nextTurn = Color.White;

  const expectedBoardState = {
    ...boardState,
    nextTurn: undefined,
    winSide: Color.Black,
    gameStatus: GameStatus.Win,
    winType: WinType.Resignation,
  };

  boardState.resign(Color.White);

  expect(boardState).toEqual(expectedBoardState);
});

test("resign should throw error when wrong side resigns", () => {
  boardState.nextTurn = Color.Black;

  expect(() => boardState.resign(Color.White)).toThrow(
    "Resignation is not possible while opposite color turn.",
  );
});

test("resign should throw error when game is over - Win", () => {
  boardState.nextTurn = Color.White;
  boardState.gameStatus = GameStatus.Win;

  expect(() => boardState.resign(Color.White)).toThrow(
    "The game is over. Resignation is not possible.",
  );
});

test("resign should throw error when game is over - Draw", () => {
  boardState.nextTurn = Color.White;
  boardState.gameStatus = GameStatus.Draw;

  expect(() => boardState.resign(Color.White)).toThrow(
    "The game is over. Resignation is not possible.",
  );
});
