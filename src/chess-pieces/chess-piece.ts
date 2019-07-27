import * as v4 from "uuid/v4";
import { Movements } from "../board/movements/movements";
import { Color } from "../models/color";

export abstract class ChessPiece {
  public readonly color: Color;
  public readonly id: string;
  public movedNumber: number = 0;

  public get moved(): boolean {
    return this.movedNumber > 0;
  }

  constructor(color: Color) {
    this.color = color;
    this.id = v4();
  }

  public abstract movements(): Movements;
}
