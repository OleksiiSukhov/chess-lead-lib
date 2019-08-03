import { BoardState } from "../../models/board-state";
import { Cell } from "../cell";
import { Movements } from "./movements";

export class RookMovements extends Movements {
  constructor() {
    super();

    this.maxMovementSquares = 7;
    this.directions = [
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
    this.validateGetAvailableArguments(boardState.board, currentCell);

    const availableSquares = this.getAvailableBasedOnDirections(boardState.board, currentCell);

    if (!checkCheckingNeeded) {
      return availableSquares;
    }

    return this.getAdjustedAvailableCellsWithCheckChecking(
      availableSquares,
      boardState,
      currentCell,
    );
  }
}
