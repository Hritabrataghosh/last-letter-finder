import {
  spamEndings
}
from "../data/spamEndings";

export function searchSpamWords(
  words,
  query,
  limit = 50
){

  if(!query)
    return [];

  const q =
    query.toLowerCase();

  return words
    .filter(word=>{

      if(
        !word.startsWith(q)
      )
        return false;

      return spamEndings.some(
        ending =>
          word.endsWith(
            ending
          )
      );

    })
    .slice(0,limit);

}