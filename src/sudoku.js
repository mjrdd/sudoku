export function generate() {
  let board = [];

  for (let y = 0; y < 9; y++) {
    board[y] = [];

    for (let x = 0; x < 9; x++) {
      board[y][x] = 0;
    }
  }

  function isValid(x, y, v) {
    let dx = Math.floor(x / 3) * 3;
    let dy = Math.floor(y / 3) * 3;

    return !(
      board[y].includes(v) ||
      board.map((r) => r[x]).includes(v) ||
      board
        .slice(dy, dy + 3)
        .reduce((s, r) => [...s, ...r.slice(dx, dx + 3)], [])
        .includes(v)
    );
  }

  function backtracker() {
    let x = 0;
    let y = 0;

    for (let i = 0; i < 81; i++) {
      x = i % 9;
      y = Math.floor(i / 9);
      if (board[y][x] !== 0) continue;

      for (let v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        if (!isValid(x, y, v)) continue;
        board[y][x] = v;
        if (!board.flat(2).includes(0)) return true;
        if (backtracker()) return true;
      }
      break;
    }
    board[y][x] = 0;
  }

  backtracker();
  let trial = 3;
  let count = 0;

  function solver() {
    let x = 0;
    let y = 0;

    for (let i = 0; i < 81; i++) {
      x = i % 9;
      y = Math.floor(i / 9);

      if (board[y][x] !== 0) continue;
      for (let k = 1; k <= 9; k++) {
        if (!isValid(x, y, k)) continue;
        board[y][x] = k;
        if (!board.flat(2).includes(0)) {
          count += 1;
          break;
        }
        if (solver()) return true;
      }
      break;
    }
    board[y][x] = 0;
  }

  while (trial > 0) {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);

    while (board[y][x] === 0) {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);
    }

    let n = board[y][x];
    board[y][x] = 0;

    count = 0;
    let cc = deepCopy(board);
    solver(cc);

    if (count !== 1) {
      board[y][x] = n;
      trial -= 1;
    }
  }

  return board;
}

function shuffle(arr) {
  let i = arr.length;
  let rand = 0;

  while (i > 0) {
    rand = Math.floor(Math.random() * arr.length);
    i -= 1;

    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }

  return arr;
}

function deepCopy(arr) {
  let copy = [];

  arr.forEach((i) => {
    if (Array.isArray(i)) {
      copy.push(deepCopy(i));
    } else {
      copy.push(i);
    }
  });
}
