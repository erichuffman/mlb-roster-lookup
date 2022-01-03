import { useEffect, useState } from 'react';
import { fetchTeams } from './utils/mlbEndPoint';
import RosterViewer from './components/RosterViewer';

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
            text: item.name_display_full,
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
      <RosterViewer teamOptions={teamOptions} />
      <p className="disclaimer"><small>Data copyright by MLB Advanced Media, L.P. Hat tip to the <a href="https://appac.github.io/mlb-data-api-docs/">MLB Data API Docs</a> from <a href="https://appac.github.io/">Chris Apparicio</a>.</small></p>
    </>
  );
}

export default App;
