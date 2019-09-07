import { KnightMovements } from "../board/movements/knight-movements";
import { Movements } from "../board/movements/movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";
import { ChessPieceType } from "./chess-piece-type";

export class Knight extends ChessPiece {
  constructor(color: Color) {
    super(color, ChessPieceType.Knight);
  }

  public movements(): Movements {
    return new KnightMovements();
  }
}
