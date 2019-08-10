import { BoardBuilder } from "./board/board-builder";
import { BoardState } from "./models/board-state";
import { Cell } from "./models/cell";
import { GameStatus } from "./models/game-status";
import { BoardStateValidator } from "./validators/board-state-validator";
import { GetAcceptableMovementsInputValidator } from "./validators/get-acceptable-movements-input-validator";

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

  public getAcceptableMovements(cell: Cell): Cell[] {
    GetAcceptableMovementsInputValidator.validate(cell);

    if (
      cell.isEmpty ||
      !cell.chessPiece ||
      this.boardState.gameStatus === GameStatus.Win ||
      this.boardState.gameStatus === GameStatus.Draw
    ) {
      return [];
    }

    return cell.chessPiece.movements().getAvailable(this.boardState, cell, true);
  }

  public move(): void {
    // todo: define MovedChessPiece
    // todo: pawn promotion
    // todo: increment movedNumber for chess piece
  }
}
