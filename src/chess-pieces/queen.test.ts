import { QueenMovements } from "../board/movements/queen-movements";
import { Color } from "../models/color";
import { Queen } from "./queen";

test("movements should return object of QueenMovements", () => {
  const queen = new Queen(Color.Black);
  expect(queen.movements()).toBeInstanceOf(QueenMovements);
});
