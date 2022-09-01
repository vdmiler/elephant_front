import styled from "styled-components";
import { menuData } from "@utils/constants/menuData.constants";
import Image from "next/image";

const Wrapper = styled.nav`
  padding: 20px 40px;
  border-left: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  top: 0;
  right: ${({ state }) => (state === "entered" ? "0" : "-100%")};
  z-index: 3;
  width: 35%;
  height: 100%;
  transition: all 0.5s ease;
`;

const CloseMenu = styled.div`
  margin-bottom: 40px;
  cursor: pointer;
`;

const Menu = styled.ul``;

const MenuItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const MenuLink = styled.a`
  border-top: 1px solid ${({ theme }) => theme.colors.primary};
  padding-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.5s ease;
`;

const InfoWrapper = styled.div`
  margin-top: 40px;
`;

const Logo = styled.div``;

const Contacts = styled.div`
  margin-top: 20px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  > p:not(:last-child),
  > a:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ContactName = styled.p``;

const ContactLink = styled.a``;

const BurgerMenu = ({ state, isOpen, setIsOpen }) => {
  return (
    <Wrapper state={state}>
      <CloseMenu onClick={() => setIsOpen(!isOpen)}>
        <Image
          src='/images/close.svg'
          alt='Close Menu'
          width={20}
          height={20}
        />
      </CloseMenu>
      <Menu>
        {menuData &&
          menuData.map((item, i) => {
            return (
              <MenuItem key={item.id + Math.random()}>
                <MenuLink href={item.path}>{item.label}</MenuLink>
              </MenuItem>
            );
          })}
      </Menu>
      <InfoWrapper>
        <Logo>
          <Image
            src='/images/claudia-logo.svg'
            alt='Kevents in motion'
            width={260}
            height={104}
          />
        </Logo>
        <Contacts>
          <ContactName>Claudia K. GmbH</ContactName>
          <ContactLink href='tel:0445250200'>044 525 02 00</ContactLink>
          <ContactLink href='mailto:c.caroli@heartbeats-tour.com'>
            c.caroli@heartbeats-tour.com
          </ContactLink>
        </Contacts>
      </InfoWrapper>
    </Wrapper>
  );
};

export default BurgerMenu;
