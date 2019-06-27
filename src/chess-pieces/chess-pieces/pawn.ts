import { Color } from "../../models/color";
import { IChessPiece as ChessPiece } from "./chess-piece";

export class Pawn extends ChessPiece {
  constructor(color: Color) {
    super(color);
  }
}
