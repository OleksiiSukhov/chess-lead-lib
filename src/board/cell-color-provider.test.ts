import { Color } from "../models/color";
import { CellColorProvider } from "./cell-color-provider";

const errorMessage = "row and column indexes should be 0 to 7";

test("getCellColor should throw error in case when row index is negative", () => {
  expect(() => CellColorProvider.getCellColor(-1, 0)).toThrow(errorMessage);
});

test("getCellColor should throw error in case when row index is more than 7", () => {
  expect(() => CellColorProvider.getCellColor(8, 0)).toThrow(errorMessage);
});

test("getCellColor should throw error in case when column index is negative", () => {
  expect(() => CellColorProvider.getCellColor(0, -1)).toThrow(errorMessage);
});

test("getCellColor should throw error in case when column index is more than 7", () => {
  expect(() => CellColorProvider.getCellColor(0, 8)).toThrow(errorMessage);
});

//   _________________________________
// 7 |   |BLK|   |BLK|   |BLK|   |BLK|
//   _________________________________
// 6 |BLK|   |BLK|   |BLK|   |BLK|   |
//   _________________________________
// 5 |   |BLK|   |BLK|   |BLK|   |BLK|
//   _________________________________
// 4 |BLK|   |BLK|   |BLK|   |BLK|   |
//   _________________________________
// 3 |   |BLK|   |BLK|   |BLK|   |BLK|
//   _________________________________
// 2 |BLK|   |BLK|   |BLK|   |BLK|   |
//   _________________________________
// 1 |   |BLK|   |BLK|   |BLK|   |BLK|
//   _________________________________
// 0 |BLK|   |BLK|   |BLK|   |BLK|   |
//   _________________________________
//     0   1   2   3   4   5   6   7
test("getCellColor should return correct color", () => {
  const whiteColorCellIndexes = [
    [0, 1], [0, 3], [0, 5], [0, 7],
    [1, 0], [1, 2], [1, 4], [1, 6],
    [2, 1], [2, 3], [2, 5], [2, 7],
    [3, 0], [3, 2], [3, 4], [3, 6],
    [4, 1], [4, 3], [4, 5], [4, 7],
    [5, 0], [5, 2], [5, 4], [5, 6],
    [6, 1], [6, 3], [6, 5], [6, 7],
    [7, 0], [7, 2], [7, 4], [7, 6]
  ];

  const blackColorCellIndexes = [
    [0, 0], [0, 2], [0, 4], [0, 6],
    [1, 1], [1, 3], [1, 5], [1, 7],
    [2, 0], [2, 2], [2, 4], [2, 6],
    [3, 1], [3, 3], [3, 5], [3, 7],
    [4, 0], [4, 2], [4, 4], [4, 6],
    [5, 1], [5, 3], [5, 5], [5, 7],
    [6, 0], [6, 2], [6, 4], [6, 6],
    [7, 1], [7, 3], [7, 5], [7, 7]
  ];

  whiteColorCellIndexes.forEach(cellIndexes => {
    expect(CellColorProvider.getCellColor(cellIndexes[0], cellIndexes[1])).toBe(Color.White);
  });

  blackColorCellIndexes.forEach(cellIndexes => {
    expect(CellColorProvider.getCellColor(cellIndexes[0], cellIndexes[1])).toBe(Color.Black);
  });
});
