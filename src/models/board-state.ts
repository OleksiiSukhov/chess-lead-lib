import { Cell } from "../board/cell";
import { DrawType } from "./draw-type";
import { GameStatus } from "./game-status";
import { WinType } from "./win-type";

export class BoardState {
  public isCheck: boolean = false;
  public gameStatus?: GameStatus = undefined;
  public drawType?: DrawType = undefined;
  public winType?: WinType = undefined;
  public board: Cell[][] = [];
  public repetitionNumber: number = 0;
}
