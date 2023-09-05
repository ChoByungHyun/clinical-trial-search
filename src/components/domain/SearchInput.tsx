import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "assets/search-icon.svg";
import SearchIcon_Fill from "assets/search-fill-icon.svg";

import { CACHE_EXPIRY_MS } from "constants/searchConst";
import RecommendDropDown from "./RecommendDropDown";
import { fetchData } from "util/fetchData";

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
    if (clinicalTrialData) {
      const filteredResults = clinicalTrialData.filter(
        (item: ClinicalTrialData) => item.sickNm.includes(searchValue)
      );
      setSearchResults(filteredResults);
    }
  }, [searchValue, clinicalTrialData]);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }
  function handleSeachValueChange(str: string) {
    setSearchValue(str);
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
      />
      {isFocused && searchValue.length > 0 && (
        <RecommendDropDown
          searchResults={searchResults}
          isFocused={isFocused}
          handleSeachValueChange={handleSeachValueChange}
          handleDropdownClick={(index) => {
            setSearchValue(searchResults[index].sickNm);
            setIsFocused(false);
          }}
        />
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

export default SearchInput;
