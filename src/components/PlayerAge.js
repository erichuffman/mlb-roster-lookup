import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { getYearsOld } from '../utils/stringUtils';
import styled from 'styled-components/macro';

const AgeInfo = styled.div`
  position: relative;
  width: 100%;

  button {
    align-items: center;
    background: none;
    border: 0;
    color: inherit;
    cursor: pointer;
    display: flex;
    font-size: 1rem;
    justify-content: flex-end;
    padding: 2px;
    margin: 0;
    width: 100%;

    &:focus {
      outline-color: var(--color-bright-blue);
      outline-style: solid;
      outline-offset: 1px;
      outline-width: 2px;
    }
  }

  .age {
    display: flex;
    flex: 1 0 auto;
  }
`;

const Tooltip = styled.span`
  background-color: white;
  box-shadow: 0px 0px 6px 0px var(--color-gray-mid);
  border-radius: 5px;
  color: var(--color-base);
  display: block;
  font-size: 0.85rem;
  min-width: 200px;
  padding: 10px;
  visibility: hidden;

  &[data-show="true"] {
    visibility: visible;
  }

  .arrow {
    align-items: center;
    display: flex;
    height: 20px;
    justify-content: center;
    overflow: hidden;
    right: -10px;
    width: 10px;
    
    &::before {
      background-color: var(--color-gray-dk);
      content: '';
      display: block;
      height: 10px;
      margin-left: -10px;
      width: 10px;
      transform: rotate(45deg);
    }
  }
`;

function PlayerAge({birthDate, deathDate, currentAge, season}) {
  const seasonAge = birthDate ? getYearsOld(birthDate, season) : 'unknown';
  const deceased = deathDate !== null ? new Date(deathDate) : null;
  const todayAge = currentAge < 100 ? `Current age: ${currentAge}` : '';
  const currentAgeOrDeath = deathDate ? `(died in ${deceased.getFullYear()} at ${currentAge} years old)` : todayAge;
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'left',
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
        }
      },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        }
      }
    ],
  });

  const showTooltip = () => {
    popperElement.setAttribute('data-show', true);
  }
 
  const hideTooltip = () => {
    popperElement.removeAttribute('data-show')
  }

  return (
    <>
      {birthDate === null && <em>Unknown</em>}
      {birthDate !== null &&
        <AgeInfo>
          <button
            ref={setReferenceElement}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
          >
            <span className="age">{seasonAge}</span>
          </button>
          <Tooltip ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            Age during the {season} season {currentAgeOrDeath}
            <span ref={setArrowElement} style={styles.arrow} className="arrow" />
          </Tooltip>
        </AgeInfo>
      }
    </>
  )
}

export default PlayerAge;
