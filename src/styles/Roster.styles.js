import styled from "styled-components/macro";
import { widths } from './Breakpoints';

const Main = styled.main`
  border-top: 1px solid var(--color-gray-mid);
  margin-top: 16px;
  padding-top: 16px;
  
  .intro-wrapper {
    display: flex;
    flex-wrap: wrap;

    @media (min-width: ${widths.md}) {
      align-items: center;
    }
  }
  
  h1 {
    font-size: 24px;
    flex: 1 0 100%;
    line-height: 1.1;
    margin: 0 0 16px;
    text-align: center;
    
    @media (min-width: ${widths.md}) {
      font-size: 28px;
    }
  }

  .position-filter {
    flex: 1 0 100%;

    @media (min-width: ${widths.md}) {
      flex: 1 0 auto;
      flex-wrap: nowrap;
    }
  }

  .position-filter label {
    flex: 0 1 auto;
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    margin: 0 8px 0 0;
    text-transform: uppercase;
  }

  .position-filter select {
    flex: 1 1 auto;

    @media (min-width: ${widths.md}) {
      flex: 0 1 auto;
    }
  }
`

const PlayerTable = styled.table`
  border: 1px solid var(--color-gray-mid);
  border-collapse: collapse;
  margin: 16px 0;
  width: 100%;

  th {
    background-color: var(--color-gray-xlt);
    box-shadow: inset 0px 0px 0px 1px var(--color-gray-mid);
    padding: 12px;

    @media (min-width: 768px) {
      position: sticky;
      top: -1px;
      z-index: 2;
    }
  }

  td {
    border: 1px solid var(--color-gray-mid);
    padding: 12px;
  }

  td:first-child {
    font-weight: bold;
  }
`

export {
  Main,
  PlayerTable,
}
