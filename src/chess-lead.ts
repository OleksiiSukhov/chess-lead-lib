import { BoardBuilder } from "./board/board-builder";
import { ChessPiece } from "./chess-pieces/chess-piece";
import { ChessPieceType } from "./chess-pieces/chess-piece-type";
import { BoardState } from "./models/board-state";
import { Cell } from "./models/cell";
import { Color } from "./models/color";
import { MovedChessPiece } from "./models/moved-chess-piece";
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

    if (cell.isEmpty || !cell.chessPiece || this.chessBoardState.isGameFinished()) {
      return [];
    }

    return cell.chessPiece.movements().getAvailable(this.chessBoardState, cell, true);
  }

  public move(fromCell: Cell, toCell: Cell, newChessPieceType?: ChessPieceType): void {
    Guard.validateGameStatus(this);
    Guard.validateChessPieceOnCell(fromCell);
    Guard.validateChessPieceColor(this.boardState, fromCell);
    Guard.validateMovement(this, fromCell, toCell);
    Guard.validatePromotion(fromCell, toCell, newChessPieceType);

    if (newChessPieceType) {
      toCell.chessPiece = BoardBuilder.createChessPiece(newChessPieceType, this.chessBoardState
        .nextTurn as Color);
    } else {
      toCell.chessPiece = fromCell.chessPiece as ChessPiece;
      toCell.chessPiece.movedNumber++;

      this.performCastlingIfNeeded(fromCell, toCell, toCell.chessPiece.chessPieceType);
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

  public performCastlingIfNeeded(
    fromCell: Cell,
    toCell: Cell,
    chessPieceType: ChessPieceType,
  ): void {
    const isCastling =
      chessPieceType === ChessPieceType.King &&
      Math.abs(fromCell.columnIndex - toCell.columnIndex) === 2;

    if (!isCastling) {
      return;
    }

    const isLeftCastling = fromCell.columnIndex > toCell.columnIndex;
    const fromRookColumn = isLeftCastling ? 0 : 7;
    const toRookColumn = isLeftCastling ? 3 : 5;

    const fromRookCell = this.boardState.board[fromCell.rowIndex][fromRookColumn];
    const toRookCell = this.boardState.board[fromCell.rowIndex][toRookColumn];

    toRookCell.chessPiece = fromRookCell.chessPiece as ChessPiece;
    toRookCell.chessPiece.movedNumber++;

    fromRookCell.chessPiece = undefined;
  }
}
