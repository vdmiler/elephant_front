import styled from "styled-components";
import Container from "@components/container/Container";
import Image from "next/image";
import { useState } from "react";
import { Transition } from "react-transition-group";
import BurgerMenu from "./burgerMenu/BurgerMenu";

const StyledHeader = styled.header`
  padding: 100px 0 40px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Logo = styled.div``;

const BurgerButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  width: 30px;
  height: 20px;
  cursor: pointer;
  span,
  span::before,
  span::after {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -1px;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
  span {
    &::before,
    &::after {
      content: "";
      display: block;
      transition: 0.5s;
    }
    &::before {
      transform: translateY(-10px);
    }
    &::after {
      transform: translateY(10px);
    }
  }
`;

const DefaultHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <StyledHeader>
        <Container>
          <Wrapper>
            <Logo>
              <Image
                src='/images/logo-2.svg'
                alt='Elephant Parade'
                width={165}
                height={86}
              />
            </Logo>
            <BurgerButton onClick={() => setIsOpen(!isOpen)}>
              <span></span>
            </BurgerButton>
          </Wrapper>
        </Container>
      </StyledHeader>
      <Transition in={isOpen} timeout={300}>
        {(state) => (
          <BurgerMenu state={state} isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </Transition>
    </>
  );
};

export default DefaultHeader;
