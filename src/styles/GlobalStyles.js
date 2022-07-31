import { createGlobalStyle } from "styled-components/macro";

const GlobalVars = createGlobalStyle`
  :root {
    --color-base: #1b1b1b;
    --color-active: #fff350;
    --color-gray-xlt: #f2f2f2;
    --color-gray-lt: #d7d7d7;
    --color-gray-mid: #999999;
    --color-gray-dk: #505050;
    --color-success: #3aaf0a;
    --color-error: #db4308;
    --color-loading: #3494d7;
  }
`
const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    color: var(--color-base);
    font-family: sans-serif;
    font-size: 1.6rem;
    line-height: 1.2;
    margin: 0;
  }
`

export { 
  GlobalVars,
  GlobalStyles
};
