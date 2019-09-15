import { Square } from "../models/square";
import { Utils } from "./utils";

test("squaresOnSamePosition should return true for squares with the same row and column indexes", () => {
  const square1 = new Square(4, 2);
  const square2 = new Square(4, 2);

  expect(Utils.squaresOnSamePosition(square1, square2)).toBeTruthy();
});

test("squaresOnSamePosition should return false for squares with the same row and column indexes", () => {
  const square1 = new Square(4, 2);
  const square2 = new Square(5, 1);

  expect(Utils.squaresOnSamePosition(square1, square2)).toBeFalsy();
});
