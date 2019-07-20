import { Cell } from "../cell";
import { Movements } from "./movements";

export class BishopMovements extends Movements {
  constructor() {
    super();

    this.maxMovementSquares = 7;
    this.directions = [
      { row: -1, column: -1 },
      { row: -1, column: 1 },
      { row: 1, column: -1 },
      { row: 1, column: 1 },
    ];
  }

  public getAvailable(boardCells: Cell[][], currentCell: Cell): Cell[] {
    if (!boardCells || !currentCell) {
      throw new Error("boardCells and currentCell should be defined");
    }

    const availableCells: Cell[] = [];

    for (const direction of this.directions) {
      for (let squaresCount = 0; squaresCount <= this.maxMovementSquares; squaresCount++) {
        const nextCell = new Cell(
          currentCell.rowIndex + this.getMovementSquaresCount(direction.row, squaresCount),
          currentCell.columnIndex + this.getMovementSquaresCount(direction.column, squaresCount),
        );

        if (!nextCell.isInBoardBoundaries) {
          break;
        }

        if (nextCell.isSamePositionAs(currentCell)) {
          continue;
        }

        const nextBoardCell = boardCells[nextCell.rowIndex][nextCell.columnIndex];
        const nextCellChessPiece = nextBoardCell.chessPiece;
        const currentCellChessPiece =
          boardCells[nextCell.rowIndex][nextCell.columnIndex].chessPiece;

        if (
          nextCellChessPiece &&
          currentCellChessPiece &&
          nextCellChessPiece.color === currentCellChessPiece.color
        ) {
          availableCells.push(nextBoardCell);
          break;
        }

        availableCells.push(nextBoardCell);
      }
    }

    // todo: check "check" for available cells
    // todo: check same color chess pieces

    return availableCells;
  }

  private getMovementSquaresCount(direction: number, squaresCount: number): number {
    if (direction === 0) {
      return 0;
    }

    return direction + (direction === -1 ? squaresCount * -1 : squaresCount);
  }
}
