import { Cell } from "../cell";
import { Movements } from "./movements";

export class QueenMovements extends Movements {
  public getAvailable(boardCells: Cell[][], currentCell: Cell): Cell[] {
    throw new Error("Method not implemented.");
  }

}
