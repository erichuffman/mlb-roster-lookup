import { teamHistory } from "./teamHistory";

function getYearsOld(date, seasonYear) {
  const seasonEnd = new Date(`${seasonYear}-12-01T00:00:00`);
  const dateDiff = seasonEnd - (new Date(date).getTime());
  const age = new Date(dateDiff);
  return Math.abs(age.getUTCFullYear() - 1970);
}

function teamNameLookup(teamNameDetails, teamID, season) {
  console.log('season in lookup', season);
  teamNameDetails.franchiseHistory = null;
  teamNameDetails.legacyName = null;
  teamNameDetails.legacyLocation = null;
  teamHistory.forEach(team => {
    if (team.id === teamID && team.names) {
      teamNameDetails.franchiseHistory = team.names;
      team.names.forEach(name => {
        if (season >= name.start && season <= name.end) {
          console.log('found a match', name.name, name.location);
          name.name !== team.current_name ?
            teamNameDetails.legacyName = name.name :
            teamNameDetails.legacyName = null;
          name.location !== team.current_location ? 
            teamNameDetails.legacyLocation = name.location : 
            teamNameDetails.legacyLocation = null;
        }
      })
    }
  });
  return teamNameDetails;
}

export {
  getYearsOld,
  teamNameLookup,
} 
