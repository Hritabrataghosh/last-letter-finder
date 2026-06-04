export async function loadWords() {

  const response =
    await fetch(
      "/words.txt"
    );

  const text =
    await response.text();

  return text
    .split(/\r?\n/)
    .map(
      word =>
        word.trim()
          .toLowerCase()
    )
    .filter(
      word =>
        word.length >= 3
    );
}