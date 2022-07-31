function getYearsOld(date) {
  const dateDiff = Date.now() - (new Date(date).getTime());
  const age = new Date(dateDiff); 
  return Math.abs(age.getUTCFullYear() - 1970);
}

export {
  getYearsOld
} 
