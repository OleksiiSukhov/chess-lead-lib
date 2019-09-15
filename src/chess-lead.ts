import { BoardBuilder } from "./board/board-builder";
import { ChessPiece } from "./chess-pieces/chess-piece";
import { ChessPieceType } from "./chess-pieces/chess-piece-type";
import { BoardState } from "./models/board-state";
import { Color } from "./models/color";
import { MovedChessPiece } from "./models/moved-chess-piece";
import { Square } from "./models/square";
import { Guard } from "./validators/guard";

export class ChessLead {
  private boardState: BoardState;
  public get chessBoardState(): BoardState {
    return this.boardState;
  }

  constructor(boardState?: BoardState) {
    this.boardState = boardState ? boardState : BoardBuilder.createInitial();
  }

  public getAcceptableMovements(square: Square): Square[] {
    Guard.validateSquare(square);

    if (square.isEmpty || !square.chessPiece || this.chessBoardState.isGameOver()) {
      return [];
    }

    return square.chessPiece.movements().getAvailable(this.chessBoardState, square, true);
  }

  public move(fromSquare: Square, toSquare: Square, newChessPieceType?: ChessPieceType): void {
    Guard.validateGameStatus(this);
    Guard.validateChessPieceOnSquare(fromSquare);
    Guard.validateChessPieceColor(this.boardState, fromSquare);
    Guard.validateMovement(this, fromSquare, toSquare);
    Guard.validatePromotion(fromSquare, toSquare, newChessPieceType);

    if (newChessPieceType) {
      toSquare.chessPiece = BoardBuilder.createChessPiece(newChessPieceType, this.chessBoardState
        .nextTurn as Color);
    } else {
      toSquare.chessPiece = fromSquare.chessPiece as ChessPiece;
      toSquare.chessPiece.movedNumber++;

      this.performCastlingIfNeeded(fromSquare, toSquare, toSquare.chessPiece.chessPieceType);
    }

    fromSquare.chessPiece = undefined;

    this.chessBoardState.setNewGameStatus();

    const movement = new MovedChessPiece(toSquare.chessPiece.id);
    movement.fromSquare = fromSquare;
    movement.toSquare = toSquare;
    this.chessBoardState.movements.push(movement);

    this.chessBoardState.switchNextTurn();
  }

  public resign(color: Color): void {
    this.chessBoardState.resign(color);
  }

  public setDrawByAgreement(): void {
    this.chessBoardState.setDrawByAgreement();
  }

  private performCastlingIfNeeded(
    fromSquare: Square,
    toSquare: Square,
    chessPieceType: ChessPieceType,
  ): void {
    const isCastling =
      chessPieceType === ChessPieceType.King &&
      Math.abs(fromSquare.columnIndex - toSquare.columnIndex) === 2;

    if (!isCastling) {
      return;
    }

    const isLeftCastling = fromSquare.columnIndex > toSquare.columnIndex;
    const fromRookColumn = isLeftCastling ? 0 : 7;
    const toRookColumn = isLeftCastling ? 3 : 5;

    const fromRookSquare = this.boardState.board[fromSquare.rowIndex][fromRookColumn];
    const toRookSquare = this.boardState.board[fromSquare.rowIndex][toRookColumn];

    toRookSquare.chessPiece = fromRookSquare.chessPiece as ChessPiece;
    toRookSquare.chessPiece.movedNumber++;

    fromRookSquare.chessPiece = undefined;
  }
}
