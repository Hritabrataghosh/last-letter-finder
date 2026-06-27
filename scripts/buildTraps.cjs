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

const MIN_SOLVES = 2;

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

/*
==========================================
TRAP GENERATION ENGINE V2
==========================================
*/

const trap3 = [];
const trap4 = [];


console.log("Generating traps...");

let processed = 0;

function buildTrapObject(
  word,
  trap,
  solveCount,
  shortestSolve,
  type
){

  const difficulty =
    shortestSolve -
    trap.length;

  const score =
    difficulty * 100 -
    solveCount;

  return {

    word,

    trap,

    type,

    solveCount,

    shortestSolve,

    difficulty,

    score

  };

}

function registerTrap(
    trapArray,
    object
){

    trapArray.push(object);

}
function sortTrapGroup(group){

    group.sort((a,b)=>{

        if (b.score !== a.score)
    return b.score - a.score;

if (a.solveCount !== b.solveCount)
    return a.solveCount - b.solveCount;

if (a.word.length !== b.word.length)
    return a.word.length - b.word.length;

return a.word.localeCompare(b.word);

    });

}

function distributeTrapGroups(traps){

    const groups = new Map();

    for(const trap of traps){

        const key = `${trap.type}:${trap.trap}`;

if (!groups.has(key)) {
    groups.set(key, []);
}

groups.get(key).push(trap);
    }

    for(const group of groups.values())
        sortTrapGroup(group);

    const result=[];

const queues =
    [...groups.values()];

while(queues.length){

    queues.sort((a,b)=>{

        if(
            b[0].score !==
            a[0].score
        )
            return (
                b[0].score -
                a[0].score
            );

        return (
            a.length -
            b.length
        );

    });

    const current =
        queues.shift();

    result.push(
        current.shift()
    );

    if(current.length)
        queues.push(current);

}

return result;

}

for(const word of uniqueWords){

    processed++;

    if(processed % 50000 === 0){

        console.log(

            `Processed ${processed.toLocaleString()} / ${uniqueWords.length.toLocaleString()}`

        );

    }

    /*
    --------------------------
    3 LETTER SUFFIX TRAP
    --------------------------
    */

    if(word.length >= 6){

        const trap =
            word.slice(-3);

        const solves =
            (prefix3Map.get(trap) || [])
            .filter(
                solve =>
                    solve !== word
            );

        if(
            solves.length >= MIN_SOLVES
        ){

            const shortest =
                Math.min(
                    ...solves.map(
                        s=>s.length
                    )
                );

            if(
                shortest >=
                trap.length +
                MIN_EXTRA_LETTERS
            ){

                registerTrap(

    trap3,

                    buildTrapObject(

                        word,

                        trap,

                        solves.length,

                        shortest,

                        "suffix"

                    )

                );

            }

        }

    }

    /*
    --------------------------
    4 LETTER SUFFIX TRAP
    --------------------------
    */

    if(word.length >= 7){

        const trap =
            word.slice(-4);

        const solves =
            (prefix4Map.get(trap)||[])
            .filter(
                solve =>
                    solve !== word
            );

        if(
            solves.length >= MIN_SOLVES
        ){

            const shortest =
                Math.min(
                    ...solves.map(
                        s=>s.length
                    )
                );

            if(
                shortest >=
                trap.length +
                MIN_EXTRA_LETTERS
            ){

                registerTrap(

    trap4,
                    buildTrapObject(

                        word,

                        trap,

                        solves.length,

                        shortest,

                        "suffix"

                    )

                );

            }

        }

    }

    /*
    --------------------------
    SELF 3 LETTER TRAP
    --------------------------
    */

    if(word.length === 3){

        const solves =
            (prefix3Map.get(word)||[])
            .filter(
                solve =>
                    solve !== word
            );

        if(
            solves.length >=
            MIN_SOLVES
        ){

            const shortest =
                Math.min(
                    ...solves.map(
                        s=>s.length
                    )
                );

            if(
                shortest >=
                word.length +
                MIN_EXTRA_LETTERS
            ){

                registerTrap(

    trap3,

                    buildTrapObject(

                        word,

                        word,

                        solves.length,

                        shortest,

                        "self"

                    )

                );

            }

        }

    }

    /*
    --------------------------
    SELF 4 LETTER TRAP
    --------------------------
    */

    if(word.length === 4){

        const solves =
            (prefix4Map.get(word)||[])
            .filter(
                solve =>
                    solve !== word
            );

        if(
            solves.length >=
            MIN_SOLVES
        ){

            const shortest =
                Math.min(
                    ...solves.map(
                        s=>s.length
                    )
                );

            if(
                shortest >=
                word.length +
                MIN_EXTRA_LETTERS
            ){

                registerTrap(

    trap4,

                    buildTrapObject(

                        word,

                        word,

                        solves.length,

                        shortest,

                        "self"

                    )

                );

            }

        }

    }

}

console.log(
    "Distributing trap families..."
);

const finalTrap3 =
    distributeTrapGroups(
        trap3
    );

const finalTrap4 =
    distributeTrapGroups(
        trap4
    );
    console.log(
  "Saving trap3.json..."
);

fs.writeFileSync(
  TRAP3_PATH,
  JSON.stringify(
    finalTrap3,
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
    finalTrap4,
    null,
    2
  )
);

console.log("");

console.log(
  "Finished."
);

console.log(
  `3-letter traps: ${finalTrap3.length.toLocaleString()}`
);

console.log(
  `4-letter traps: ${finalTrap4.length.toLocaleString()}`
);