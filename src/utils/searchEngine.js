function sortWords(words) {

    return words.sort((a, b) => {

        if (a.length !== b.length)
            return a.length - b.length;

        return a.localeCompare(b);

    });

}

function sortTraps(traps) {

    return traps.sort((a, b) => {

        if (a.word.length !== b.word.length)
            return a.word.length - b.word.length;

        return a.word.localeCompare(b.word);

    });

}

function parseQuery(query) {

    const raw = query.toLowerCase();

    if (!raw.trim())
        return null;

    // Leading space = suffix search
    if (raw.startsWith(" ")) {

        return {
            mode: "suffix",
            suffix: raw.trim()
        };

    }

    // start end
    const parts = raw.trim().split(/\s+/);

    if (parts.length === 2) {

        return {

            mode: "both",

            start: parts[0],

            end: parts[1]

        };

    }

    return {

        mode: "prefix",

        prefix: raw.trim()

    };

}

export function searchWords(
    words,
    query,
    limit = 50
) {

    const parsed =
        parseQuery(query);

    if (!parsed)
        return [];

    let results = [];

    switch (parsed.mode) {

        case "prefix":

            results =
                words.filter(

                    word =>
                        word.startsWith(
                            parsed.prefix
                        )

                );

            break;

        case "suffix":

            results =
                words.filter(

                    word =>
                        word.endsWith(
                            parsed.suffix
                        )

                );

            break;

        case "both":

            results =
                words.filter(

                    word =>

                        word.startsWith(
                            parsed.start
                        ) &&

                        word.endsWith(
                            parsed.end
                        )

                );

            break;

    }

    return sortWords(results)
        .slice(0, limit);

}

export function searchTraps(
    traps,
    query,
    limit = 50
) {

    const parsed =
        parseQuery(query);

    if (!parsed)
        return [];

    let results = [];

    switch (parsed.mode) {

        case "prefix":

            results =
                traps.filter(

                    trap =>
                        trap.word.startsWith(
                            parsed.prefix
                        )

                );

            break;

        case "suffix":

            results =
                traps.filter(

                    trap =>
                        trap.word.endsWith(
                            parsed.suffix
                        )

                );

            break;

        case "both":

            results =
                traps.filter(

                    trap =>

                        trap.word.startsWith(
                            parsed.start
                        ) &&

                        trap.word.endsWith(
                            parsed.end
                        )

                );

            break;

    }

    return sortTraps(results)
        .slice(0, limit);

}