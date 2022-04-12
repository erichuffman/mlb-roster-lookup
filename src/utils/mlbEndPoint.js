function fetchRoster(start, end, teamID) {
  return window
    .fetch(`https://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season='${start}'&end_season='${end}'&team_id='${teamID}'`)
    .then(async response => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(response);
      }
    })
}

function fetchTeams(season) {
  return window
    .fetch(`https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='${season}'`)
    .then(async response => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(response);
      }
    })
}

function fetchPlayer(id) {
  return window
    .fetch(`https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='${id}'`)
    .then(async response => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(response);
      }
    })
}

function fetchPlayerList(roster) {
  const playerDetails = [];
  roster.map((item, index) => (
    fetchPlayer(item.id).then(
      data => {
        if (data.player_info.queryResults.totalSize !== 0) {
          playerDetails[index] = data.player_info.queryResults.row;
        }
      },
    )
    .catch(error => {
      console.warn(`There was an error finding the player (id: ${item.id}):`, error);
    })
  ));
  return playerDetails;
}


export {
  fetchPlayer,
  fetchPlayerList,
  fetchRoster,
  fetchTeams,
}
