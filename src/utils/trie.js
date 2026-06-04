import TrieSearch from "trie-search";

let trie = null;

export function buildTrie(words) {
  trie = new TrieSearch("word");

  const data = words.map(word => ({
    word
  }));

  trie.addAll(data);

  return trie;
}

export function getTrie() {
  return trie;
}