import { ChessPiece } from "../../chess-pieces/chess-piece";
import { ChessPieceType } from "../../chess-pieces/chess-piece-type";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Square } from "../../models/square";
import { Utils } from "../../utils/utils";
import { Guard } from "../../validators/guard";
import { Movements } from "./movements";

export class KingMovements extends Movements {
  private readonly initialColumn: number = 4;

  constructor() {
    super();

    this.maxMovementSquares = 1;
    this.directions = [
      { row: -1, column: -1 },
      { row: -1, column: 1 },
      { row: 1, column: -1 },
      { row: 1, column: 1 },
      { row: 0, column: -1 },
      { row: 0, column: 1 },
      { row: -1, column: 0 },
      { row: 1, column: 0 },
    ];
  }

  public getAvailable(
    boardState: BoardState,
    currentSquare: Square,
    checkCheckingNeeded: boolean,
  ): Square[] {
    Guard.validateGetAvailableArguments(boardState.board, currentSquare);

    const availableSquares = this.getAvailableBasedOnDirections(boardState.board, currentSquare);

    if (!checkCheckingNeeded) {
      return availableSquares;
    }

    const castlingAvailableSquares = this.getCastlingAcceptableSquares(boardState, currentSquare);

    castlingAvailableSquares.forEach(castlingSquare => availableSquares.push(castlingSquare));

    return this.getAdjustedAvailableSquaresWithCheckChecking(
      availableSquares,
      boardState,
      currentSquare,
    );
  }

  private getCastlingAcceptableSquares(boardState: BoardState, currentSquare: Square): Square[] {
    Guard.validateChessPiece(currentSquare.chessPiece);

    const acceptableSquares: Square[] = [];
    const currentChessPiece = currentSquare.chessPiece as ChessPiece;

    if (currentChessPiece.moved) {
      return acceptableSquares;
    }

    if (this.isSquareInCheck(boardState, currentSquare, currentChessPiece.color)) {
      return acceptableSquares;
    }

    [0, 7].forEach(rookInitialColumn => {
      const castlingSquare = this.getCastlingSquare(
        boardState,
        rookInitialColumn,
        currentSquare.chessPiece as ChessPiece,
      );

      if (castlingSquare) {
        acceptableSquares.push(castlingSquare);
      }
    });

    return acceptableSquares;
  }

  private getCastlingSquare(
    boardState: BoardState,
    rookInitialColumn: number,
    chessPiece: ChessPiece,
  ): Square | undefined {
    const initialKingRow = this.getInitialRow(chessPiece.color);
    const rook = boardState.board[initialKingRow][rookInitialColumn].chessPiece;

    if (!rook || rook.chessPieceType !== ChessPieceType.Rook) {
      return undefined;
    }

    if (rook.moved) {
      return undefined;
    }

    if (
      !this.squaresBetweenRookAndKingAreEmpty(boardState.board, rookInitialColumn, initialKingRow)
    ) {
      return undefined;
    }

    const isLeftCastling = rookInitialColumn === 0;

    if (!this.areKingSquaresNotInCheckWhileCastling(boardState, isLeftCastling, chessPiece.color)) {
      return undefined;
    }

    return boardState.board[initialKingRow][this.getNewKingColumn(isLeftCastling)];
  }

  private squaresBetweenRookAndKingAreEmpty(
    board: Square[][],
    rookStartColumn: number,
    initialKingRow: number,
  ): boolean {
    const isLeftCastling = rookStartColumn === 0;

    const start: number = isLeftCastling ? rookStartColumn : this.initialColumn;
    const stop: number = isLeftCastling ? this.initialColumn : rookStartColumn;

    for (let column = start + 1; column < stop; column++) {
      if (board[initialKingRow][column].chessPiece) {
        return false;
      }
    }

    return true;
  }

  private areKingSquaresNotInCheckWhileCastling(
    boardState: BoardState,
    isLeftCastling: boolean,
    color: Color,
  ): boolean {
    const newKingColumn = this.getNewKingColumn(isLeftCastling);
    const initialRow = this.getInitialRow(color);

    const start = isLeftCastling ? newKingColumn : this.initialColumn;
    const stop = isLeftCastling ? this.initialColumn : newKingColumn;

    for (let column = start; column < stop; column++) {
      if (this.isSquareInCheck(boardState, boardState.board[initialRow][column], color)) {
        return false;
      }
    }

    return true;
  }

  private getNewKingColumn(isLeftCastling: boolean) {
    return isLeftCastling ? 2 : 6;
  }

  private isSquareInCheck(boardState: BoardState, kingSquare: Square, color: Color): boolean {
    return this.getAllEnemiesAvailableSquares(boardState, color).some(enemyAvailableSquare =>
      Utils.squaresOnSamePosition(enemyAvailableSquare, kingSquare),
    );
  }

  private getAllEnemiesAvailableSquares(boardState: BoardState, color: Color): Square[] {
    const squares: Square[] = [];

    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const square = boardState.board[row][column];
        const chessPiece = square.chessPiece;

        if (!chessPiece || chessPiece.color === color) {
          continue;
        }

        chessPiece
          .movements()
          .getAvailable(boardState, square, false)
          .forEach(availableSquare => {
            if (
              !squares.find(currentSquare =>
                Utils.squaresOnSamePosition(currentSquare, availableSquare),
              )
            ) {
              squares.push(availableSquare);
            }
          });
      }
    }

    return squares;
  }

  private getInitialRow(color: Color): number {
    return color === Color.White ? 0 : 7;
  }
}
