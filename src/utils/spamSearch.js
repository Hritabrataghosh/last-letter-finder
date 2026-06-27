import { spamEndings } from "../data/spamEndings";

function sortWords(words) {

    return words.sort((a, b) => {

        if (a.length !== b.length)
            return a.length - b.length;

        return a.localeCompare(b);

    });

}

function parseQuery(query) {

    const raw = query.toLowerCase();

    if (!raw.trim())
        return null;

    if (raw.startsWith(" ")) {

        return {

            mode: "suffix",

            suffix: raw.trim()

        };

    }

    const parts =
        raw.trim().split(/\s+/);

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

export function searchSpamWords(
    words,
    query,
    limit = 50
){

    const parsed =
        parseQuery(query);

    if(!parsed)
        return [];

    let results = [];

    switch(parsed.mode){

        case "prefix":

            results = words.filter(word =>

                word.startsWith(parsed.prefix) &&

                spamEndings.some(
                    ending =>
                        word.endsWith(ending)
                )

            );

            break;

        case "suffix":

            results = words.filter(word =>

                word.endsWith(parsed.suffix) &&

                spamEndings.some(
                    ending =>
                        word.endsWith(ending)
                )

            );

            break;

        case "both":

            results = words.filter(word =>

                word.startsWith(parsed.start) &&

                word.endsWith(parsed.end) &&

                spamEndings.some(
                    ending =>
                        word.endsWith(ending)
                )

            );

            break;

    }

    return sortWords(results)
        .slice(0, limit);

}