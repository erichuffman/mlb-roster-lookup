import * as React from 'react';
import { fetchPlayer } from '../utils/mlbEndPoint'

function CoBLookup({id}) {
  const [country, setCountry] = React.useState(null);

  React.useEffect(() => {
    fetchPlayer(id).then(
      data => {
        if (data.player_info.queryResults.totalSize !== 0) {
          const result = data.player_info.queryResults.row;
          setCountry(result.birth_country);
        }
      },
    )
    .catch(error => {
      console.warn(`There was an error finding the player (id: ${id}):`, error);
    });
  });

  return (
    <>{country && country}</>
  )
}

export default CoBLookup;
