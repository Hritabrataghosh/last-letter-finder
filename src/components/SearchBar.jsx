export default function SearchBar({
  query,
  setQuery,
  totalWords
}) {

  const handleDoubleClick = () => {
    setQuery("");
  };

  return (
    <div className="search-wrapper">

      <input
        className="search-input"
        value={query}
        placeholder="Search words... (space first = ends with)"
        onChange={(e) =>
          setQuery(e.target.value)
        }
        onDoubleClick={
          handleDoubleClick
        }
      />

      <div className="word-count">
        {totalWords.toLocaleString()} words loaded
      </div>

    </div>
  );
}