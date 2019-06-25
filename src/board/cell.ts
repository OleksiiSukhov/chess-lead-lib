import { CellColorProvider } from "./cell-color-provider";
import { Color } from "./color";

export class Cell {
  public rowIndex: number = 0;
  public columnIndex: number = 0;
  private color?: Color;

  public get cellColor(): Color {
    if (this.color) {
      return this.color;
    }

    return CellColorProvider.getCellColor(this.rowIndex, this.columnIndex);
  }
}
