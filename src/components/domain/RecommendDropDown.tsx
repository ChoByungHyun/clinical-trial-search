import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Interface for ClinicalTrialData
interface ClinicalTrialData {
  sickCd: string;
  sickNm: string;
}

// Interface for DropdownProps
interface DropdownProps {
  searchResults: ClinicalTrialData[];
  isFocused: boolean;
  handleDropdownClick: (index: number) => void;
  handleSeachValueChange: (str: string) => void;
}

const RecommendDropDown: React.FC<DropdownProps> = ({
  searchResults,
  handleDropdownClick,
  isFocused,
  handleSeachValueChange,
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
      {searchResults.map((result, index) => (
        <SDropdownOption
          key={index}
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
          {result.sickNm}
        </SDropdownOption>
      ))}
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
  color: #f68e1d;
`;
interface SDropdownOptionProps {
  $isSelected: boolean;
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
`;

export default RecommendDropDown;
