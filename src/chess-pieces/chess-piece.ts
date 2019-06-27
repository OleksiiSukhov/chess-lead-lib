import { Movements } from "../board/movements";
import { Color } from "../models/color";

export abstract class ChessPiece  {

  public readonly color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  public abstract movements(): Movements;
}
