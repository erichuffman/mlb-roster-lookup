import * as React from 'react';
import styled from 'styled-components/macro';
import { getYearsOld } from '../utils/stringUtils';
import PlayerAge from './PlayerAge';

const Row = styled.tr`
  border-top: 1px solid gray;

  td.active {
    background-color: var(--color-bright-blue);
    border-color: white;
    color: white;
  }
`

function Player({info, season, batsFilter, throwsFilter, cobFilter, yobFilter}) {
  const batsClasses = ((batsFilter === info.bats && info.bats !== '') || (batsFilter === 'Unknown' && info.bats === '')) ? 'active': '';
  const throwsClasses = ((throwsFilter === info.throws && info.throws !== '') || (throwsFilter === 'Unknown' && info.throws === '')) ? 'active': '';
  const cobClasses = ((cobFilter === info.birth_country && info.birth_country !== '') || (cobFilter === 'Unknown' && info.birth_country === '')) ? 'active': '';
  const yobClasses = ((yobFilter === `${getYearsOld(info.birth_date, season)}` && info.birth_date !== '') || (yobFilter === 'Unknown' && info.birth_date === ''))? 'active': '';
  const rowStatus = (
    batsClasses === 'active' ||
    throwsClasses === 'active' ||
    cobClasses === 'active' ||
    yobClasses === 'active'
  ) ? 'true' : 'false';

  const highlightingStatus = (
    batsFilter ||
    throwsFilter ||
    cobFilter ||
    yobFilter 
  ) ? true : false;

  return (
    <Row
      data-id={info.player_id}
      data-active={rowStatus}
      data-highlighting={highlightingStatus}
      data-dob={info.birth_date !== '' ? info.birth_date : 'Unknown'}
    >
      <td data-header="name">
        <a href={`https://mlb.com/player/${info.player_id}`}>{info.name_display_first_last}</a>
      </td>
      <td data-header="position">
        {info.primary_position_txt}
      </td>
      <td className={batsClasses} data-header="bats">
        {info.bats !== '' ? info.bats : <em>Unknown</em>}
      </td>
      <td className={throwsClasses} data-header="throws">
        {info.throws !== '' ? info.throws : <em>Unknown</em>}
      </td>
      <td className={cobClasses} data-header="birth country">
        {info.birth_country !== '' ? info.birth_country : <em>Unknown</em>}
      </td>
      <td className={yobClasses} data-header="age">
        <PlayerAge
          birthDate={info.birth_date}
          deathDate={info.death_date}
          currentAge={info.age}
          season={season}
        />
      </td>
    </Row>
  )
}

export default Player;
