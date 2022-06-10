import { generate } from "./sudoku";

self.addEventListener("message", (e) => {
  if (e.data === "generate") {
    self.postMessage(generate());
  }
});
