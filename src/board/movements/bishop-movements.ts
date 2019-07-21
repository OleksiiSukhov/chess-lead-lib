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
    this.validateGetAvailableArguments(boardCells, currentCell);

    return this.getAvailableBasedOnDirections(boardCells, currentCell);
  }
}
