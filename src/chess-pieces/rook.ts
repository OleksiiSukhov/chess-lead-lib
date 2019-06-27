import { Movements } from "../board/movements";
import { Color } from "../models/color";
import { ChessPiece } from "./chess-piece";

export class Rook extends ChessPiece {
  constructor(color: Color) {
    super(color);
  }

  public movements(): Movements {
    throw new Error("Method not implemented.");
  }
}
