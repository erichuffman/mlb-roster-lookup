import * as React from 'react';
import styled from 'styled-components/macro';
import { getYearsOld } from '../utils/stringUtils';

const Row = styled.div`
  border-top: 1px solid gray;
  display: flex;

  &[data-position-filtering='true'][data-highlighted='false'] {
    display: none;
  }
`

function Player({info, positionFilter, batsFilter, throwsFilter, cobFilter, yobFilter}) {
  const dobFull = new Date(info.birth_date);
  const dob = `${dobFull.getMonth() + 1}/${dobFull.getDate()}/${dobFull.getFullYear()}`;
  const batsClasses = batsFilter === info.bats ? 'roster__column roster__column--bats active': 'roster__column roster__column--bats';
  const throwsClasses = throwsFilter === info.throws ? 'roster__column roster__column--throws active': 'roster__column roster__column--throws';
  const cobClasses = cobFilter === info.birth_country ? 'roster__column roster__column--country active': 'roster__column roster__column--country';
  const yobClasses = yobFilter === `${getYearsOld(info.birth_date)}` ? 'roster__column roster__column--yob active': 'roster__column roster__column--yob';
  
  return (
    <Row
      data-id={info.player_id}
      data-highlighted={positionFilter === info.primary_position_txt ? 'true' : 'false'}
      data-position-filtering={positionFilter ? 'true' : 'false'}
      data-dob={dobFull}
    >
      <div className="roster__column roster__column--name">
        <a href={`https://mlb.com/player/${info.player_id}`}>{info.name_display_first_last}</a>
      </div>
      <div className='roster__column roster__column--position'>
        {info.primary_position_txt}
      </div>
      <div className={batsClasses}>
        {info.bats}
      </div>
      <div className={throwsClasses}>
        {info.throws}
      </div>
      <div className={cobClasses}>
        {info.birth_country}
      </div>
      <div className={yobClasses} data-dob={info.birth_date}>
        {getYearsOld(info.birth_date)} <div>Birth date: {dob}</div>
      </div>
    </Row>
  )
}

export default Player;
