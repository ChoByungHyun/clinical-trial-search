import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import HighlightedText from "components/common/HighLightText";
// Interface for ClinicalTrialData
interface ClinicalTrialData {
  sickCd: string;
  sickNm: string;
}

// Interface for DropdownProps
interface DropdownProps {
  searchResults: ClinicalTrialData[];
  isFocused: boolean;
  searchValue: string;
  handleDropdownClick: (index: number) => void;
  handleSeachValueChange: (str: string) => void;
}

const RecommendDropDown: React.FC<DropdownProps> = ({
  searchResults,
  handleDropdownClick,
  isFocused,
  handleSeachValueChange,
  searchValue,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    // 방향키와 엔터로 드롭박스 이동 및 선택 가능하도록 하는 함수
    function handleKeyDown(event: KeyboardEvent) {
      if (isFocused && searchResults.length > 0) {
        switch (event.key) {
          case "ArrowUp":
            setSelectedIndex((prevIndex) =>
              prevIndex <= 0 ? searchResults.length - 1 : prevIndex - 1
            );
            break;
          case "ArrowDown":
            setSelectedIndex((prevIndex) =>
              prevIndex >= searchResults.length - 1 ? 0 : prevIndex + 1
            );
            break;
          case "Enter":
            if (selectedIndex !== -1) {
              handleSeachValueChange(searchResults[selectedIndex].sickNm);
            }
            break;
          default:
            break;
        }
      }
    }

    // 스크롤 조정
    const activeOption = dropdownRef.current?.querySelector(".active-option");
    if (activeOption) {
      activeOption.scrollIntoView({ block: "nearest" });
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, selectedIndex, searchResults]);

  return (
    <SDropdown ref={dropdownRef}>
      {searchResults.length === 0 ? (
        <SDropdownOption $isEmpty $isSelected={false}>
          {"검색어가 없습니다"}
        </SDropdownOption>
      ) : (
        searchResults.map((result, index) => (
          <SDropdownOption
            key={index}
            $isEmpty={result.sickNm === ""}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={() => {
              handleDropdownClick(index);
            }}
            $isSelected={index === selectedIndex}
            className={
              index === selectedIndex
                ? "dropdown-option active-option"
                : "dropdown-option"
            }
          >
            <HighlightedText
              text={result.sickNm}
              searchValue={searchValue}
            ></HighlightedText>
          </SDropdownOption>
        ))
      )}
    </SDropdown>
  );
};
const SDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 350px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  overflow-y: auto;
  z-index: 1;
`;

const SHighlight = styled.span`
  color: orange;
`;
interface SDropdownOptionProps {
  $isSelected: boolean;
  $isEmpty: boolean;
}

const SDropdownOption = styled.div<SDropdownOptionProps>`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }

  ${(props) =>
    props.$isSelected &&
    `
    background-color: #f9f9f9;
    font-weight: bold;
  `}

  ${(props) =>
    props.$isEmpty &&
    `
    color: #999; // 그레이색으로 스타일링
  `}
`;
export default RecommendDropDown;
