import styled from "styled-components";
import Container from "@components/container/Container";
import { useRouter } from "next/router";

const StyledHeader = styled.header`
  padding: 60px 0 100px;
  background: url("./images/bg.jpg") no-repeat top center;
`;

const Wrapper = styled.div``;

const Lang = styled.a`
  display: block;
  color: ${({ theme }) => theme.colors.white};
  font-size: 15px;
  width: max-content;
  margin-left: auto;
`;

const Logo = styled.div`
  display: block;
  background: url("./images/logo.svg") no-repeat;
  width: 165px;
  height: 85px;
  margin: 0 auto;
`;

const Offer = styled.div`
  margin-top: 70px;
`;

const OfferTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-family: "Didot", sans-serif;
`;

const OfferLogo = styled.div`
  display: block;
  background: url("./images/logo-1.svg") no-repeat;
  width: 300px;
  height: 70px;
  margin-left: auto;
  margin-right: auto;
`;

const OfferButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 60px;
`;

const OfferButton = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  width: 260px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.4s linear;
  padding: 10px 10px;
  text-align: center;
  font-weight: 300;
  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExtraHeader = () => {
  const router = useRouter();
  return (
    <>
      <StyledHeader>
        <Container>
          <Wrapper>
            <Lang>English</Lang>
            <Logo></Logo>
            <Offer>
              <OfferTitle>Welcome</OfferTitle>
              <OfferLogo></OfferLogo>
              <OfferButtons>
                <OfferButton
                  onClick={() =>
                    router.push({
                      pathname: "/login",
                    })
                  }
                >
                  Sponsorenlogin
                </OfferButton>
                <OfferButton>Gast Login</OfferButton>
                <OfferButton>Onlineauktion</OfferButton>
              </OfferButtons>
            </Offer>
          </Wrapper>
        </Container>
      </StyledHeader>
    </>
  );
};

export default ExtraHeader;
