import * as React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  flex-wrap: wrap;

  .label {
    text-transform: uppercase;
  }
`

function HighlightBox({children, label}) {

  return (
    <Wrapper>
      {label && <div className="label">{label}</div>}
      {children}
    </Wrapper>
  )
}

export default HighlightBox;
