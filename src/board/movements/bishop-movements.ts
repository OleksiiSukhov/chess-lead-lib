import { BoardState } from "../../models/board-state";
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

  public getAvailable(boardState: BoardState, currentCell: Cell): Cell[] {
    this.validateGetAvailableArguments(boardState.board, currentCell);

    return this.getAvailableBasedOnDirections(boardState.board, currentCell);
  }
}
