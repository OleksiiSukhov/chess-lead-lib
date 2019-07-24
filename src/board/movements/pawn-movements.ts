import { Pawn } from "../../chess-pieces/pawn";
import { Color } from "../../models/color";
import { Cell } from "../cell";
import { Movements } from "./movements";

export class PawnMovements extends Movements {
  public getAvailable(boardCells: Cell[][], currentCell: Cell): Cell[] {
    this.validateGetAvailableArguments(boardCells, currentCell);

    const pawn = currentCell.chessPiece;

    if (!pawn) {
      throw new Error("Pawn should be defined.");
    }

    const availableCells: Cell[] = [];

    if (this.isInitialPosition(currentCell)) {
      this.getAvailableForInitialPosition(boardCells, currentCell).forEach(cell => {
        availableCells.push(cell);
      });
    }

    return availableCells;
  }

  private getAvailableForInitialPosition(boardCells: Cell[][], currentCell: Cell): Cell[] {
    const availableCells: Cell[] = [];
    const pawn: Pawn = currentCell.chessPiece as Pawn;

    const initialRow = this.getInitialPosition(pawn);
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

    return currentCell.rowIndex === this.getInitialPosition(pawn) && !pawn.moved;
  }

  private getInitialPosition(pawn: Pawn): number {
    return pawn.color === Color.White ? 1 : 6;
  }
}
