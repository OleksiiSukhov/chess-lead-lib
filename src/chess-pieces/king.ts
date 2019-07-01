import { KingMovements } from "../board/movements/king-movements";
import { Movements } from "../board/movements/movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";

export class King extends ChessPiece {
  constructor(color: Color) {
    super(color);
  }

  public movements(): Movements {
    return new KingMovements();
  }
}
