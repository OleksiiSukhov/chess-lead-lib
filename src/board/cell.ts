import { Color } from "../models/color";
import { CellColorProvider } from "./cell-color-provider";

export class Cell {
  public readonly rowIndex: number = 0;
  public readonly columnIndex: number = 0;

  public get rowName(): string {
    return (this.rowIndex + 1).toString();
  }

  public get columnName(): string {
    const aAsciiCode = 97;

    return String.fromCharCode(aAsciiCode + this.columnIndex);
  }

  private color?: Color;
  public get cellColor(): Color {
    if (this.color) {
      return this.color;
    }

    return CellColorProvider.getCellColor(this.rowIndex, this.columnIndex);
  }

  constructor(rowIndex: number, columnIndex: number) {
    if (rowIndex < 0 || rowIndex > 7 || columnIndex < 0 || columnIndex > 7) {
      throw Error("row and column indexes should be 0 to 7");
    }

    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }
}
