import { Cell } from "../../board/cell";
import { Color } from "../../models/color";

export abstract class ChessPiece  {

  public readonly color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  public abstract availableMovements(): Cell[];
}
