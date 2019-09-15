import { BoardState } from "../../models/board-state";
import { Square } from "../../models/square";
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
    currentSquare: Square,
    checkCheckingNeeded: boolean,
  ): Square[] {
    Guard.validateGetAvailableArguments(boardState.board, currentSquare);

    const availableSquares = this.getAvailableBasedOnDirections(boardState.board, currentSquare);

    if (!checkCheckingNeeded) {
      return availableSquares;
    }

    return this.getAdjustedAvailableSquaresWithCheckChecking(
      availableSquares,
      boardState,
      currentSquare,
    );
  }
}
