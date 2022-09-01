import styled from "styled-components";

const Wrapp = styled.label`
  display: inline-block;
  margin: ${({ margin }) => margin || "0px"};
  cursor: pointer;
`;

const Input = styled.span`
  display: inline-block;
  position: relative;
  padding-left: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
  &::before {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-sizing: border-box;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  &::after {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 2px;
    opacity: 0;
    transition: 0.2s;
  }
`;

const InputDisabled = styled.input`
  display: none;
  &:checked + ${Input}::after {
    opacity: 1;
  }
`;

export const RadioButton = ({
  label = "",
  name = "",
  value = "",
  state,

  handleChange = () => {},

  margin,
}) => {
  return (
    <Wrapp margin={margin}>
      <InputDisabled
        type='radio'
        name={name}
        value={value}
        defaultChecked={state === value}
        onChange={handleChange}
      />
      <Input>{label}</Input>
    </Wrapp>
  );
};
