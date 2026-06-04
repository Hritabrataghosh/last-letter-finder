const fs = require("fs");
const path = require("path");

const WORDS_PATH = path.join(
  __dirname,
  "..",
  "public",
  "words.txt"
);

const TRAP3_PATH = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "trap3.json"
);

const TRAP4_PATH = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "trap4.json"
);

const MIN_SOLVES = 3;

/*
  2 means:

  eum -> shortest solve must be
  at least 5 letters

  opod -> shortest solve must be
  at least 6 letters

  Much more realistic for
  Roblox Last Letter.
*/
const MIN_EXTRA_LETTERS = 2;

console.log("Loading words...");

const words = fs
  .readFileSync(WORDS_PATH, "utf8")
  .split(/\r?\n/)
  .map(word =>
    word.trim().toLowerCase()
  )
  .filter(word =>
    word.length >= 3
  );

const uniqueWords =
  [...new Set(words)];

console.log(
  `Loaded ${uniqueWords.length.toLocaleString()} words`
);

console.log(
  "Building prefix maps..."
);

const prefix3Map =
  new Map();

const prefix4Map =
  new Map();

for (const word of uniqueWords) {

  if (word.length >= 3) {

    const prefix3 =
      word.slice(0, 3);

    if (
      !prefix3Map.has(prefix3)
    ) {
      prefix3Map.set(
        prefix3,
        []
      );
    }

    prefix3Map
      .get(prefix3)
      .push(word);
  }

  if (word.length >= 4) {

    const prefix4 =
      word.slice(0, 4);

    if (
      !prefix4Map.has(prefix4)
    ) {
      prefix4Map.set(
        prefix4,
        []
      );
    }

    prefix4Map
      .get(prefix4)
      .push(word);
  }
}

const trap3 = [];
const trap4 = [];

console.log(
  "Generating traps..."
);

let processed = 0;

for (const word of uniqueWords) {

  processed++;

  if (
    processed % 50000 === 0
  ) {

    console.log(
      `Processed ${processed.toLocaleString()} / ${uniqueWords.length.toLocaleString()}`
    );
  }

  // ------------------
  // 3 LETTER TRAPS
  // ------------------

  if (word.length >= 6) {

    const suffix3 =
      word.slice(-3);

    const solves3 =
      (prefix3Map.get(suffix3) || [])
      .filter(
        solve =>
          solve !== word
      );

    if (
      solves3.length >=
      MIN_SOLVES
    ) {

      const shortestSolve =
        Math.min(
          ...solves3.map(
            s => s.length
          )
        );

      const difficulty =
        shortestSolve -
        suffix3.length;

      if (
        difficulty >=
        MIN_EXTRA_LETTERS
      ) {

        const score =
          difficulty * 100 -
          solves3.length;

        trap3.push({
          word,
          suffix: suffix3,
          solveCount:
            solves3.length,
          shortestSolve,
          difficulty,
          score
        });
      }
    }
  }

  // ------------------
  // 4 LETTER TRAPS
  // ------------------

  if (word.length >= 7) {

    const suffix4 =
      word.slice(-4);

    const solves4 =
      (prefix4Map.get(suffix4) || [])
      .filter(
        solve =>
          solve !== word
      );

    if (
      solves4.length >=
      MIN_SOLVES
    ) {

      const shortestSolve =
        Math.min(
          ...solves4.map(
            s => s.length
          )
        );

      const difficulty =
        shortestSolve -
        suffix4.length;

      if (
        difficulty >=
        MIN_EXTRA_LETTERS
      ) {

        const score =
          difficulty * 100 -
          solves4.length;

        trap4.push({
          word,
          suffix: suffix4,
          solveCount:
            solves4.length,
          shortestSolve,
          difficulty,
          score
        });
      }
    }
  }
}

console.log(
  "Sorting traps..."
);

trap3.sort(
  (a, b) =>
    b.score -
    a.score
);

trap4.sort(
  (a, b) =>
    b.score -
    a.score
);

console.log(
  "Saving trap3.json..."
);

fs.writeFileSync(
  TRAP3_PATH,
  JSON.stringify(
    trap3,
    null,
    2
  )
);

console.log(
  "Saving trap4.json..."
);

fs.writeFileSync(
  TRAP4_PATH,
  JSON.stringify(
    trap4,
    null,
    2
  )
);

console.log("");

console.log(
  "Finished."
);

console.log(
  `3-letter traps: ${trap3.length.toLocaleString()}`
);

console.log(
  `4-letter traps: ${trap4.length.toLocaleString()}`
);