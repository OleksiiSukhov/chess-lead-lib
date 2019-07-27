import { Pawn } from "../../chess-pieces/pawn";
import { BoardState } from "../../models/board-state";
import { Color } from "../../models/color";
import { Cell } from "../cell";
import { Movements } from "./movements";

export class PawnMovements extends Movements {
  public getAvailable(boardState: BoardState, currentCell: Cell): Cell[] {
    this.validateGetAvailableArguments(boardState.board, currentCell);

    const pawn = currentCell.chessPiece;

    if (!pawn) {
      throw new Error("Pawn should be defined.");
    }

    const availableCells: Cell[] = [];

    if (this.isInitialPosition(currentCell)) {
      this.getAvailableForInitialPosition(boardState.board, currentCell).forEach(cell => {
        availableCells.push(cell);
      });
    } else {
      const enPassantCell = this.getEnPassant(boardState, currentCell);
      if (enPassantCell) {
        availableCells.push(enPassantCell);
      }
    }

    const frontCell = this.getFrontAvailableCell(boardState.board, currentCell);
    if (frontCell && frontCell.isEmpty) {
      availableCells.push(frontCell);
    }

    this.getDiagonalWithEnemy(boardState.board, currentCell).forEach(cell => {
      availableCells.push(cell);
    });

    return availableCells;
  }

  private getEnPassant(boardState: BoardState, currentCell: Cell): Cell | undefined {
    if (!currentCell.chessPiece) {
      return undefined;
    }

    const initialEnPassantRow = currentCell.chessPiece.color === Color.White ? 4 : 3;

    if (currentCell.rowIndex !== initialEnPassantRow) {
      return undefined;
    }

    const neighborColumns = [currentCell.columnIndex - 1, currentCell.columnIndex + 1];

    const neighborCellsOnTheSameRow: Cell[] = neighborColumns.map(
      column => new Cell(initialEnPassantRow, column),
    );

    let enPassantCell: Cell | undefined;

    neighborCellsOnTheSameRow.forEach(cell => {
      if (!currentCell.chessPiece || !cell.isInBoardBoundaries) {
        return;
      }

      const boardCell = boardState.board[cell.rowIndex][cell.columnIndex];
      const boardChessPiece = boardCell.chessPiece;

      if (
        !boardChessPiece ||
        !(boardChessPiece instanceof Pawn) ||
        !boardState.isLastMovementsPerformedBy(boardChessPiece) ||
        boardChessPiece.movedNumber !== 1
      ) {
        return;
      }

      const nextRow = currentCell.chessPiece.color === Color.White ? 5 : 2;

      enPassantCell = boardState.board[nextRow][cell.columnIndex];
    });

    return enPassantCell;
  }

  private getDiagonalWithEnemy(boardCells: Cell[][], currentCell: Cell): Cell[] {
    const pawn: Pawn = currentCell.chessPiece as Pawn;
    const currentRow = currentCell.rowIndex;
    const currentColumn = currentCell.columnIndex;

    const multiplier = pawn.color === Color.White ? 1 : -1;

    const nextAvailableRow = currentRow + 1 * multiplier;
    const nextAvailableColumns = [currentColumn + 1, currentColumn - 1];

    const availableCells: Cell[] = [];

    nextAvailableColumns.forEach(column => {
      const nextCell = new Cell(nextAvailableRow, column);

      if (!nextCell.isInBoardBoundaries) {
        return;
      }

      const nextBoardCell = boardCells[nextCell.rowIndex][nextCell.columnIndex];

      if (nextBoardCell.chessPiece && nextBoardCell.chessPiece.color !== pawn.color) {
        availableCells.push(nextBoardCell);
      }
    });

    return availableCells;
  }

  private getFrontAvailableCell(boardCells: Cell[][], currentCell: Cell): Cell | undefined {
    const pawn: Pawn = currentCell.chessPiece as Pawn;
    const currentRow = currentCell.rowIndex;
    const multiplier = pawn.color === Color.White ? 1 : -1;
    const nextAvailableRow = currentRow + 1 * multiplier;

    return boardCells[nextAvailableRow][currentCell.columnIndex] || undefined;
  }

  private getAvailableForInitialPosition(boardCells: Cell[][], currentCell: Cell): Cell[] {
    const availableCells: Cell[] = [];
    const pawn: Pawn = currentCell.chessPiece as Pawn;

    const initialRow = this.getInitialPositionRow(pawn);
    const multiplier = pawn.color === Color.White ? 1 : -1;
    const nextAvailableRows = [initialRow + 1 * multiplier, initialRow + 2 * multiplier];

    nextAvailableRows.some(row => {
      const nextCell = boardCells[row][currentCell.columnIndex];

      if (!nextCell.isEmpty) {
        return true;
      }

      availableCells.push(nextCell);
    });

    return availableCells;
  }

  private isInitialPosition(currentCell: Cell): boolean {
    const pawn = currentCell.chessPiece;

    if (!pawn) {
      throw new Error("Pawn should be defined.");
    }

    return currentCell.rowIndex === this.getInitialPositionRow(pawn) && !pawn.moved;
  }

  private getInitialPositionRow(pawn: Pawn): number {
    return pawn.color === Color.White ? 1 : 6;
  }
}
