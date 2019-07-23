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
      if (pawn.color === Color.White) {
        let nextCell = boardCells[2][currentCell.columnIndex];
        if (nextCell.isEmpty) {
          availableCells.push(nextCell);
        }

        nextCell = boardCells[3][currentCell.columnIndex];
        if (nextCell.isEmpty) {
          availableCells.push(nextCell);
        }
      } else {
        let nextCell = boardCells[5][currentCell.columnIndex];
        if (nextCell.isEmpty) {
          availableCells.push(nextCell);
        }

        nextCell = boardCells[4][currentCell.columnIndex];
        if (nextCell.isEmpty) {
          availableCells.push(nextCell);
        }
      }
    }

    return availableCells;
  }

  private isInitialPosition(currentCell: Cell): boolean {
    const pawn = currentCell.chessPiece;

    if (!pawn) {
      throw new Error("Pawn should be defined.");
    }

    const initialPositionRow = pawn.color === Color.White ? 1 : 6;

    return currentCell.rowIndex === initialPositionRow && !pawn.moved;
  }
}
