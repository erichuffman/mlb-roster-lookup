function getYearsOld(date, seasonYear) {
  const seasonEnd = Date.parse(`${seasonYear}-12-1`);
  const dateDiff = seasonEnd - (new Date(date).getTime());
  const age = new Date(dateDiff); 
  return Math.abs(age.getUTCFullYear() - 1970);
}

export {
  getYearsOld
} 
