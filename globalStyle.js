import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "#0b2d54",
    secondary: "#b4c7d6",
    white: "#fff",
  },
  media: {
    desktopL: "(max-width: 1869.98px)",
    desktopM: "(max-width: 1792.98px)",
    desktop: "(max-width: 1535.98px)",
    laptopM: "(max-width: 1399.98px)",
    laptop: "(max-width: 1199.98px)",
    tablet: "(max-width: 991.98px)",
    mobileM: "(max-width: 767.98px)",
    mobile: "(max-width: 575.98px)",
  },
};

export const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: ${theme.colors.primary};
  padding: 0;
  margin: 0;
  }

  p {
    margin: 0;
  }

  div, p, form, input, a, span, button, ul, li {
    box-sizing: border-box;
  }

  ul, li {
    display: block;
    padding: 0;
    margin: 0;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Glober', sans-serif;
    line-height: 1.2em;
    margin: 0;
  } 

  h1 {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 60px;
    color: ${theme.colors.secondary};
    letter-spacing: 0.2em;
	  text-align: center;
  }

  h2 {
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-weight: 100;
    font-size: 40px;
    text-align: center;
  }

  h3 {
    font-weight: 300;
    font-size: 30px;
  }

  h4 {
    font-size: 26px;
    font-weight: 300;
    text-transform: uppercase;	
    color: #b4c7d6;
  }

  h5 {
	  font-size: 24px;
  }

  h6 {
	  font-size: 20px;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary};
    transition: all .5s ease;
    &:hover,
    &._active {
      color: ${theme.colors.primary};
    }
  }

  input {
    outline: none;
  }
`;
