import { Square } from "./square";

export class MovedChessPiece {
  public readonly chessPieceId: string;
  public fromSquare?: Square;
  public toSquare?: Square;

  constructor(chessPieceId: string) {
    this.chessPieceId = chessPieceId;
  }
}
