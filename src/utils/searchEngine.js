export function searchWords(
  words,
  query,
  limit = 50
) {

  if (!query)
    return [];

  const q =
    query.toLowerCase();

  // ENDS WITH

  if (q.startsWith(" ")) {

    const suffix =
      q.trim();

    return words
      .filter(
        word =>
          word.endsWith(
            suffix
          )
      )
      .slice(0, limit);
  }

  // STARTS WITH

  return words
    .filter(
      word =>
        word.startsWith(
          q
        )
    )
    .slice(0, limit);
}

export function searchTraps(
  traps,
  query,
  limit = 50
) {

  if (!query)
    return [];

  const q =
    query.toLowerCase();

  // ENDS WITH SEARCH

  if (q.startsWith(" ")) {

    const suffix =
      q.trim();

    return traps
      .filter(
        trap =>
          trap.word.endsWith(
            suffix
          )
      )
      .slice(0, limit);
  }

  // STARTS WITH SEARCH

  return traps
    .filter(
      trap =>
        trap.word.startsWith(
          q.trim()
        )
    )
    .slice(0, limit);
}