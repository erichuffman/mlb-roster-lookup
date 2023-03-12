import { useEffect, useState } from 'react';
import { fetchRoster, fetchPlayer } from '../utils/mlbEndPoint';
import Select from './Select';
import Roster from './Roster';
import ProgressMessage from './ProgressMessage';
import { teamHistory } from '../utils/teamHistory';
import styled from 'styled-components/macro';
import { widths } from '../styles/Breakpoints';

const Main = styled.div`
  max-width: 1040px;
  margin: 20px auto;
  padding: 0 20px;
`
const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  .column {
    flex: 1 0 100%;

    @media (min-width: ${widths.md}) {
      flex: 1 0 49%;
    }
  }
`

function RosterViewer({teamOptions}) {
  const [season, setSeason] = useState(null);
  const [team, setTeam] = useState(null);
  const [roster, setRoster] = useState([]);
  const [years, setYears] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (season && team) {
      setStatus('fetching');
      let nextYear = `${parseInt(season) + 1}`;
      fetchRoster(season, nextYear, team).then(
        data => {
          if (data.roster_team_alltime.queryResults.totalSize !== '0') {
            const roster = data.roster_team_alltime.queryResults.row;
            roster.forEach((item, index) => {
              fetchPlayer(item.player_id).then(
                data => {
                  if (data.player_info.queryResults.totalSize !== '0') {
                    setRoster((oldRoster) => [...oldRoster, {...data.player_info.queryResults.row}]);
                    if ((index + 1) === roster.length) {
                      setStatus('roster filled');
                    }
                  }
                },
              )
              .catch(error => {
                console.warn('There was an retrieving player data:', error);
              });
            });
          } else {
            setStatus('empty');
            setRoster([]);
          }
        },
        )
        .catch(error => {
          console.warn('There was an error updating the roster:', error);
        });
      } else {
        setSeason(null);
      }
    return function cleanup() {
      setStatus(null);
      setRoster([]);
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
    setYears(yearOptions.reverse());
    if (season < startYear) {
      setSeason('');
    }
  };

  function provideTeamName(teamID, season) {
    let teamName = null;
    let teamLocation = null;
    const year = parseInt(season);
    teamOptions.forEach(item => {
      if(item.id === teamID) {
        teamName = item.text;
      }
    });
    teamHistory.forEach(team => {
      if (team.id === teamID) {
        team.names.forEach(name => {
          if (year >= name.start && year <= name.end) {
            if (name.name !== team.current_name) {
              teamName = `${team.current_name} [${name.name}]`;
            }
            if (name.location !== team.current_location) {
              teamLocation = name.location;
            }
          }
        })
      }
    });
    if (teamLocation) {
      return `[${teamLocation}] ${teamName}`
    }
    else {
      return teamName;
    }
  }

  return (
    <Main>
      <Options>
        <div className="column">
          <Select 
            id="team-options"
            label="Team:"
            selected={team}
            emptyOptionText="Select a team"
            options={teamOptions}
            onSelectChange={event => handleTeamChange(event.target.value)}
          />
        </div>
        <div className="column">
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
      </Options>
      <ProgressMessage team={team} season={season} count={roster.length} status={status} />
      {roster.length > 0 && status === 'roster filled' && <Roster roster={roster} season={season} team={provideTeamName(team, season)} />}
    </Main>
  );
}

export default RosterViewer
