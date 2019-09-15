import { ChessPiece } from "../../chess-pieces/chess-piece";
import { Pawn } from "../../chess-pieces/pawn";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Square } from "../../models/square";
import { Guard } from "../../validators/guard";
import { Movements } from "./movements";

export class PawnMovements extends Movements {
  public getAvailable(
    boardState: BoardState,
    currentSquare: Square,
    checkCheckingNeeded: boolean,
  ): Square[] {
    Guard.validateGetAvailableArguments(boardState.board, currentSquare);

    const availableSquares: Square[] = [];

    if (this.isInitialPosition(currentSquare)) {
      this.getAvailableForInitialPosition(boardState.board, currentSquare).forEach(square => {
        availableSquares.push(square);
      });
    } else {
      const enPassantSquare = this.getEnPassant(boardState, currentSquare);
      if (enPassantSquare) {
        availableSquares.push(enPassantSquare);
      }
    }

    const frontSquare = this.getFrontAvailableSquare(boardState.board, currentSquare);
    if (frontSquare && frontSquare.isEmpty) {
      availableSquares.push(frontSquare);
    }

    this.getDiagonalWithEnemy(boardState.board, currentSquare).forEach(square => {
      availableSquares.push(square);
    });

    if (!checkCheckingNeeded) {
      return availableSquares;
    }

    return this.getAdjustedAvailableSquaresWithCheckChecking(
      availableSquares,
      boardState,
      currentSquare,
    );
  }

  private getEnPassant(boardState: BoardState, currentSquare: Square): Square | undefined {
    if (!currentSquare.chessPiece) {
      return undefined;
    }

    const initialEnPassantRow = currentSquare.chessPiece.color === Color.White ? 4 : 3;

    if (currentSquare.rowIndex !== initialEnPassantRow) {
      return undefined;
    }

    const neighborColumns = [currentSquare.columnIndex - 1, currentSquare.columnIndex + 1];

    const neighborSquaresOnTheSameRow: Square[] = neighborColumns.map(
      column => new Square(initialEnPassantRow, column),
    );

    let enPassantSquare: Square | undefined;

    neighborSquaresOnTheSameRow.forEach(square => {
      if (!currentSquare.chessPiece || !square.isInBoardBoundaries) {
        return;
      }

      const boardSquare = boardState.board[square.rowIndex][square.columnIndex];
      const boardChessPiece = boardSquare.chessPiece;

      if (
        !boardChessPiece ||
        !(boardChessPiece instanceof Pawn) ||
        !boardState.isLastMovementsPerformedBy(boardChessPiece) ||
        boardChessPiece.movedNumber !== 1
      ) {
        return;
      }

      const nextRow = currentSquare.chessPiece.color === Color.White ? 5 : 2;

      enPassantSquare = boardState.board[nextRow][square.columnIndex];
    });

    return enPassantSquare;
  }

  private getDiagonalWithEnemy(boardSquares: Square[][], currentSquare: Square): Square[] {
    const pawn: Pawn = currentSquare.chessPiece as Pawn;
    const currentRow = currentSquare.rowIndex;
    const currentColumn = currentSquare.columnIndex;

    const multiplier = pawn.color === Color.White ? 1 : -1;

    const nextAvailableRow = currentRow + 1 * multiplier;
    const nextAvailableColumns = [currentColumn + 1, currentColumn - 1];

    const availableSquares: Square[] = [];

    nextAvailableColumns.forEach(column => {
      const nextSquare = new Square(nextAvailableRow, column);

      if (!nextSquare.isInBoardBoundaries) {
        return;
      }

      const nextBoardSquare = boardSquares[nextSquare.rowIndex][nextSquare.columnIndex];

      if (nextBoardSquare.chessPiece && nextBoardSquare.chessPiece.color !== pawn.color) {
        availableSquares.push(nextBoardSquare);
      }
    });

    return availableSquares;
  }

  private getFrontAvailableSquare(
    boardSquares: Square[][],
    currentSquare: Square,
  ): Square | undefined {
    const pawn: Pawn = currentSquare.chessPiece as Pawn;
    const currentRow = currentSquare.rowIndex;
    const multiplier = pawn.color === Color.White ? 1 : -1;
    const nextAvailableRow = currentRow + 1 * multiplier;

    return boardSquares[nextAvailableRow][currentSquare.columnIndex] || undefined;
  }

  private getAvailableForInitialPosition(
    boardSquares: Square[][],
    currentSquare: Square,
  ): Square[] {
    const availableSquares: Square[] = [];
    const pawn: Pawn = currentSquare.chessPiece as Pawn;

    const initialRow = this.getInitialPositionRow(pawn);
    const multiplier = pawn.color === Color.White ? 1 : -1;
    const nextAvailableRows = [initialRow + 1 * multiplier, initialRow + 2 * multiplier];

    nextAvailableRows.some(row => {
      const nextSquare = boardSquares[row][currentSquare.columnIndex];

      if (!nextSquare.isEmpty) {
        return true;
      }

      availableSquares.push(nextSquare);
    });

    return availableSquares;
  }

  private isInitialPosition(currentSquare: Square): boolean {
    Guard.validateChessPiece(currentSquare.chessPiece);
    const pawn = currentSquare.chessPiece as ChessPiece;

    return currentSquare.rowIndex === this.getInitialPositionRow(pawn) && !pawn.moved;
  }

  private getInitialPositionRow(pawn: Pawn): number {
    return pawn.color === Color.White ? 1 : 6;
  }
}
