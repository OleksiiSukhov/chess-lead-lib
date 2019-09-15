import { Color } from "../models/color";
import { Guard } from "../validators/guard";

export class SquareColorProvider {
  public static getSquareColor(rowIndex: number, columnIndex: number): Color {
    Guard.validateBoardIndexes(rowIndex, columnIndex);

    const indexesSum = rowIndex + columnIndex;
    const isSunEven = indexesSum % 2 === 0;

    return isSunEven ? Color.Black : Color.White;
  }
}
