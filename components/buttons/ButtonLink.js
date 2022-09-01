import styled from "styled-components";

const StyledButton = styled.a`
  display: block;
  max-width: ${({ width }) => width || "300px"};
  width: 100%;
  padding: ${({ padding }) => padding || "15px 0"};
  margin: ${({ margin }) => margin || "0"};
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solidb transparent;
  border-radius: 10px;
  text-transform: ${({ ttu }) => (ttu ? "uppercase" : "none")};
  font-size: ${({ fz }) => fz || "25px;"};
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

const ButtonLink = ({
  href,
  onClick,
  content,
  width,
  padding,
  margin,
  ttu = false,
  fz,
}) => {
  return (
    <StyledButton
      href={href}
      onClick={onClick}
      width={width}
      padding={padding}
      margin={margin}
      ttu={ttu}
      fz={fz}
    >
      {content}
    </StyledButton>
  );
};

export default ButtonLink;
