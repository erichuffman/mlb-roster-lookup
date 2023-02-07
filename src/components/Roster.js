import * as React from 'react';
import { getYearsOld } from '../utils/stringUtils'
import Select from './Select';
import Player from './Player';
import FilterButton from './FilterButton';
import FilterButtonCollection from './FilterButtonCollection';
import { Main, PlayerTable } from '../styles/Roster.styles';

function Roster({roster, season, team}) {
  // Build an array of positions from the roster.
  const positionsArray = roster
    .map(item => (item.primary_position_txt))
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      [],
    )
    .sort((a, b) => a.localeCompare(b))
    .map(item => ({'active': true, 'text': item}));

  // Handler for the button click of a position.
  const handlePosChange = (item, index) => {
    // Copy positions.
    const posCopy = [...positions];
    // Change the active value of the postion passed in. 
    posCopy[index].active = !item.active;
    // Set up an array to hold the active positions for 
    // the position filter.
    const filteredArray = [];
    posCopy.forEach(item => {
      if (item.active === true) {
        // Push active positions into the array.
        filteredArray.push(item.text);
      }
    });
    // Update the positions list.
    setPositions(posCopy);
    // Update the position filter.
    setPositionFilter(filteredArray);
  };

  const [batsFilter, setBatsFilter] = React.useState(() => (null));
  const [throwsFilter, setThrowsFilter] = React.useState(() => null);
  const [positionFilter, setPositionFilter] = React.useState(() => []);
  const [positions, setPositions] = React.useState(() => positionsArray);
  const [cobFilter, setCobFilter] = React.useState(() => '');
  const [yobFilter, setYobFilter] = React.useState(() => '');
  // Roster alpha sorted by player last name.
  const sortedRoster = roster.sort((a, b) => a.name_last.localeCompare(b.name_last));
  // Roster filterd by postion.
  const sortedFilteredRoster = positionFilter.length > 0 ? sortedRoster
    .filter((item) => (positionFilter.includes(item.primary_position_txt)))
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
    <Main>
      <div className="intro-wrapper">
        <h1>The {season} {team}</h1>
      </div>
      <FilterButtonCollection>
        {/* Add row of checkboxes */}
        {positions.map((item, index) => {
          return (
            <FilterButton 
              text={item.text}
              key={item.text}
              disabled={(positionFilter.length === 1 && positionFilter[0] === item.text) ? true : false}
              status={item.active ? 'active' : 'not-active'}
              setter={() => handlePosChange(item, index)}
           />
          )
        })}
      </FilterButtonCollection>
      <PlayerTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              Primary Position
            </th>
            <th>
              Bats
              <Select 
                id="bats-filter"
                label="Highlight batting:"
                emptyOption={true}
                emptyOptionText="- All -"
                selected={batsFilter}
                options={
                  batsFiltered.map((item, index) => {
                    const value = item !== '' ? item : 'Unknown';
                    return {id: `bats-${index}`, value: value, text: value}
                  })
                }
                disabled={batsFiltered.length > 1 ? false : true}
                onSelectChange={(e) => (setBatsFilter(e.target.value))}
                classes={'bats-select'}
                hiddenLabel={true}
              />
            </th>
            <th>
              Throws
              <Select 
                id="throws-filter"
                label="Highlight throwing:"
                emptyOption={true}
                emptyOptionText="- All -"
                selected={throwsFilter}
                options={
                  throwsFiltered.map((item, index) => {
                    const value = item !== '' ? item : 'Unknown';
                    return {id: `throws-${index}`, value: value, text: value}
                  })
                }
                disabled={throwsFiltered.length > 1 ? false : true}
                onSelectChange={(e) => (setThrowsFilter(e.target.value))}
                classes={'throws-select'}
                hiddenLabel={true}
              />
            </th>
            <th>
              Birth Country
              <Select 
                id="country-filter"
                label="Highlight a Birth Country:"
                emptyOption={true}
                emptyOptionText="- All -"
                selected={cobFilter}
                options={
                  birthCountryFiltered.map((item, index) => {
                    const value = item !== '' ? item : 'Unknown';
                    return {id: `country-${index}`, value: value, text: value}
                  })
                }
                disabled={birthCountryFiltered.length > 1 ? false : true}
                onSelectChange={(e) => (setCobFilter(e.target.value))}
                classes={'cob-select'}
                hiddenLabel={true}
              />
            </th>
            <th>
              Age
              <Select 
                id="age-filter"
                label="Highlight an Age:"
                emptyOptionText="- All -"
                selected={yobFilter}
                options={
                  sortedFilteredRoster
                  .map((item) => {
                    const age = item.birth_date !== '' ? `${getYearsOld(item.birth_date, season)}` : 'Unknown';
                    return age;
                  })
                  .reduce(
                    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
                    [],
                  )
                  .sort((a, b) => a.localeCompare(b))
                  .map((item, index) => (
                    {id: `age-filter-${index}`, value: item, text: item}
                  ))
                }
                disabled={sortedFilteredRoster.length > 1 ? false : true}
                onSelectChange={(e) => (setYobFilter(e.target.value))}
                classes={'age-select'}
                hiddenLabel={true}
              />
            </th>
          </tr>
        </thead>
        <tbody>
        {sortedFilteredRoster.map(item => (
          <Player
            key={item.player_id}
            info={item}
            season={season}
            batsFilter={batsFilter}
            throwsFilter={throwsFilter}
            cobFilter={cobFilter}
            yobFilter={yobFilter}
          />
        ))}
        </tbody>
      </PlayerTable>
    </Main>
  )
}

export default Roster
