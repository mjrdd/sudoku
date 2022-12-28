import { validateBoard, validateNumber } from "./utils";

export function solveSudoku(sudoku: number[][]) {
	let solutions = 0;

	const solver = (board: typeof sudoku) => {
		let x = 0;
		let y = 0;

		for (y = 0; y < 9; y++) {
			for (x = 0; x < 9; x++) {
				if (board[y][x] !== 0) continue;

				for (let i = 1; i <= 9; i++) {
					if (!validateNumber(board, x, y, i)) continue;
					board[y][x] = i;

					if (validateBoard(board)) {
						solutions += 1;
						break;
					}
					if (solver(board)) return true;
				}
				board[y][x] = 0;
				return false;
			}
		}
		board[y][x] = 0;
		return false;
	};

	solver(sudoku);
	console.log("Number of found solutions: ", solutions);

	return sudoku;
}