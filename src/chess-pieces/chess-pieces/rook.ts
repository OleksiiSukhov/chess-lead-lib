import { Color } from "../../models/color";
import { IChessPiece as ChessPiece } from "./chess-piece";

export class Rook extends ChessPiece {
  constructor(color: Color) {
    super(color);
  }
}
