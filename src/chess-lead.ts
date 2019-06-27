import { BoardBuilder } from "./board/board-builder";
import { BoardState } from "./models/board-state";
import { BoardStateValidator } from "./validators/board-state-validator";

export class ChessLead {
  private boardState: BoardState;
  public get chessBoardState(): BoardState {
    return this.boardState;
  }

  constructor(boardState?: BoardState) {
    if (boardState !== undefined) {
      BoardStateValidator.validate(boardState);
      this.boardState = boardState;
    } else {
      this.boardState = BoardBuilder.createInitial();
    }
  }
}
