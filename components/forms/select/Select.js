import { useRef, useState } from "react";
import styled from "styled-components";
import useOutsideClick from "@utils/helpers/useOutsideClick.helpers";

const Wrapper = styled.div`
  max-width: ${({ maxWidth }) => maxWidth || "442px"};
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: ${({ margin }) => margin || "0"};
`;

const Label = styled.span`
  display: block;
  font-weight: 400;
  font-size: ${({ lfz }) => lfz || "20px"} !important;
  line-height: 1.17em;
  margin-bottom: ${({ lmb }) => lmb || "10px"};
  color: ${({ lc, theme }) => lc || theme.colors.primary};
`;

const SelectContainer = styled.div`
  width: 100%;
  text-align: left;
  position: relative;
`;

const SelectHeader = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 10px 17px;
  min-height: 40px;
  border-radius: 5px;
  position: relative;
  font-weight: 400;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
`;

const SelectText = styled.div``;

const SelectArrow = styled.div`
  width: 12px;
  height: 6px;
  background: url("/images/select_arrow.svg") center / 100% no-repeat;
  transition: transform 0.5s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(0)" : "rotate(180deg)")};
  cursor: pointer;
  position: absolute;
  right: 18px;
  top: 18px;
`;

const SelectListContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 2;
`;

const SelectList = styled.ul`
  max-width: ${({ maxWidth }) => maxWidth || "442px"};
  width: 100%;
  max-height: 148px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SelectItem = styled.li`
  padding: 10px 17px;
  transition: all 0.5s ease;
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
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

export const Select = ({
  label,
  options = [],
  itemId = 0,
  view = "normal",
  selectPlaceholder = "",
  selectedOption,
  setSelectedOption,

  errorMessage,
  validate,

  maxWidth,
  margin,
  lfz,
  lmb,
  lc,
}) => {
  //hooks
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  //functions
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  return (
    <Wrapper ref={ref} maxWidth={maxWidth} margin={margin}>
      {label && (
        <Label lfz={lfz} lmb={lmb} lc={lc}>
          {label}
        </Label>
      )}

      <SelectContainer view={view}>
        <SelectHeader
          onClick={toggling}
          isOpen={isOpen}
          view={view}
          isValid={!(errorMessage && validate)}
        >
          <SelectText>
            {selectedOption ? selectedOption : selectPlaceholder}
          </SelectText>
          <SelectArrow isOpen={isOpen} view={view}></SelectArrow>
        </SelectHeader>
        {isOpen && (
          <SelectListContainer>
            <SelectList view={view} maxWidth={maxWidth}>
              {options &&
                options.map((option, i) => (
                  <SelectItem
                    key={i + Math.random()}
                    onClick={onOptionClicked(option?.slug)}
                    view={view}
                  >
                    <SelectText>{option?.slug}</SelectText>
                  </SelectItem>
                ))}
            </SelectList>
          </SelectListContainer>
        )}
      </SelectContainer>
      {errorMessage && validate ? <HelpText>{errorMessage}</HelpText> : <></>}
    </Wrapper>
  );
};
