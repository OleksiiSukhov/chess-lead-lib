import { Movements } from "../board/movements/movements";
import { PawnMovements } from "../board/movements/pawn-movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";

export class Pawn extends ChessPiece {
  constructor(color: Color) {
    super(color);
  }

  public movements(): Movements {
    return new PawnMovements();
  }
}
