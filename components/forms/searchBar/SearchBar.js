import useOutsideClick from "@utils/helpers/useOutsideClick.helpers";
import { useState, useRef } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-weight: 400;
  font-size: ${({ lfz }) => lfz || "20px"} !important;
  line-height: 1.17em;
  margin-bottom: ${({ lmb }) => lmb || "10px"};
  color: ${({ lc, theme }) => lc || theme.colors.white};
  @media ${({ theme }) => theme.media.mobileM} {
    font-size: 15px !important;
    margin-bottom: 5px;
  }
`;

const ItemContainer = styled.div``;

const inputStyle = css`
  width: 100%;
  min-height: ${({ minHeight }) => minHeight || "40px"};
  padding: ${({ padding }) => padding || "10px 17px;"};
  background-color: #fff;
  border: none;
  border-radius: 5px;
  font-family: "Gilroy", sans-serif;
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize || "15px"};
  line-height: 1.15em;
  text-align: ${({ textAlign }) => textAlign || "left"};
  color: #333333;
  box-shadow: ${({ isValid }) =>
    isValid ? "none" : "inset 0px 0px 10px rgba(255, 0, 0, 0.7)"};
  margin: 0;
  ::placeholder {
    color: #9b9b9b;
  }
  @media ${({ theme }) => theme.media.mobileM} {
    font-size: 12px;
  }
`;

const StyledInput = styled.input`
  ${inputStyle}
`;

const FilterContainer = styled.div`
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  position: absolute;
  top: 105%;
  left: 0;
  width: 100%;
  z-index: 2;
`;

const FilterList = styled.ul`
  max-width: ${({ maxWidth }) => maxWidth || "442px"};
  width: 100%;
  max-height: 148px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  @media (max-width: 1564.98px) {
    max-width: initial;
  }
`;

const FilterItem = styled.li`
  padding: 10px 17px;
  transition: all 0.5s ease;
  font-weight: 400;
  font-size: 15px;
  color: #333333;
  @media ${({ theme }) => theme.media.mobileM} {
    font-size: 12px;
  }
  cursor: pointer;
  &:hover {
    background-color: rgba(32, 216, 180, 0.1);
  }
`;

const HelpText = styled.div`
  position: absolute;
  font-weight: 400;
  font-size: 8px;
  line-height: 1.1em;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 2px;
`;

export const SearchBar = ({
  id,
  label,
  name,
  searchValue,
  handleSearch,
  placeholder,
  autoComplete = "none",
  errorMessage,
  validate,

  incomingData,

  minHeight,
  padding,
  fontSize,
  textAlign,

  lfz,
  lc,
  lmb,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const refOutside = useRef();

  const handleFilter = (e) => {
    handleSearch(e.target.value);
    const searchItem = e.target.value;
    const newFilter = incomingData.filter(({ value }) => {
      return value.toLowerCase().includes(searchItem.toLowerCase());
    });
    if (searchItem === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  useOutsideClick(refOutside, () => {
    setFilteredData([]);
  });
  return (
    <Wrapper ref={refOutside}>
      {label && (
        <Label htmlFor={id} lfz={lfz} lmb={lmb} lc={lc}>
          {label}
        </Label>
      )}
      <ItemContainer>
        <StyledInput
          id={id}
          type='text'
          name={name}
          value={searchValue}
          onChange={handleFilter}
          onFocus={() => setFilteredData(incomingData)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          isValid={!(errorMessage && validate)}
          minHeight={minHeight}
          padding={padding}
          fontSize={fontSize}
          textAlign={textAlign}
        />
      </ItemContainer>
      {filteredData.length !== 0 && (
        <FilterContainer>
          <FilterList>
            {filteredData &&
              filteredData.slice(0, 15).map(({ id, value }) => {
                return (
                  <FilterItem
                    onClick={() => handleSearch(value)}
                    key={id + Math.random()}
                  >
                    {value}
                  </FilterItem>
                );
              })}
          </FilterList>
        </FilterContainer>
      )}

      {errorMessage && validate ? <HelpText>{errorMessage}</HelpText> : <></>}
    </Wrapper>
  );
};
