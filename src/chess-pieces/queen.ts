import { Movements } from "../board/movements/movements";
import { QueenMovements } from "../board/movements/queen-movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";

export class Queen extends ChessPiece {
  constructor(color: Color) {
    super(color);
  }

  public movements(): Movements {
    return new QueenMovements();
  }
}
