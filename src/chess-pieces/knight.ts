import { KnightMovements } from "../board/movements/knight-movements";
import { Movements } from "../board/movements/movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";

export class Knight extends ChessPiece {
  constructor(color: Color) {
    super(color);
  }

  public movements(): Movements {
    return new KnightMovements();
  }
}
