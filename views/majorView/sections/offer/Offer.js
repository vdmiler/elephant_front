import Container from "@components/container/Container";
import React from "react";
import styled from "styled-components";

const Section = styled.section`
  background: url("./images/bg/jpg") no-repeat center top / cover;
  padding: 60px 0 100px;
`;

const Offer = () => {
  return (
    <Section>
      <Container></Container>
    </Section>
  );
};

export default Offer;
