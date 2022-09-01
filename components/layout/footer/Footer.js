import Container from "@components/container/Container";
import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: auto;
  padding: 60px 0;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

const Wrapper = styled.div`
  position: relative;
  &::before {
    content: "";
    display: block;
    width: 260px;
    height: 267px;
    background: url("./images/foodprint.svg") no-repeat;
    position: absolute;
    top: -110%;
    left: 0;
  }
`;

const Quote = styled.div`
  text-align: center;
  p {
    text-transform: uppercase;
    font-weight: 100;
    font-size: 40px;
    color: ${({ theme }) => theme.colors.secondary};
    line-height: 1.2em;
    span {
      font-family: "Glober", sans-serif;
      font-weight: 600;
    }
  }
`;

const BottomList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: 300;
  font-size: 18px;
  margin-top: 50px;
`;

const BottomItem = styled.li`
  a {
    color: ${({ theme }) => theme.colors.white};
    &:hover {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const BottomSeparator = styled(BottomItem)`
  width: 1px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Wrapper>
          <Quote>
            <p>
              We can all leave our <span>footprints</span>
            </p>
            <p>In this world</p>
            <p>
              <span>In one way or another</span>
            </p>
          </Quote>
          <BottomList>
            <BottomItem>
              <p>Claudia K. GmbH</p>
            </BottomItem>
            <BottomSeparator></BottomSeparator>
            <BottomItem>
              <p>Oberer Erlenweg 12</p>
            </BottomItem>
            <BottomSeparator></BottomSeparator>
            <BottomItem>
              <p>8832 Wollerau</p>
            </BottomItem>
            <BottomSeparator></BottomSeparator>
            <BottomItem>
              <a href='tel:0445250200'>044 525 02 00</a>
            </BottomItem>
            <BottomSeparator></BottomSeparator>
            <BottomItem>
              <a href='mailto:c.caroli@heartbeats-tour.com'>
                c.caroli@heartbeats-tour.com
              </a>
            </BottomItem>
          </BottomList>
        </Wrapper>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
