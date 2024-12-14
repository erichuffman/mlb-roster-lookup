const baseUrl =  `https://statsapi.mlb.com/api/`; 
const apiV = `v1/`;

function fetchRoster(start, teamID) {
  return window
    .fetch(`${baseUrl}${apiV}teams/${teamID}/roster?season=${start}`)
    .then(async response => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(response);
      }
    });
}

function fetchTeams(season) {
  return window
    .fetch(`${baseUrl}${apiV}teams?sportId=1&season=${season}`)
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
    .fetch(`${baseUrl}${apiV}people/${id}`)
    .then(async response => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(response);
      }
    })
}

export {
  fetchPlayer,
  fetchRoster,
  fetchTeams,
}
