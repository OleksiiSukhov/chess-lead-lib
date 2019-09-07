import { BoardState } from "../../models/board-state";
import { Cell } from "../../models/cell";
import { Guard } from "../../validators/guard";
import { Movements } from "./movements";

export class QueenMovements extends Movements {
  constructor() {
    super();

    this.maxMovementSquares = 7;
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
    currentCell: Cell,
    checkCheckingNeeded: boolean,
  ): Cell[] {
    Guard.validateGetAvailableArguments(boardState.board, currentCell);

    const availableCells = this.getAvailableBasedOnDirections(boardState.board, currentCell);

    if (!checkCheckingNeeded) {
      return availableCells;
    }

    return this.getAdjustedAvailableCellsWithCheckChecking(availableCells, boardState, currentCell);
  }
}
