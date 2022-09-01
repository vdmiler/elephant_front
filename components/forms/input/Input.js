import styled, { css } from "styled-components";

const Label = styled.label`
  display: block;
  font-weight: 400;
  font-size: ${({ lfz }) => lfz || "20px"} !important;
  line-height: 1.17em;
  margin-bottom: ${({ lmb }) => lmb || "10px"};
  color: ${({ lc, theme }) => lc || theme.colors.white};
`;

const inputStyle = css`
  width: 100%;
  min-height: ${({ minHeight }) => minHeight || "40px"};
  padding: ${({ padding }) => padding || "10px"};
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: ${({ fontSize }) => fontSize || "18px"};
  line-height: 1.15em;
  text-align: ${({ textAlign }) => textAlign || "left"};
  color: #333333;
  box-shadow: ${({ isValid }) =>
    isValid ? "none" : "inset 0px 0px 10px rgba(255, 0, 0, 0.7)"};
  margin: 0;
  ::placeholder {
    color: #9b9b9b;
  }
`;

const StyledInput = styled.input`
  ${inputStyle}
`;

const HelpText = styled.div`
  position: absolute;
  font-weight: 400;
  font-size: 8px;
  line-height: 1.1em;
  color: ${({ theme }) => theme.colors.white};
  margin-top: 2px;
`;

export const Input = ({
  id,
  type = "text",
  label,
  name,
  value,
  handleChange = () => {},
  placeholder,
  autoComplete = "none",
  errorMessage,
  validate,

  minHeight,
  padding,
  fontSize,
  textAlign,

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

      <StyledInput
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        isValid={!(errorMessage && validate)}
        minHeight={minHeight}
        padding={padding}
        fontSize={fontSize}
        textAlign={textAlign}
      />
      {errorMessage && validate ? <HelpText>{errorMessage}</HelpText> : <></>}
    </>
  );
};
