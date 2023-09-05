import React from "react";
import styled from "styled-components";

interface HighlightedTextProps {
  text: string;
  searchValue: string;
}

function HighlightedText({
  text,
  searchValue,
}: HighlightedTextProps): JSX.Element {
  if (!searchValue) {
    return <>{text}</>;
  }

  let lowerCaseText = text.toLowerCase();
  const lowerCaseSearchValue = searchValue.toLowerCase();
  const parts: (string | JSX.Element)[] = [];

  let index = lowerCaseText.indexOf(lowerCaseSearchValue);

  while (index !== -1) {
    parts.push(text.slice(0, index));
    parts.push(
      <SHighlight key={index}>
        {text.slice(index, index + searchValue.length)}
      </SHighlight>
    );
    text = text.slice(index + searchValue.length);
    lowerCaseText = lowerCaseText.slice(index + searchValue.length);
    index = lowerCaseText.indexOf(lowerCaseSearchValue);
  }

  parts.push(text);
  return <>{parts}</>;
}

const SHighlight = styled.span`
  color: orange;
`;
export default HighlightedText;
