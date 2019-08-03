import { BoardState } from "../../models/board-state";
import { Cell } from "../cell";
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
    if (!this.directions) {
      throw new Error("directions should be defined");
    }

    this.validateGetAvailableArguments(boardState.board, currentCell);

    const availableCells: Cell[] = [];

    for (const direction of this.directions) {
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

    // todo: check "check" for available cells

    return availableCells;
  }
}
