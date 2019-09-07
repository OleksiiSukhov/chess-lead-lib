import { Movements } from "../board/movements/movements";
import { RookMovements } from "../board/movements/rook-movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";
import { ChessPieceType } from "./chess-piece-type";

export class Rook extends ChessPiece {
  constructor(color: Color) {
    super(color, ChessPieceType.Rook);
  }

  public movements(): Movements {
    return new RookMovements();
  }
}
