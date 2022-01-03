import * as React from 'react';
import './Roster.css';

function Roster({roster, season, team}) {
  return (
    <div className="roster">
      <p className="roster__intro">The {season} {team}</p>
      <div className="roster__row roster__row--header">
        <div className="roster__column roster__column--name">Name</div>
        <div className="roster__column">Primary Position</div>
        <div className="roster__column">Bats</div>
        <div className="roster__column">Throws</div>
      </div>
      {roster && roster.map(item => (
        <div className="roster__row" key={item.id}>
          <div className="roster__column roster__column--name">
            {item.name}
          </div>
          <div className="roster__column roster__column--position">
            {item.position}
          </div>
          <div className="roster__column roster__column--bats">
            {item.bats}
          </div>
          <div className="roster__column roster__column--throws">
            {item.throws}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Roster
