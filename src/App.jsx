import { useEffect, useState } from "react";

import "./App.css";

import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";

import { loadWords } from "./database/db";

import {
  searchWords,
  searchTraps
} from "./utils/searchEngine";

import trap3Data from "./data/trap3.json";
import trap4Data from "./data/trap4.json";

export default function App() {

  const [words, setWords] =
    useState([]);

  const [query, setQuery] =
    useState("");

  const [normalResults,
    setNormalResults] =
    useState([]);

  const [trap3Results,
    setTrap3Results] =
    useState([]);

  const [trap4Results,
    setTrap4Results] =
    useState([]);

  useEffect(() => {

    async function initialize() {

      const loadedWords =
        await loadWords();

      setWords(
        loadedWords
      );
    }

    initialize();

  }, []);
  useEffect(() => {

  const clearSearch = (e) => {

    if (e.key === "Escape") {
      setQuery("");
    }

  };

  window.addEventListener(
    "keydown",
    clearSearch
  );

  return () => {

    window.removeEventListener(
      "keydown",
      clearSearch
    );

  };

}, []);

  useEffect(() => {

    if (query === "") {

      setNormalResults([]);
      setTrap3Results([]);
      setTrap4Results([]);

      return;
    }

    setNormalResults(

      searchWords(
        words,
        query,
        50
      )

    );

    setTrap3Results(

      searchTraps(
        trap3Data,
        query,
        50
      )

    );

    setTrap4Results(

      searchTraps(
        trap4Data,
        query,
        50
      )

    );

  }, [
    query,
    words
  ]);

  return (

    <div className="app">

      <h1 className="title">
        LAST LETTER FINDER
      </h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        totalWords={
          words.length
        }
      />

      <div className="results-layout">

        <ResultsList
          title="Normal Solves"
          results={
            normalResults
          }
        />

        <ResultsList
          title="3 Letter Traps"
          results={
            trap3Results
          }
          trapMode={true}
        />

        <ResultsList
          title="4 Letter Traps"
          results={
            trap4Results
          }
          trapMode={true}
        />
        

      </div>

    </div>

  );
}