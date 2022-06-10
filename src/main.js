import "./style.css";
import bgworker from "./webworker?worker";

const canv = document.querySelector("#game");
const btn = document.querySelector("#generate-btn");
const ctx = canv.getContext("2d");

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

let lineWidth = 1;
let lineColor = "#000";

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawGrid() {
  lineWidth = 2;
  lineColor = "#cfcfcf";

  drawLine(120, 0, 120, 1080);
  drawLine(240, 0, 240, 1080);
  drawLine(480, 0, 480, 1080);
  drawLine(600, 0, 600, 1080);
  drawLine(840, 0, 840, 1080);
  drawLine(960, 0, 960, 1080);
  drawLine(0, 120, 1080, 120);
  drawLine(0, 240, 1080, 240);
  drawLine(0, 480, 1080, 480);
  drawLine(0, 600, 1080, 600);
  drawLine(0, 840, 1080, 840);
  drawLine(0, 960, 1080, 960);

  lineWidth = 4;
  lineColor = "#393939";

  drawLine(2, 0, 2, 1080);
  drawLine(360, 0, 360, 1080);
  drawLine(720, 0, 720, 1080);
  drawLine(1078, 0, 1078, 1080);
  drawLine(0, 2, 1080, 2);
  drawLine(0, 360, 1080, 360);
  drawLine(0, 720, 1080, 720);
  drawLine(0, 1078, 1080, 1078);
}

let textColor = "#000";

function drawText(text, x, y) {
  ctx.font = "70px 'Open Sans'";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, y);
}

let game;

function setupHints() {
  if (!game) return;

  textColor = "#131313";

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      let n = game[y][x];
      if (n !== 0) {
        drawText(game[y][x], x * 120 + 60, y * 120 + 65);
      }
    }
  }
}

let solution = new Map();

function drawSolution() {
  textColor = "blue";

  solution.forEach((value, key) => {
    let x = key % 9;
    let y = Math.floor(key / 9);

    drawText(value.toString(), x * 120 + 60, y * 120 + 65);
  });
}

let notes = new Map();

function drawNotes() {
  textColor = "#a9a9a9";

  notes.forEach((value, key) => {
    let x = key % 9;
    let y = Math.floor(key / 9);

    drawText(value.toString(), x * 120 + 60, y * 120 + 65);
  });
}

let activeTile = {};

function drawActiveTile() {
  if (isEmpty(activeTile)) return;

  ctx.beginPath();
  ctx.fillStyle = "rgba(135,206,235,0.4)";
  ctx.fillRect(activeTile.x * 120, activeTile.y * 120, 120, 120);
}

function render() {
  window.requestAnimationFrame(render);
  ctx.clearRect(0, 0, 1080, 1080);

  drawGrid();
  setupHints();
  drawNotes();
  drawSolution();
  drawActiveTile();
}

render();

let pointer = {};
let pointerStart = {};
let pointerEnd = {};
let isPointerDown = false;

canv.addEventListener("pointerdown", (e) => {
  canv.setPointerCapture(e.pointerId);
  isPointerDown = true;

  pointerStart.x = Math.floor((e.offsetX / 400) * 1080);
  pointerStart.y = Math.floor((e.offsetY / 400) * 1080);

  activeTile.x = Math.floor(pointerStart.x / 120);
  activeTile.y = Math.floor(pointerStart.y / 120);
});

canv.addEventListener("pointerup", (e) => {
  isPointerDown = false;

  pointerEnd.x = Math.floor((e.offsetX / 400) * 1080);
  pointerEnd.y = Math.floor((e.offsetY / 400) * 1080);
});

canv.addEventListener("pointermove", (e) => {
  pointer.x = Math.floor((e.offsetX / 400) * 1080);
  pointer.y = Math.floor((e.offsetY / 400) * 1080);
});

canv.addEventListener("pointerleave", (e) => {
  pointer = {};
});

const inputKeys = {
  Digit1: 1,
  Digit2: 2,
  Digit3: 3,
  Digit4: 4,
  Digit5: 5,
  Digit6: 6,
  Digit7: 7,
  Digit8: 8,
  Digit9: 9,
};

window.addEventListener("keyup", (e) => {
  if (inputKeys[e.code] == undefined) return;

  let index = activeTile.y * 9 + activeTile.x;

  if (e.shiftKey) {
    notes.set(index, inputKeys[e.code]);
  } else {
    solution.set(index, inputKeys[e.code]);
  }
});

const webworker = new bgworker();
let isGenerating = false;

webworker.addEventListener("message", (e) => {
  solution.clear();
  notes.clear();
  game = e.data;
  isGenerating = false;
});

btn.addEventListener("click", () => {
  if (isGenerating) return;
  isGenerating = true;
  webworker.postMessage("generate");
});
