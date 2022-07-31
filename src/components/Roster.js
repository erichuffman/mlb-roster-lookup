import * as React from 'react';
import styled from 'styled-components/macro';
import { getYearsOld } from '../utils/stringUtils'
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
    <select value={active} onChange={setter} className={active ? 'active' : ''}>
      {selectOption && <option value=''>- Select -</option>}
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
  const [batsFilter, setBatsFilter] = React.useState(() => (null));
  const [throwsFilter, setThrowsFilter] = React.useState(() => null);
  const [positionFilter, setPositionFilter] = React.useState(() => '');
  const [cobFilter, setCobFilter] = React.useState(() => '');
  const [yobFilter, setYobFilter] = React.useState(() => '');
  // Roster alpha sorted by player last name.
  const sortedRoster = roster.sort((a, b) => a.name_last.localeCompare(b.name_last));
  // Roster filterd by postion.
  const sortedFilteredRoster = positionFilter ? sortedRoster
    .filter((item) => (item.primary_position_txt === positionFilter))
    : sortedRoster;
  // Bats options reduced based on sortedFilteredRoster. 
  const batsFiltered = sortedFilteredRoster.map(item => (item.bats))
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    )
    .sort((a, b) => a.localeCompare(b));
  // Throws options reduced based on sortedFilteredRoster. 
  const throwsFiltered = sortedFilteredRoster.map(item => (item.throws))
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    )
    .sort((a, b) => a.localeCompare(b));
  // Birth country options reduced based on sortedFilteredRoster. 
  const birthCountryFiltered = sortedFilteredRoster.map(item => (item.birth_country))
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    )
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className="roster">
      <p className="roster__intro">The {season} {team}</p>
      <div>
        <DropdownFilter
          options={
            roster
            .map(item => (item.primary_position_txt))
            .reduce(
              (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
              [],
            )
            .sort((a, b) => a.localeCompare(b))
            .map(item => (
              {value: item, text: item}
            ))
          }
          active={positionFilter}
          setter={(e) => (setPositionFilter(e.target.value))}
        />
      </div>
      <div className="roster__row roster__row--filters">
        <div className="roster__column roster__column--name roster__column--filter"></div>
        <div className="roster__column roster__column--filter">
          {batsFiltered.length > 1 && batsFiltered.map(item => {
            if (item !== '') {
              return <ButtonFilter
                key={`bats-${item}`}
                text={item} 
                status={batsFilter === item ? 'active' : ''}
                setter={() => setBatsFilter(batsFilter === item ? null : item)}
              />
            } else {
              return '';
            }
          })}
        </div>
        <div className="roster__column roster__column--filter">
          {throwsFiltered.length > 1 && throwsFiltered.map(item => (
            <ButtonFilter
              key={`throws-${item}`}
              text={item} 
              status={throwsFilter === item ? 'active' : ''}
              setter={() => setThrowsFilter(throwsFilter === item ? null : item)}
            />
          ))}
        </div>
        <div className="roster__column roster__column--filter">
         {birthCountryFiltered.length > 1 && <DropdownFilter
            options={
              birthCountryFiltered.map(item => (
                {value: item, text: item}
              ))
            }
            active={cobFilter}
            setter={(e) => (setCobFilter(e.target.value))}
          />}
        </div>
        <div className="roster__column roster__column--filter">
          <DropdownFilter
            options={
              sortedFilteredRoster
              .map((item) => {
                return `${getYearsOld(item.birth_date)}`;
              })
              .reduce(
                (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
                [],
              )
              .sort((a, b) => a.localeCompare(b))
              .map(item => (
                {value: item, text: item}
              ))
            }
            active={yobFilter}
            setter={(e) => (setYobFilter(e.target.value))}
          />
        </div>
      </div>
      <div className="roster__row roster__row--header">
        <div className="roster__column roster__column--name">Name</div>
        <div className="roster__column">Primary Position</div>
        <div className="roster__column">Bats</div>
        <div className="roster__column">Throws</div>
        <div className="roster__column"><span className="roster__column-info" title="Country of birth">Birth Country</span></div>
        <div className="roster__column"><span className="roster__column-info" title="Year of birth">Age Today</span></div>
      </div>
      {sortedFilteredRoster.map(item => (
        <Player
          key={item.player_id}
          info={item}
          positionFilter={positionFilter}
          batsFilter={batsFilter}
          throwsFilter={throwsFilter}
          cobFilter={cobFilter}
          yobFilter={yobFilter}
        />
      ))}
    </div>
  )
}

export default Roster
