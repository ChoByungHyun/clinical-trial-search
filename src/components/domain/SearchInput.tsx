import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchIcon from "assets/search-icon.svg";
import SearchIcon_Fill from "assets/search-fill-icon.svg";
import getClinicalTrial from "api/getClinicalTrial";

const TEM_MINUTE = 600 * 1000; // 10min
const CACHE_EXPIRY_MS = TEM_MINUTE; // 캐시 만료 시간: 10분 (밀리초 단위)

interface ClinicalTrialData {
  sickCd: string;
  sickNm: string;
}

const SearchInput = () => {
  const [clinicalTrialData, setClinicalTrialData] = useState<
    ClinicalTrialData[]
  >([]);
  const [searchResults, setSearchResults] = useState<ClinicalTrialData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  async function fetchData() {
    const cachedData = getCachedData();

    if (!cachedData || isCacheExpired(cachedData.timestamp)) {
      try {
        const response = await getClinicalTrial();
        const newData = response; // 응답에서 data 속성이 유효한지 확인

        if (newData.data.length > 0) {
          setCachedData(newData);
          setClinicalTrialData(newData.data);
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    } else {
      setClinicalTrialData(cachedData.data);
    }
  }
  useEffect(() => {
    fetchData();
    const refreshInterval = setInterval(() => {
      fetchData();
    }, CACHE_EXPIRY_MS);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  useEffect(() => {
    // 검색어에 따라 결과 필터링
    if (clinicalTrialData) {
      const filteredResults = clinicalTrialData.filter(
        (item: ClinicalTrialData) => item.sickNm.includes(searchValue)
      );
      setSearchResults(filteredResults);
    } else {
      fetchData();
    }
  }, [searchValue, clinicalTrialData]);

  // 데이터를 캐시에 저장
  function setCachedData(data: { data: ClinicalTrialData[] }) {
    localStorage.setItem("clinicalTrialData", JSON.stringify(data));
  }

  // 캐시된 데이터를 가져옴
  function getCachedData() {
    const cachedData = localStorage.getItem("clinicalTrialData");
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (!isCacheExpired(timestamp)) {
        return { data, timestamp };
      } else {
        // 캐시가 만료된 경우 로컬 스토리지에서 제거
        localStorage.removeItem("clinicalTrialData");
      }
    }
    return null;
  }

  // 캐시된 데이터의 만료 여부 확인
  function isCacheExpired(timestamp: number) {
    return Date.now() - timestamp > CACHE_EXPIRY_MS;
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      // handleSearchValueCheck();
    }
  }

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
              setSearchValue(searchResults[selectedIndex].sickNm); // 선택한 항목을 입력
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
    <SLayout $isFocused={isFocused}>
      <SSearch
        type="text"
        placeholder="궁금한 임상시험을 검색하세요"
        $isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {isFocused && searchValue.length > 0 && (
        <SDropdown ref={dropdownRef}>
          {searchResults.map((result, index) => (
            <SDropdownOption
              key={index}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                // 결과를 선택한 경우, 선택한 값을 검색 입력란에 설정하고 드롭다운을 닫을 수 있도록 수정
                setSearchValue(result.sickNm);
                setIsFocused(false);
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
      )}
      {isFocused ? (
        <SSearchIcon src={SearchIcon_Fill} alt="검색아이콘" />
      ) : (
        <SSearchIcon src={SearchIcon} alt="검색아이콘" />
      )}
    </SLayout>
  );
};
const SSearchIcon = styled.img`
  position: absolute;
  left: 95%;
  bottom: 30%;
  width: 24px;
  cursor: pointer;
`;

const SLayout = styled.div<{ $isFocused: boolean }>`
  display: flex;
  width: 100%;
  height: 56px;
  position: relative;
`;

const SSearch = styled.input<{ $isFocused: boolean }>`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-size: 14px;
  padding: 6px 20px;
  padding-right: 35px;
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.$isFocused ? "#F68E1D" : "#e6e6e6")};
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s ease-in-out;
  box-shadow: ${(props) =>
    props.$isFocused
      ? "0px 0px 0px 0px"
      : "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"};
  color: #000;
  position: relative;
`;
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

export default SearchInput;
