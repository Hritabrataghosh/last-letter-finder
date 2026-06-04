export default function ResultsList({
  title,
  results,
  trapMode = false
}) {

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="panel">

      <div className="panel-title">
        {title} ({results.length})
      </div>

      <div className="word-grid">

        {results.map((item, index) => {

          const word = trapMode
            ? item.word
            : item;

          return (
            <div
              key={index}
              className="word-pill"
              onClick={() =>
                handleCopy(word)
              }
              title="Click to copy"
            >
              {word}
            </div>
          );
        })}

      </div>

    </div>
  );
}