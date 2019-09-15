import { SquareColorProvider } from "../board/square-color-provider";
import { ChessPiece } from "../chess-pieces/chess-piece";
import { Color } from "./color";

export class Square {
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
  public get squareColor(): Color {
    if (this.color) {
      return this.color;
    }

    return SquareColorProvider.getSquareColor(this.rowIndex, this.columnIndex);
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
}
