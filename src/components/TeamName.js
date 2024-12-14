import styled from 'styled-components/macro';

const Strike = styled.span`
  color: var(--color-gray-mid);
  display: inline-block;
  text-decoration-line: line-through;
`

function StringReturn({current, legacy}) {
  if (legacy !== null) {
    return (
      <><Strike>{current}</Strike> {legacy}</>
    ) 
  }
  return (
    <>{current}</>
  )
}

function TeamName({season, team}) {
  return (
    <h1>The {season} <StringReturn current={team.currentLocation} legacy={team.legacyLocation} /> <StringReturn current={team.currentName} legacy={team.legacyName} /></h1>
  );
}

export default TeamName;
