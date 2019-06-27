/* tslint:disable:no-string-literal */

import { ChessLead } from ".";
import { BoardBuilder } from "./board/board-builder";
import { BoardState } from "./models/board-state";
import { GameStatus } from "./models/game-status";
import { WinType } from "./models/win-type";
import { BoardStateValidator } from "./validators/board-state-validator";

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
  testBoardState.gameStatus = GameStatus.WhiteWin;

  chessLead["boardState"] = testBoardState

  expect(chessLead.chessBoardState).toBe(testBoardState);
});
