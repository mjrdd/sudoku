import { describe, expect, it } from "vitest";
import { generate, removeHints, solve } from "../src";

describe("Sudoku Test", () => {
	const sudoku = generate();
	const puzzle = removeHints(sudoku, 55);
	const solution = solve(puzzle);

	it("Check correct object type", () => {
		expect(sudoku).toBeTypeOf("object");
		expect(sudoku.length).toBe(9);

		for (let y = 0; y < 9; y++) {
			expect(sudoku[y].length).toBe(9);

			for (let x = 0; x < 9; x++) {
				expect(sudoku[y][x]).toBeTypeOf("number");
			}
		}
	});

	it("Solve the sudoku puzzle", () => {
		expect(solution).toStrictEqual(sudoku);
	});
});
