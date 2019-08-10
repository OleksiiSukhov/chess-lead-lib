/* tslint:disable:no-string-literal */

import { ChessLead } from ".";
import { BoardBuilder } from "./board/board-builder";
import { BoardState } from "./models/board-state";
import { Cell } from "./models/cell";
import { GameStatus } from "./models/game-status";
import { WinType } from "./models/win-type";
import { BoardStateValidator } from "./validators/board-state-validator";
import { GetAcceptableMovementsInputValidator } from "./validators/get-acceptable-movements-input-validator";

test("constructor should call BoardStateValidator.validate when boardState was passed", () => {
  const validateMock = jest.fn();
  BoardStateValidator.validate = validateMock.bind(BoardStateValidator);

  const initialBoardState = new BoardState();
  initialBoardState.winType = WinType.Checkmate;

  const chessLead = new ChessLead(initialBoardState);

  expect(validateMock).toHaveBeenCalledWith(initialBoardState);
});

test("constructor should call BoardBuilder.createInitial when boardState was not passed", () => {
  const validateMock = jest.fn();
  BoardStateValidator.validate = validateMock.bind(BoardStateValidator);

  const createInitialMock = jest.fn();
  BoardBuilder.createInitial = createInitialMock.bind(BoardBuilder);

  const chessLead = new ChessLead();

  expect(validateMock).not.toHaveBeenCalled();
  expect(createInitialMock).toHaveBeenCalled();
});

test("chessBoardState should return correct board state object", () => {
  const chessLead = new ChessLead();
  const testBoardState = new BoardState();
  testBoardState.gameStatus = GameStatus.Win;

  chessLead["boardState"] = testBoardState;

  expect(chessLead.chessBoardState).toBe(testBoardState);
});

test("getAcceptableMovements should call GetAcceptableMovementsInputValidator.validate", () => {
  const validateMock = jest.fn();
  GetAcceptableMovementsInputValidator.validate = validateMock.bind(
    GetAcceptableMovementsInputValidator,
  );

  const chessLead = new ChessLead();
  const cell = new Cell(0, 0);

  chessLead.getAcceptableMovements(cell);

  expect(validateMock).toHaveBeenCalledWith(cell);
});

test("getAcceptableMovements should return empty array when cell is empty", () => {
  const chessLead = new ChessLead(new BoardState());
  const cell = new Cell(0, 0);

  expect(chessLead.getAcceptableMovements(cell)).toStrictEqual([]);
});

test("getAcceptableMovements should return empty array when game is finished", () => {
  const finishedGameStatuses = [GameStatus.Win, GameStatus.Draw];
  const boardState = new BoardState();
  const cell = new Cell(4, 2);

  finishedGameStatuses.forEach(status => {
    boardState.gameStatus = status;
    const chessLead = new ChessLead(boardState);

    expect(chessLead.getAcceptableMovements(cell)).toStrictEqual([]);
  });
});
