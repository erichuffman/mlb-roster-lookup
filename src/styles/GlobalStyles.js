import { createGlobalStyle } from "styled-components/macro";

const GlobalVars = createGlobalStyle`
  :root {
    --color-base: #1b1b1b;
    --color-active: #fff350;
    --color-gray-faint: #f9f9f9;
    --color-gray-xlt: #ececec;
    --color-gray-lt: #d7d7d7;
    --color-gray-mid: #999999;
    --color-gray-dk: #505050;
    --color-success: #3aaf0a;
    --color-error: #db4308;
    --color-loading: #3494d7;
    --color-focus: #4a7bff;
    --color-link: #097cc7;
    --color-faint-blue: #eff7fe;
    --color-lt-blue: #c6e1f9;
    --color-bright-blue: #3d9aec;
    --color-dk-blue: #0b6bc0;
    --color-highlight: #fffde2;
  }
`
const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    color: var(--color-base);
    font-family: sans-serif;
    font-size: 16px;
    line-height: 1.2;
    margin: 0;
  }

  a[href] {
    color: var(--color-link);
    text-decoration: underline;
    
    &:hover {
      text-decoration: none;
    }

    &:focus {
      color: var(--color-focus);
      outline-width: 2px;
      outline-color: var(--color-focus);
      outline-offset: 1px;
      outline-style: solid;
    }
  }
`

export { 
  GlobalVars,
  GlobalStyles
};
