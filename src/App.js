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

  useEffect(() => {
    let date = new Date();
    fetchTeams(date.getFullYear()).then(
      data => {
        setTeamOptions(data.team_all_season.queryResults.row?.map(item => (
          {
            id: item.mlb_org_id,
            value: item.mlb_org_id,
            text: item.name_display_brief,
            first_year_of_play: item.first_year_of_play,
            last_year_of_play: item.last_year_of_play,
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
      <Disclaimer><small>Data copyright by MLB Advanced Media, L.P. Hat tip to the <a href="https://appac.github.io/mlb-data-api-docs/">MLB Data API Docs</a> from <a href="https://appac.github.io/">Chris Apparicio</a>.</small></Disclaimer>
    </>
  );
}

export default App;
