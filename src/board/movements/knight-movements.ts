import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Direction } from "../../models/direction";
import { Guard } from "../../validators/guard";
import { Movements } from "./movements";

export class KnightMovements extends Movements {
  constructor() {
    super();

    this.directions = [
      { row: -1, column: -2 },
      { row: -1, column: 2 },
      { row: 1, column: -2 },
      { row: 1, column: 2 },
      { row: -2, column: -1 },
      { row: -2, column: 1 },
      { row: 2, column: -1 },
      { row: 2, column: 1 },
    ];
  }

  public getAvailable(
    boardState: BoardState,
    currentCell: Cell,
    checkCheckingNeeded: boolean,
  ): Cell[] {
    Guard.validateDirections(this.directions);

    Guard.validateGetAvailableArguments(boardState.board, currentCell);

    const availableCells: Cell[] = [];

    for (const direction of this.directions as Direction[]) {
      const nextCell = new Cell(
        currentCell.rowIndex + direction.row,
        currentCell.columnIndex + direction.column,
      );

      if (!nextCell.isInBoardBoundaries) {
        continue;
      }

      const nextBoardCell = boardState.board[nextCell.rowIndex][nextCell.columnIndex];
      const nextCellChessPiece = nextBoardCell.chessPiece;
      const currentCellChessPiece = currentCell.chessPiece;

      const isCellEmpty = !nextCellChessPiece;
      const isCellWithEnemy =
        nextCellChessPiece &&
        currentCellChessPiece &&
        nextCellChessPiece.color !== currentCellChessPiece.color;

      if (isCellEmpty || isCellWithEnemy) {
        availableCells.push(nextBoardCell);
      }
    }

    if (!checkCheckingNeeded) {
      return availableCells;
    }

    return this.getAdjustedAvailableCellsWithCheckChecking(
      availableCells,
      boardState,
      currentCell,
    );
  }
}
