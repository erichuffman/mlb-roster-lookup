import * as React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;

  select {
    background: none;
    background-color: white;
    border: 2px solid var(--color-gray-mid);
    border-radius: 3px;
    color: var(--color-gray-dk);
    flex: 1 0 100%;
    font-size: 16px;
    padding: 4px;

    &:focus {
      outline-width: 2px;
      outline-color: var(--color-focus);
      outline-offset: 1px;
      outline-style: solid;
    }
  }

  label {
    flex: 1 0 100%;
    font-size: 20px;
    margin-bottom: 4px;

    &.visually-hidden {
      display: block;
      height: 0;
      margin: 0;
      overflow: hidden;
      width: 0;
    }
  }
`

function Select({
    id,
    label,
    options,
    selected,
    onSelectChange,
    emptyOption = true,
    emptyOptionText = 'Select an option',
    disabled = false,
    hiddenLabel = false,
    classes,
  }) {
  return (
    <Wrapper className={classes}>
      <label htmlFor={id} className={hiddenLabel ? 'visually-hidden' : undefined}>{label}</label>
      <select id={id} onChange={onSelectChange} value={selected ? selected : undefined} disabled={disabled}>
        {emptyOption && <option value="">{emptyOptionText}</option>}
        {options && options.map(item => (
          <option key={item.id} value={item.value}>{item.text}</option>
        ))}
      </select>
    </Wrapper>
  )
}

export default Select;
