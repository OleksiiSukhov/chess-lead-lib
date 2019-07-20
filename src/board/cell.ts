import { ChessPiece } from "../chess-pieces/chess-piece";
import { Color } from "../models/color";
import { CellColorProvider } from "./cell-color-provider";

export class Cell {
  public readonly rowIndex: number = 0;
  public readonly columnIndex: number = 0;
  public chessPiece?: ChessPiece = undefined;

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

  public get isEmpty(): boolean {
    return this.chessPiece === undefined;
  }

  public get isInBoardBoundaries(): boolean {
    return (
      this.rowIndex >= 0 && this.rowIndex <= 7 && this.columnIndex >= 0 && this.columnIndex <= 7
    );
  }

  constructor(rowIndex: number, columnIndex: number) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }

  public isSamePositionAs(other: Cell): boolean {
    return this.rowIndex === other.rowIndex && this.columnIndex === other.columnIndex;
  }
}
