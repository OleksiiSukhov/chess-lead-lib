import { BoardState } from "../../models/board-state";
import { Direction } from "../../models/direction";
import { Cell } from "../cell";

export abstract class Movements {
  public maxMovementSquares?: number = 0;
  public canLeap: boolean = false;
  public canDoCastling: boolean = false;
  public canDoEnPassant: boolean = false;
  public canDoPromotion: boolean = false;
  public directions?: Direction[] = [];

  public abstract getAvailable(boardState: BoardState, currentCell: Cell): Cell[];

  public validateGetAvailableArguments(boardCells: Cell[][], currentCell: Cell): void {
    if (!boardCells || !currentCell || !currentCell.chessPiece) {
      throw new Error("boardCells, currentCell and chessPiece on it should be defined");
    }
  }

  public getAvailableBasedOnDirections(boardCells: Cell[][], currentCell: Cell): Cell[] {
    if (!this.directions || !this.maxMovementSquares) {
      throw new Error("directions and maxMovementSquares should be defined");
    }

    const availableCells: Cell[] = [];

    for (const direction of this.directions) {
      for (let squaresCount = 0; squaresCount < this.maxMovementSquares; squaresCount++) {
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
        const currentCellChessPiece = currentCell.chessPiece;

        if (nextCellChessPiece && currentCellChessPiece) {
          if (nextCellChessPiece.color !== currentCellChessPiece.color) {
            availableCells.push(nextBoardCell);
          }

          break;
        }

        availableCells.push(nextBoardCell);
      }
    }

    // todo: check "check" for available cells

    return availableCells;
  }

  public getMovementSquaresCount(direction: number, squaresCount: number): number {
    if (direction === 0) {
      return 0;
    }

    return direction + (direction === -1 ? squaresCount * -1 : squaresCount);
  }
}
