import { BoardBuilder } from "./board/board-builder";
import { BoardState } from "./models/board-state";
import { Cell } from "./models/cell";
import { Color } from "./models/color";
import { GameStatus } from "./models/game-status";
import { Guard } from "./validators/guard";
import { ChessPiece } from "./chess-pieces/chess-piece";

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
    Guard.validateChessPieceColor(this.boardState, fromCell);
    Guard.validateMovement(this, fromCell, toCell);

    // todo: set new game status
    // todo: define MovedChessPiece
    // todo: pawn promotion
    // todo: implement castling (move rook in addition)
    // todo: switch turn color (if possible based on new game status)

    toCell.chessPiece = fromCell.chessPiece as ChessPiece;
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
