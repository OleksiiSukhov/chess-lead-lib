import { KingMovements } from "../board/movements/king-movements";
import { Movements } from "../board/movements/movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";
import { ChessType } from "./chess-type";

export class King extends ChessPiece {
  constructor(color: Color) {
    super(color, ChessType.King);
  }

  public movements(): Movements {
    return new KingMovements();
  }
}
