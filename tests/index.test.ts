import { describe, expect, it } from "vitest";
import { generateSudoku, removeHints, solveSudoku } from "../src";

describe("Generate Sudoku", () => {
	const board = removeHints(generateSudoku(), 35);

	it("Returns correct type", () => {
		expect(board).toBeTypeOf("object");
		expect(board.length).toBe(9);

		for (let y = 0; y < 9; y++) {
			expect(board[y].length).toBe(9);

			for (let x = 0; x < 9; x++) {
				expect(board[y][x]).toBeTypeOf("number");
			}
		}
	});

	it("Returns correct number of removed hints", () => {
		const count = board.flat(2).filter((n) => n === 0).length;

		expect(count).toBe(35);
	});
});

describe("Solve Sudoku", () => {
	const sudoku = generateSudoku();
	const solutions = solveSudoku(removeHints(sudoku, 40));

	it("Solves the puzzle", () => {
		expect(solutions).toBe(sudoku);
	});
});
