import { Direction } from "../../models/direction";
import { Cell } from "../cell";

export abstract class Movements {
  public maxMovementSquares: number = 0;
  public canLeap: boolean = false;
  public canDoCastling: boolean = false;
  public canDoEnPassant: boolean = false;
  public canDoPromotion: boolean = false;
  public directions: Direction[] = [];

  public abstract getAvailable(boardCells: Cell[][], currentCell: Cell): Cell[];
}
