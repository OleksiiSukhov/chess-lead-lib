import { BoardBuilder } from "./board/board-builder";
import { ChessPiece } from "./chess-pieces/chess-piece";
import { BoardState } from "./models/board-state";
import { Cell } from "./models/cell";
import { Color } from "./models/color";
import { MovedChessPiece } from "./models/moved-chess-piece";
import { Guard } from "./validators/guard";
import { ChessType } from "./chess-pieces/chess-type";

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

    if (cell.isEmpty || !cell.chessPiece || this.chessBoardState.isGameFinished()) {
      return [];
    }

    return cell.chessPiece.movements().getAvailable(this.chessBoardState, cell, true);
  }

  public move(fromCell: Cell, toCell: Cell, newChessType?: ChessType): void {
    Guard.validateGameStatus(this);
    Guard.validateChessPieceOnCell(fromCell);
    Guard.validateChessPieceColor(this.boardState, fromCell);
    Guard.validateMovement(this, fromCell, toCell);
    Guard.validatePromotion(fromCell, toCell, newChessType);

    // todo: implement castling (move rook in addition)

    if (newChessType) {
      toCell.chessPiece = BoardBuilder.createChessPiece(newChessType, this.chessBoardState
        .nextTurn as Color);
    } else {
      toCell.chessPiece = fromCell.chessPiece as ChessPiece;
      toCell.chessPiece.movedNumber++;
    }

    fromCell.chessPiece = undefined;

    this.chessBoardState.setNewGameStatus();

    const movement = new MovedChessPiece(toCell.chessPiece.id);
    movement.fromCell = fromCell;
    movement.toCell = toCell;
    this.chessBoardState.movements.push(movement);

    this.chessBoardState.switchNextTurn();
  }

  public resign(color: Color): void {
    this.chessBoardState.resign(color);
  }

  public setDrawByAgreement(): void {
    this.chessBoardState.setDrawByAgreement();
  }
}
