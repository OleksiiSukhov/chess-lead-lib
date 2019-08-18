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

  public move(fromCell: Cell, toCell: Cell): void {
    Guard.validateGameStatus(this);
    Guard.validateChessPieceOnCell(fromCell);
    Guard.validateMovement(this, fromCell, toCell);

    if (!fromCell.chessPiece) {
      return;
    }

    // todo: set new game status
    // todo: define MovedChessPiece
    // todo: pawn promotion

    toCell.chessPiece = fromCell.chessPiece;
    toCell.chessPiece.movedNumber++;
    fromCell.chessPiece = undefined;
  }

  public resign(color: Color): void {
    this.boardState.resign(color);
  }

  public isGameFinished(): boolean {
    return (
      this.boardState.gameStatus === GameStatus.Win ||
      this.boardState.gameStatus === GameStatus.Draw
    );
  }
}
