function getYearsOld(date, seasonYear) {
  const seasonEnd = new Date(`${seasonYear}-12-01T00:00:00`);
  const dateDiff = seasonEnd - (new Date(date).getTime());
  const age = new Date(dateDiff);
  return Math.abs(age.getUTCFullYear() - 1970);
}

export {
  getYearsOld
} 
