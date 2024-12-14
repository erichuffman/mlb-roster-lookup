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
  const batsClasses = ((batsFilter === info.batsHand.code && info.batsHand.code !== '') || (batsFilter === 'Unknown' && info.batsHand.code === '')) ? 'active': '';
  const throwsClasses = ((throwsFilter === info.throwsHand.code && info.throwsHand.code !== '') || (throwsFilter === 'Unknown' && info.throwsHand.code === '')) ? 'active': '';
  const cobClasses = ((cobFilter === info.birthCountry && info.birthCountry !== '') || (cobFilter === 'Unknown' && info.birthCountry === '')) ? 'active': '';
  const yobClasses = ((yobFilter === `${getYearsOld(info.birthDate, season)}` && info.birthDate !== '') || (yobFilter === 'Unknown' && info.birthDate === ''))? 'active': '';
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
      data-id={info.id}
      data-active={rowStatus}
      data-highlighting={highlightingStatus}
      data-dob={info.birthDate !== '' ? info.birthDate : 'Unknown'}
    >
      <td data-header="name">
        <a href={`https://mlb.com/player/${info.id}`}>{info.nameFirstLast}</a>
      </td>
      <td data-header="position">
        {info.seasonPosition.abbreviation}
      </td>
      <td className={batsClasses} data-header="bats">
        {info.batsHand !== '' ? info.batsHand.code : <em>Unknown</em>}
      </td>
      <td className={throwsClasses} data-header="throws">
        {info.throwsHand !== '' ? info.throwsHand.code : <em>Unknown</em>}
      </td>
      <td className={cobClasses} data-header="birth country">
        {info.birthCountry !== '' ? info.birthCountry : <em>Unknown</em>}
      </td>
      <td className={yobClasses} data-header="age">
        <PlayerAge
          birthDate={info.birthDate ? info.birthDate : null}
          deathDate={info.deathDate ? info.deathDate : null}
          currentAge={info.currentAge ? info.currentAge : null }
          season={season}
        />
      </td>
    </Row>
  )
}

export default Player;
