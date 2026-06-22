export function searchWords(
  words,
  query,
  limit = 50
) {

  if (!query)
    return [];

  const q =
    query.toLowerCase();

  const parts =
    q.trim().split(/\s+/);

  // s ines

  if (parts.length === 2) {

    const start =
      parts[0];

    const end =
      parts[1];

    return words
      .filter(
        word =>
          word.startsWith(start) &&
          word.endsWith(end)
      )
      .slice(0, limit);
  }

  // " eum"

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
  .sort(
    (a,b) =>
      a.length - b.length ||
      a.localeCompare(b)
  )
  .slice(0, limit);
  }

  return words
  .filter(
    word =>
      word.startsWith(q)
  )
  .sort(
    (a,b) =>
      a.length - b.length ||
      a.localeCompare(b)
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

  const parts =
    q.trim().split(/\s+/);

  if (parts.length === 2) {

    const start =
      parts[0];

    const end =
      parts[1];

    return words
  .filter(
    word =>
      word.startsWith(start) &&
      word.endsWith(end)
  )
  .sort(
    (a,b) =>
      a.length - b.length ||
      a.localeCompare(b)
  )
  .slice(0, limit);
  }

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

  return traps
    .filter(
      trap =>
        trap.word.startsWith(
          q.trim()
        )
    )
    .slice(0, limit);
}