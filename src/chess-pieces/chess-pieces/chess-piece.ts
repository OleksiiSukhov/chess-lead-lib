import { Color } from "../../models/color";

export class IChessPiece {
  public readonly color: Color;

  constructor(color: Color) {
    this.color = color;
  }
}
