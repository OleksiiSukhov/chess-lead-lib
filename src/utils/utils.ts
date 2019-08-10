import { Cell } from "../models/cell";

export class Utils {
  public static cellsOnSamePosition(cell1: Cell, cell2: Cell): boolean {
    return cell1.rowIndex === cell2.rowIndex && cell1.columnIndex === cell2.columnIndex;
  }
}
