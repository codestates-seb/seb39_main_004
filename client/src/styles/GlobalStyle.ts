import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'GmarketSansLight';
    src: url('https://cdn.jsdelivr.net/npm/@noonnu/gmarketsanslight@0.0.1/GmarketSansLight.woff') format('woff')
  }
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/npm/@noonnu/gmarketsansmedium@0.0.1/GmarketSansMedium.woff') format('woff')
  }

  *,
  *::before,
  *::after { box-sizing:border-box; }

  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'GmarketSansMedium';
  }
  
  ol, ul, li {
    list-style:none;
  }

  a { text-decoration:none; cursor:pointer; }

  button {background:none;border:0;cursor:pointer;}

  img, picture, video {max-width:100%;}

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
