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
  *::after { 
    box-sizing: border-box; 
  }

  :root{
    --red: #ff5936;
    --pink: #ff8d9b;
    --yellow: #ffe053;
    --pale-green:#93C68E;
    --deep-green: #396941;
    --green-bean: #93C68E;
    --sky-blue: #AFD2F2;
    --deep-gray: #707070;
    --greenish-grey: #F2F1EA;
    --pale-gray: #DFDFDF;
    --pink:#ff8d9b;
    --yellow:#ffe053;
    --gray: #949494;
    --ivory: #F2F1EA;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'GmarketSansMedium';
  }
  
  ol, ul, li {
    list-style: none;
  }

  p{
    line-height: 1.5rem;
  }
  
  a { 
    color: inherit;
    text-decoration: none; 
    cursor: pointer; 
  }

  button {
    background: none;
    border: 0;
    cursor: pointer;
  }

  img, picture, video { 
    max-width:100%; 
  }
  
  textarea {
    resize: none;
  }

`;

export default GlobalStyle;
