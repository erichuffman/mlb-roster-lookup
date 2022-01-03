import { useEffect, useState } from 'react';
import { fetchRoster } from '../utils/mlbEndPoint';
import Select from './Select';
import Roster from './Roster';
import './RosterViewer.css';

function RosterViewer({teamOptions}) {
  const [season, setSeason] = useState(null);
  const [team, setTeam] = useState(null);
  const [roster, setRoster] = useState(null);
  const [years, setYears] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (season && team) {
      setStatus('fetching');
      let nextYear = `${parseInt(season) + 1}`;
      fetchRoster(season, nextYear, team).then(
        data => {
          console.log(data);
          if (data.roster_team_alltime.queryResults.totalSize > 0) { 
            setRoster(data.roster_team_alltime.queryResults.row.map(item => (
              {
                name: item.name_first_last,
                id: item.player_id,
                position: item.primary_position,
                bats: item.bats,
                throws: item.throws,
              }
            )))
          } else {
            setStatus('empty');
            setRoster(null);
          }
        },
      )
      .catch(error => {
        console.warn('There was an error updating the roster:', error);
      });
    } else {
      if (season !== null) { setSeason(null) }
    }
    return function cleanup() {
      setStatus('cleanup');
      setRoster(null);
    }
  }, [season, team]);

  function handleTeamChange(teamID) {
    setTeam(teamID);
    let startYear;
    let currentYear;
    const yearOptions = [];
    teamOptions.forEach(item => {
      if(item.id === teamID) {
        startYear = item.first_year_of_play;
        currentYear = item.last_year_of_play;
      }
    });
    for (let i = parseInt(startYear); i < parseInt(currentYear); i++) {
      yearOptions[i] = {
        id: `year-id-${i}`,
        value: i,
        text: i,
      }
    }
    setYears(yearOptions);
    if (season < startYear) {
      setSeason('');
    }
  };

  function provideTeamName(teamID) {
    let teamName; 
    teamOptions.forEach(item => {
      if(item.id === teamID) {
        teamName = item.text;
      }
    });
    return teamName;
  }

  function StatusMessage({team, season, roster}) {
    return (
      <p className="roster-viewer__status-message">
        {!team && !roster && <em>Select a team.</em>}
        {team && !roster && !season && <em>Select a season.</em>}
        {!roster && status === 'fetching' && <em>Getting roster...</em>}
        {!roster && status === 'empty' && <em>No roster found for {season}.</em>}        
      </p>
    )
  }
  console.log(status, team, season);
  return (
    <div className="roster-viewer">
      <div className="roster-viewer__options">
        <div className="roster-viewer__option-col">
          <Select 
            id="team-options"
            label="Team:"
            selected={team}
            emptyOptionText="Select a team"
            options={teamOptions}
            onSelectChange={event => handleTeamChange(event.target.value)}
          />
        </div>
        <div className="roster-viewer__option-col">
          <Select 
            id="year-options"
            label="Season:"
            emptyOptionText={team ? "Select a season" : "Select a team first"}
            selected={season}
            options={years}
            disabled={team ? false : true}
            onSelectChange={event => setSeason(event.target.value)}
          />
        </div>
      </div>
      <div className="roster-viewer__results">
        <StatusMessage team={team} season={season} roster={roster} />
        {roster && <Roster roster={roster} season={season} team={provideTeamName(team)} />}
      </div>
    </div>
  );
}

export default RosterViewer
