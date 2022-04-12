import * as React from 'react';
import styled from 'styled-components/macro';
import Player from './Player';
import './Roster.css';

const FilterButton = styled.button`
  background-color: ${props => props.status === 'active' ? 'var(--color-active)' : 'white'};
  border: 2px solid darkolivegreen;
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
  margin: 0 5px;
  padding: 5px 10px;
`

function ButtonFilter({text, status, setter}) {
  return (
    <FilterButton status={status} onClick={setter}>
      { text }
    </FilterButton>
  );
}

function DropdownFilter({options, active, selectOption = true, setter}) {

  return (
    <select value={active} onChange={setter}>
      {selectOption && <option>- Select -</option>}
      {options.map(item => (
        <option
          defaultValue={item.value}
          key={item.value}
        >
          {item.text}
        </option>
      ))}
    </select>
  )
}

function Roster({roster, season, team}) {
  const [batsFilter, setBatsFilter] = React.useState(() => (''));
  const [throwsFilter, setThrowsFilter] = React.useState(() => '');
  const [positionFilter, setPositionFilter] = React.useState(() => '');

  return (
    <div className="roster">
      <p className="roster__intro">The {season} {team}</p>
      <div className="roster__row roster__row--header">
        <div className="roster__column roster__column--name">Name</div>
        <div className="roster__column">Primary Position</div>
        <div className="roster__column">Bats</div>
        <div className="roster__column">Throws</div>
        <div className="roster__column"><span className="roster__column-info" title="Country of birth">Country</span></div>
        <div className="roster__column"><span className="roster__column-info" title="Year of birth">YoB</span></div>
      </div>
      <div className="roster__row roster__row--filters">
        <div className="roster__column roster__column--name roster__column--filter"></div>
        <div className="roster__column roster__column--filter">
          <DropdownFilter
            options={[
              {value: 'P', text: 'P'},
              {value: 'C', text: 'C'},
              {value: '1B', text: '1B'},
              {value: '2B', text: '2B'},
              {value: '3B', text: '3B'},
              {value: 'SS', text: 'SS'},
              {value: 'LF', text: 'LF'},
              {value: 'CF', text: 'CF'} ,
              {value: 'RF', text: 'RF'},
            ]}
            active={positionFilter}
            setter={(e) => (setPositionFilter(e.target.value))}
          />
        </div>
        <div className="roster__column roster__column--filter">
          <ButtonFilter 
            text={'L'} 
            status={batsFilter === 'L' ? 'active' : ''}
            setter={() => setBatsFilter(batsFilter === 'L' ? null : 'L')}
          />
          <ButtonFilter 
            text={'R'} 
            status={batsFilter === 'R' ? 'active' : ''}
            setter={() => setBatsFilter(batsFilter === 'R' ? null : 'R')}
          />
        </div>
        <div className="roster__column roster__column--filter">
          <ButtonFilter 
            text={'L'} 
            status={throwsFilter === 'L' ? 'active' : ''}
            setter={() => setThrowsFilter(throwsFilter === 'L' ? null : 'L')}
          />
          <ButtonFilter 
            text={'R'} 
            status={throwsFilter === 'R' ? 'active' : ''}
            setter={() => setThrowsFilter(throwsFilter === 'R' ? null : 'R')}
          />
        </div>
        <div className="roster__column roster__column--filter">{/* country filter*/}</div>
        <div className="roster__column roster__column--filter">
          {/* YoB filter*/}
        </div>
      </div>
      {roster.map(item => (
        <div className="roster__row" key={item.id}>
          <Player
            info={item}
            positionFilter={positionFilter}
            batsFilter={batsFilter}
            throwsFilter={throwsFilter}
          />
        </div>
      ))}
    </div>
  )
}

export default Roster
