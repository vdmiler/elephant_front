import React from "react";
import styled, { css } from "styled-components";

const Label = styled.label`
  display: block;
  font-weight: 400;
  font-size: ${({ lfz }) => lfz || "20px"} !important;
  line-height: 1em;
  margin-bottom: ${({ lmb }) => lmb || "10px"};
  color: ${({ lc, theme }) => lc || theme.colors.white};
  @media ${({ theme }) => theme.media.mobileM} {
    font-size: 15px !important;
    margin-bottom: 5px;
  }
`;

const inputStyle = css`
  width: 100%;
  min-height: ${({ minHeight }) => minHeight || "138px"};
  padding: ${({ padding }) => padding || "10px 17px;"};
  background-color: #fff;
  border: none;
  border-radius: 5px;
  font-family: "Gilroy", sans-serif;
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize || "15px"};
  line-height: 1.15em;
  color: #333333;
  box-shadow: ${({ isValid }) =>
    isValid ? "none" : "inset 0px 0px 10px rgba(255, 0, 0, 0.7)"};
  ::placeholder {
    color: #9b9b9b;
  }
  @media ${({ theme }) => theme.media.mobileM} {
    font-size: 12px;
  }
`;

const TextareaField = styled.textarea`
  ${inputStyle};
  box-sizing: border-box;
  outline: none;
  resize: none;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const HelpText = styled.div`
  position: absolute;
  font-weight: 400;
  font-size: 8px;
  line-height: 1.1em;
  color: ${({ theme }) => theme.colors.white};
  margin-top: -1px;
`;

export const Textarea = ({
  id,
  label,
  name,
  value = "",
  handleChange = () => {},
  placeholder,
  autoComplete = "none",
  errorMessage,
  validate,

  fontSize,
  minHeight,
  padding,

  lfz,
  lc,
  lmb,
}) => {
  return (
    <>
      {label && (
        <Label htmlFor={id} lfz={lfz} lmb={lmb} lc={lc}>
          {label}
        </Label>
      )}

      <TextareaField
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        isValid={!(errorMessage && validate)}
        fontSize={fontSize}
        minHeight={minHeight}
        padding={padding}
      />
      {errorMessage && validate ? <HelpText>{errorMessage}</HelpText> : <></>}
    </>
  );
};
