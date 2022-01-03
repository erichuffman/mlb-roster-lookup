import * as React from 'react';
import './Select.css';

function Select({
    id,
    label,
    options,
    selected,
    onSelectChange,
    emptyOption = true,
    emptyOptionText = 'Select an option',
    disabled = false
  }) {
  return (
    <div className="select__wrapper">
      <label className="select__label" htmlFor={id}>{label}</label>
      <select className="select" id={id} onChange={onSelectChange} defaultValue={selected} disabled={disabled}>
        {emptyOption && <option value="">{emptyOptionText}</option>}
        {options && options.map(item => (
          <option key={item.id} value={item.value}>{item.text}</option>
        ))}
      </select>
    </div>
  )
}

export default Select;
