import styled from "styled-components";

const StyledButton = styled.button`
  display: block;
  max-width: ${({ width }) => width || "300px"};
  width: 100%;
  padding: ${({ padding }) => padding || "15px 0"};
  margin: ${({ margin }) => margin || "0"};
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid transparent;
  border-radius: 10px;
  text-transform: ${({ ttu }) => (ttu ? "uppercase" : "none")};
  font-weight: 300;
  font-size: ${({ fz }) => fz || "18px;"};
  line-height: 1.2em;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover,
  &:active {
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = ({
  onClick,
  content,
  width,
  padding,
  margin,
  ttu = false,
  fz,
  disabled,
}) => {
  return (
    <StyledButton
      type='button'
      onClick={onClick}
      width={width}
      padding={padding}
      margin={margin}
      ttu={ttu}
      fz={fz}
      disabled={disabled}
    >
      {content}
    </StyledButton>
  );
};

export default Button;
