import React from "react";
import styled from "styled-components";
import Footer from "./footer/Footer";
import ExtraHeader from "./header/ExtraHeader";
import DefaultHeader from "./header/DefaultHeader";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Layout = ({ children, extraHeader = false }) => {
  return (
    <Page>
      {extraHeader ? <ExtraHeader /> : <DefaultHeader />}
      {children}
      <Footer />
    </Page>
  );
};

export default Layout;
