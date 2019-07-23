import { Movements } from "../board/movements/movements";
import { Color } from "../models/color";

export abstract class ChessPiece  {

  public readonly color: Color;
  public moved: boolean = false;

  constructor(color: Color) {
    this.color = color;
  }

  public abstract movements(): Movements;
}
