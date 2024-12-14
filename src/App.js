import { useEffect, useState } from 'react';
import { GlobalVars, GlobalStyles } from './styles/GlobalStyles';
import styled from 'styled-components/macro';
import { fetchTeams } from './utils/mlbEndPoint';
import RosterViewer from './components/RosterViewer';

const Disclaimer = styled.p`
  border-top: 1px solid #999999;
  margin: 20px 0 30px;
  padding-top: 20px;
  text-align: center;
`

function App() {
  const [teamOptions, setTeamOptions] = useState(() => {
    return null;
  });

  const copyrightDate = new Date();

  useEffect(() => {
    let date = new Date();
    fetchTeams(date.getFullYear()).then(
      data => {
        setTeamOptions(data.teams
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map(item => (
          {
            id: item.id,
            value: item.id,
            text: item.name,
            name: item.clubName,
            location: item.franchiseName,
            first_year_of_play: parseInt(item.firstYearOfPlay),
            last_year_of_play: item.season,
          }
        )));
      },
    )
    .catch(error => {
      console.warn('There was an error creating the team options:', error);
    });
  }, []);
  return (
    <>
      <GlobalVars />
      <GlobalStyles />
      {teamOptions && <RosterViewer teamOptions={teamOptions} />}
      <Disclaimer><small>Data presented copyright {copyrightDate.getFullYear()} MLB Advanced Media, L.P.<br />Use of any content on this page acknowledges agreement to <a href="http://gdx.mlb.com/components/copyright.txt">their terms</a>.</small></Disclaimer>
    </>
  );
}

export default App;
