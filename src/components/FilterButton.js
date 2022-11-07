import * as React from 'react';
import styled from 'styled-components/macro';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Button = styled.button`
  align-items: center;
  background-color: ${props => props.status === 'active' ? 'var(--color-bright-blue)' : 'var(--color-lt-blue)'};
  border: 2px solid var(--color-dk-blue);
  border-radius: 3px;
  color: ${props => props.status === 'active' ? 'white' : 'var(--color-bright-blue)'};
  cursor: pointer;
  display: inline-flex;
  font-size: 18px;
  justify-content: center;
  line-height: 1.1;
  margin: 5px;
  overflow: hidden;
  padding: 5px 15px;
  position: relative;

  &:focus {
    outline-color: var(--color-bright-blue);
    outline-style: solid;
    outline-offset: 1px;
    outline-width: 2px;
  }

  .icon {
    margin-right: 5px;
  }

  .full-text {
    height: 0;
    left: -1000em;
    position: absolute;
    width: 0;
  }
`;

function FilterButton({text, fullText, disabled, status, setter}) {
  return (
    <Button status={status} onClick={setter} disabled={disabled ? true : false}>
      <span className='icon'>
        {status === 'active' && <FaCheckCircle />}
        {status === 'not-active' && <FaRegCircle />}
      </span>
      <strong>{ text }</strong> <span className="full-text">{fullText}</span>
    </Button>
  );
}

export default FilterButton;
