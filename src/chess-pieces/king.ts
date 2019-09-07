import { KingMovements } from "../board/movements/king-movements";
import { Movements } from "../board/movements/movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";
import { ChessPieceType } from "./chess-piece-type";

export class King extends ChessPiece {
  constructor(color: Color) {
    super(color, ChessPieceType.King);
  }

  public movements(): Movements {
    return new KingMovements();
  }
}
