import { checkBoard, checkNumber, shuffle } from "./utils";

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function generateSudoku() {
	let sudoku: number[][] = [];

	for (let y = 0; y < 9; y++) {
		sudoku[y] = [];

		for (let x = 0; x < 9; x++) {
			sudoku[y][x] = 0;
		}
	}

	function backtracker(board: typeof sudoku) {
		let x = 0;
		let y = 0;

		for (y = 0; y < 9; y++) {
			for (x = 0; x < 9; x++) {
				if (board[y][x] !== 0) continue;

				for (let i of shuffle(nums)) {
					if (!checkNumber(board, x, y, i)) continue;
					board[y][x] = i;

					if (checkBoard(board)) return true;
					if (backtracker(board)) return true;
				}
				board[y][x] = 0;
				return false;
			}
		}
		board[y][x] = 0;
		return false;
	}

	backtracker(sudoku);
	return sudoku;
}

function removeHints(sudoku: number[][], count: number) {
	let solutions = 0;

	function solver(board: typeof sudoku) {
		let x = 0;
		let y = 0;

		for (y = 0; y < 9; y++) {
			for (x = 0; x < 9; x++) {
				if (board[y][x] !== 0) continue;

				for (let i = 1; i <= 9; i++) {
					if (!checkNumber(board, x, y, i)) continue;
					board[y][x] = i;

					if (checkBoard(board)) {
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
	}

	while (count > 0) {
		let x = ~~(Math.random() * 9);
		let y = ~~(Math.random() * 9);

		while (sudoku[y][x] === 0) {
			x = ~~(Math.random() * 9);
			y = ~~(Math.random() * 9);
		}

		let num = sudoku[y][x];
		sudoku[y][x] = 0;

		solutions = 0;
		solver(JSON.parse(JSON.stringify(sudoku)));

		if (solutions !== 1) {
			sudoku[y][x] = num;
		} else {
			count -= 1;
		}
	}

	return sudoku;
}

export { generateSudoku, removeHints };
