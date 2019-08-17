import { BoardBuilder } from "./board/board-builder";
import { BoardState } from "./models/board-state";
import { Cell } from "./models/cell";
import { Color } from "./models/color";
import { GameStatus } from "./models/game-status";
import { Guard } from "./validators/guard";

export class ChessLead {
  private boardState: BoardState;
  public get chessBoardState(): BoardState {
    return this.boardState;
  }

  constructor(boardState?: BoardState) {
    this.boardState = boardState ? boardState : BoardBuilder.createInitial();
  }

  public getAcceptableMovements(cell: Cell): Cell[] {
    Guard.validateCell(cell);

    if (cell.isEmpty || !cell.chessPiece || this.isGameFinished()) {
      return [];
    }

    return cell.chessPiece.movements().getAvailable(this.boardState, cell, true);
  }

  public move(): void {
    // todo: validate acceptable movements
    // todo: check game status
    // todo: set new game status
    // todo: define MovedChessPiece
    // todo: pawn promotion
    // todo: increment movedNumber for chess piece
  }

  public resign(color: Color): void {
    this.boardState.resign(color);
  }

  private isGameFinished(): boolean {
    return (
      this.boardState.gameStatus === GameStatus.Win ||
      this.boardState.gameStatus === GameStatus.Draw
    );
  }
}
