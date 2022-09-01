import Container from "@components/container/Container";
import styled, { css } from "styled-components";

const Section = styled.section`
  text-align: center;
  padding-bottom: 40px;
`;

const titleStyle = css`
  font-size: 60px;
  text-transform: uppercase;
  font-family: "Didot", serif;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const H1 = styled.h1`
  ${titleStyle}
`;

const H2 = styled.h2`
  ${titleStyle}
`;

const SubTitle = styled.p`
  display: inline-block;
  font-size: 30px;
  font-weight: 300;
  margin-top: 20px;
`;

const Entry = ({
  titleType = "h1",
  titleContent = "",
  subtitleContent = "",
}) => {
  return (
    <Section>
      <Container>
        {titleType === "h1" && <H1>{titleContent}</H1>}
        {titleType === "h2" && <H2>{titleContent}</H2>}
        <SubTitle>{subtitleContent}</SubTitle>
      </Container>
    </Section>
  );
};

export default Entry;
