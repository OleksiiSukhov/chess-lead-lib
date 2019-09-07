import { KnightMovements } from "../board/movements/knight-movements";
import { Color } from "../models/color";
import { Knight } from "./knight";

test("movements should return object of KnightMovements", () => {
  const knight = new Knight(Color.Black);
  expect(knight.movements()).toBeInstanceOf(KnightMovements);
});
