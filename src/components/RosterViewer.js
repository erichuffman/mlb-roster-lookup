import { useEffect, useState } from 'react';
import { fetchRoster, fetchPlayer } from '../utils/mlbEndPoint';
import Select from './Select';
import Roster from './Roster';
import ProgressMessage from './ProgressMessage';
import { teamHistory } from '../utils/teamHistory';
import { teamNameLookup } from '../utils/stringUtils';
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
  const [playerList, setPlayerList] = useState([]);
  const [years, setYears] = useState(null);
  const [status, setStatus] = useState('empty');
  const [positionsList, setPositionsList] = useState([]);

  useEffect(() => {
    if (season && team) {
      fetchRoster(season, team).then(
        data => {
          if (data.roster) {
            setRoster(data.roster);
            setStatus('fetching');
          } else {
            setStatus('not found');
          }
        })
        .catch(error => {
          console.warn('There was an error fetching the roster:', error);
        });
    }
    return function cleanup() {
      setRoster([]);
    }
  }, [season, team]);

  useEffect(() => {
    if (roster.length > 0) {
      roster.forEach((item) => {
        fetchPlayer(item.person.id).then(
          playerData => {
            if (playerData.people.length > 0) {
              const defaultBatThrow = {code: 'U', description: 'Unknown'};
              playerData.people[0].batSide ? 
                playerData.people[0].batsHand =  playerData.people[0].batSide :
                playerData.people[0].batsHand = defaultBatThrow;
              playerData.people[0].pitchHand ? 
                playerData.people[0].throwsHand =  playerData.people[0].pitchHand :
                playerData.people[0].throwsHand = defaultBatThrow;
              playerData.people[0].seasonPosition = item.position;
              setPlayerList((oldPlayer) => [...oldPlayer, {...playerData.people[0]}]);
            }
          }
        )
        .catch(error => {
          console.warn('There was an retrieving player data:', error);
        });
      });
    }
    return function cleanup() {
      setPlayerList([]);
    }
  }, [roster]);

  useEffect(() => {
    if (roster.length > 0) {
      const rosterPositions = roster.map(item => item.position.abbreviation);
      const sortedPositions = ['P','C','1B','2B','3B','SS','LF','CF','RF','OF','DH','TWP']
      const filteredPositions = rosterPositions.map(item => (item))
        .reduce(
          (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
          [],
        );
      const posSorted = filteredPositions.sort((a, b) => sortedPositions.indexOf(a) - sortedPositions.indexOf(b));
      setPositionsList(posSorted.map(item => ({'active': true, 'text': item})));
    }
  }, [roster]);

  useEffect(() => {
    if (roster.length > 0 && playerList.length > 0) {
      if (roster.length === playerList.length) {
        setStatus('roster filled');
      } else {
        setStatus('fetching');
      }
    }
    return function cleanup() {
      setStatus('empty');
    }
  }, [roster, playerList]);

  function handleTeamChange(teamID) {
    setTeam(teamID);
    let startYear;
    let currentYear;
    const yearOptions = [];
    teamOptions.forEach(item => {
      if(item.id === parseInt(teamID)) {
        startYear = item.first_year_of_play;
        currentYear = item.last_year_of_play;
      }
      teamHistory.forEach(team => {
        if (team.id === teamID) {
          startYear = `${team.roster_start}`;
        }
      });
    });
    for (let i = startYear; i <= currentYear; i++) {
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

  function handleSeasonChange(year) {
    setStatus('fetching');
    setSeason(year);
  }

  function provideTeamName(teamID, season) {
    const teamNameDetails = {};
    teamOptions.forEach(item => {
      if(item.id === parseInt(teamID)) {
        teamNameDetails.currentName = item.name;
        teamNameDetails.currentLocation = item.location;
      }
    });
    return teamNameLookup(teamNameDetails, teamID, parseInt(season));
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
            onSelectChange={event => handleSeasonChange(event.target.value)}
          />
        </div>
      </Options>
      <ProgressMessage team={team} season={season} count={playerList.length} status={status} />
      {status === 'roster filled' && <Roster roster={playerList} positionsList={positionsList} season={season} team={provideTeamName(team, season)} />}
    </Main>
  );
}

export default RosterViewer
