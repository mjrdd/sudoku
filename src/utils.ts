function checkBoard(board: number[][]) {
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			if (board[y][x] === 0) return false;
		}
	}
	return true;
}

function checkNumber(board: number[][], x: number, y: number, num: number) {
	const dx = ~~(x / 3) * 3;
	const dy = ~~(y / 3) * 3;

	return !(
		board[y].includes(num) ||
		board.map((r) => r[x]).includes(num) ||
		board
			.slice(dy, dy + 3)
			.reduce((s, r) => [...s, ...r.slice(dx, dx + 3)], [])
			.includes(num)
	);
}

function shuffle(arr: number[]) {
	let i = arr.length;
	let rand = 0;

	while (i > 0) {
		rand = ~~(Math.random() * arr.length);
		i -= 1;
		[arr[i], arr[rand]] = [arr[rand], arr[i]];
	}
	return arr;
}

export { checkBoard, checkNumber, shuffle };
