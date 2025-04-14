export const lesson3 = {
    id: 3,
    title: "Editing & Movement",
    description: "Use hjkl to move, x to delete, r to replace, u to undo.",
    instructions: [
      "Use `l` twice to move the cursor to the letter `k` in `Hekko`.",
      "Replace `k` with `l` using `r l`.",
      "Undo your change using `u`.",
      "Redo it with `Ctrl+r`.",
      "Delete the exclamation mark using `x`.",
    ],
    initialText: "Hekko, Vimmers!",
    expectedText: "Hello, Vimmers",
    validKeys: ["h", "j", "k", "l", "r", "u", "x", "Ctrl+r"],
    checkpoints: [
      { test: text => text.includes("Hello"), msg: "Replaced `k` with `l`" },
      { test: text => !text.includes("!"), msg: "Deleted the exclamation mark" }
    ]
  };
  