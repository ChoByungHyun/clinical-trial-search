import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "assets/search-icon.svg";
import SearchIcon_Fill from "assets/search-fill-icon.svg";

import { CACHE_EXPIRY_MS, DEBOUNCE_INTERVAL } from "constants/searchConst";
import RecommendDropDown from "./RecommendDropDown";
import { fetchData } from "util/fetchData";
import { useDebounce } from "hooks/useDebounce";

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

  const debouncedSearchValue = useDebounce(searchValue, DEBOUNCE_INTERVAL);

  useEffect(() => {
    async function fetchDataAndUpdateState() {
      const data = await fetchData();
      if (data) {
        setClinicalTrialData(data);
      }
    }
    fetchDataAndUpdateState();

    const refreshInterval = setInterval(() => {
      fetchDataAndUpdateState();
    }, CACHE_EXPIRY_MS);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  useEffect(() => {
    if (clinicalTrialData && debouncedSearchValue.length > 0) {
      const filteredResults = clinicalTrialData.filter(
        (item: ClinicalTrialData) => item.sickNm.includes(debouncedSearchValue)
      );

      setSearchResults(filteredResults);
    }
  }, [debouncedSearchValue, clinicalTrialData]);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    setIsFocused(true);
    // 검색어가 띄어쓰기로 시작하는 경우 검색 결과 초기화 및 드롭박스 미표시
    if (inputValue.trim() === "" || inputValue.startsWith(" ")) {
      setSearchResults([]);
      setIsFocused(false);
    }
  }
  function handleSeachValueChange(str: string) {
    setSearchValue(str);
    setIsFocused(false);
  }

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
        autoFocus
      />
      {isFocused && searchValue.length > 0 && (
        <RecommendDropDown
          searchResults={searchResults}
          searchValue={searchValue}
          isFocused={isFocused}
          handleSeachValueChange={handleSeachValueChange}
          handleDropdownClick={(index) => {
            setSearchValue(searchResults[index].sickNm);
            setIsFocused(false);
          }}
        />
      )}
      {isFocused ? (
        <SSearchIcon
          $isFocused={isFocused}
          src={SearchIcon_Fill}
          alt="검색아이콘"
        />
      ) : (
        <SSearchIcon $isFocused={isFocused} src={SearchIcon} alt="검색아이콘" />
      )}
    </SLayout>
  );
};
const SSearchIcon = styled.img<{ $isFocused: boolean }>`
  height: 100%;
  border: 1px solid #e6e6e6;
  transition: 0.2s all;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$isFocused ? "var(--gray-400)" : "var(--gray-200)"};
  box-shadow: ${(props) =>
    props.$isFocused
      ? "0px 0px 0px 0px"
      : "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"};
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

export default SearchInput;
