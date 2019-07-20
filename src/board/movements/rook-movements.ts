import { Cell } from "../cell";
import { Movements } from "./movements";

export class RookMovements extends Movements {
  public getAvailable(): Cell[] {
    throw new Error("Method not implemented.");
  }

}
