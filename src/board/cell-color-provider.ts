import { Color } from "./color";

export class CellColorProvider {
  public static getCellColor(rowIndex: number, columnIndex: number): Color {
    if (rowIndex < 0 || rowIndex > 7 || columnIndex < 0 || columnIndex > 7) {
      throw Error("row and column indexes should be 0 to 7");
    }

    const indexesSum = rowIndex + columnIndex;
    const isSunEven = indexesSum % 2 === 0;

    return isSunEven ? Color.Black : Color.White;
  }
}
