import { KnightMovements } from "../board/movements/knight-movements";
import { Movements } from "../board/movements/movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";
import { ChessType } from "./chess-type";

export class Knight extends ChessPiece {
  constructor(color: Color) {
    super(color, ChessType.Knight);
  }

  public movements(): Movements {
    return new KnightMovements();
  }
}
