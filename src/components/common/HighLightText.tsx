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
  const index = text.toLowerCase().indexOf(searchValue.toLowerCase());
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <SHighlight>{text.slice(index, index + searchValue.length)}</SHighlight>
      {text.slice(index + searchValue.length)}
    </>
  );
}

const SHighlight = styled.span`
  color: orange;
`;
export default HighlightedText;
