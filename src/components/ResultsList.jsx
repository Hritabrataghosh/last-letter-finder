import { useState } from "react";

export default function ResultsList({
  title,
  results,
  trapMode = false,
  collapsible = false
}) {

  const [open, setOpen] =
    useState(false);

  const handleCopy = (
    text
  ) => {

    navigator.clipboard
      .writeText(text);
  };

  if (collapsible) {

    return (

      <div className="accordion">

        <div
          className="accordion-header"
          onClick={() =>
            setOpen(
              !open
            )
          }
        >

          {open
            ? "▼ "
            : "▶ "}

          {title}
          {" "}
          ({results.length})

        </div>

        {open && (

          <div
            className="accordion-content"
          >

            <div
              className="word-grid"
            >

              {results.map(
                (
                  item,
                  index
                ) => {

                  const word =
                    trapMode
                    ? item.word
                    : item;

                  return (

                    <div
                      key={index}
                      className="word-pill"
                      onClick={() =>
                        handleCopy(
                          word
                        )
                      }
                    >

                      {word}

                    </div>

                  );
                }
              )}

            </div>

          </div>

        )}

      </div>

    );
  }

  return (

    <div className="panel">

      <div className="panel-title">

        {title}
        {" "}
        ({results.length})

      </div>

      <div className="word-grid">

        {results.map(
          (
            item,
            index
          ) => {

            const word =
              trapMode
              ? item.word
              : item;

            return (

              <div
                key={index}
                className="word-pill"
                onClick={() =>
                  handleCopy(
                    word
                  )
                }
              >

                {word}

              </div>

            );
          }
        )}

      </div>

    </div>

  );
}