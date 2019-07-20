import { Cell } from "../cell";
import { Movements } from "./movements";

export class KingMovements extends Movements {
  public getAvailable(): Cell[] {
    throw new Error("Method not implemented.");
  }

}