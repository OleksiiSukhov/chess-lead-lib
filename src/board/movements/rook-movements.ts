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

  public getAvailable(boardCells: Cell[][], currentCell: Cell): Cell[] {
    this.validateGetAvailableArguments(boardCells, currentCell);

    return this.getAvailableBasedOnDirections(boardCells, currentCell);
  }
}
