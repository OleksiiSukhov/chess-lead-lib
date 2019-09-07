import { RookMovements } from "../board/movements/rook-movements";
import { Color } from "../models/color";
import { Rook } from "./rook";

test("movements should return object of RookMovements", () => {
  const rook = new Rook(Color.Black);
  expect(rook.movements()).toBeInstanceOf(RookMovements);
});
