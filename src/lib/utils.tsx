import React from "react";

export function SplitChars({ text, muted }: { text: string; muted?: boolean }) {
  return (
    <>
      {text.split("").map((char, i) =>
        muted ? (
          <span key={i} data-char="" data-muted="" style={{ display: "inline", color: "#bdbdbd" }}>
            {char}
          </span>
        ) : (
          <span key={i} data-char="" style={{ display: "inline", color: "#bdbdbd" }}>
            {char}
          </span>
        )
      )}
    </>
  );
}
