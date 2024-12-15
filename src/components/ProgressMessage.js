import * as React from 'react';
import styled from 'styled-components/macro';
import { FaSyncAlt, FaRegCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Message = styled.p`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 16px 0 0;
  min-height: 24px;
  overflow: hidden;
  transition: min-height 250ms ease-out;
  width: 100%;

  &.done {
    min-height: 0;
    max-height: 0;
  }

  .progress-ball,
  .progress-text {
    opacity: 1;
  }

  .progress-ball.done,
  .progress-ball.done + .progress-text {
    opacity: 0;
  }

  .progress-text {
    font-size: 16px;
    line-height: 1;
    margin-left: 5px;
  }

  .progress-ball {
    height: 24px;
    width: 24px;
    
    &.setting {
      display: none;
    }

    &.loading,
    &.done,
    &.error {
      display: flex;
    }

    svg {
      display: none;
    }

    &.done > .success-icon {
      display: block;
    }

    &.error > .error-icon {
      display: block;
    }

    &.loading > .loading-icon {
      display: block;
    }
  }
  
  @keyframes loader {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }

  .success-icon,
  .error-icon,
  .loading-icon {
    height: 100%;
    width: 100%;
  }

  .success-icon {
    color: var(--color-success);
  }

  .error-icon {
    color: var(--color-error);
  }

  .loading-icon {
    color: var(--color-loading);
    animation: loader 2s infinite linear;
  }
`

function ProgressMessage({team, season, count, status}) {
  let text = '';
  let display = '';
  if (!team && !season && count === 0) {
    text = 'Select a team.';
  }
  if (team && count === 0 && !season) {
    text = 'Select a season.';
  }
  if (team && season && count === 0  && status === 'not found') {
    text = `No roster found for ${season}.`;
    display = 'error';
  }
  if (status === 'fetching') {
    text = 'Loading roster...';
    display = 'loading';
  }
  if (status === 'roster filled') {
    text = 'Done';
    display = 'done';
  }
  return (
    <Message className={display}>
      <span className={`progress-ball ${display}`}>
        <FaSyncAlt className="loading-icon"/>
        <FaRegCheckCircle className="success-icon"/>
        <FaExclamationCircle className="error-icon"/>
      </span>
      <span className='progress-text'>
        {text}
      </span>
    </Message>
  )
}

export default ProgressMessage;
