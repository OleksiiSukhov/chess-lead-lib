import { Cell } from "../board/cell";

export class MovedChessPiece {
  public readonly chessPieceId: string;
  public fromCell?: Cell;
  public toCell?: Cell;

  constructor(chessPieceId: string) {
    this.chessPieceId = chessPieceId;
  }
}
