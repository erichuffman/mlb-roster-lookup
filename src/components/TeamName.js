import styled from 'styled-components/macro';
import { widths } from '../styles/Breakpoints';

const Strike = styled.span`
  color: var(--color-gray-mid);
  display: inline-block;
  text-decoration-line: line-through;
`

const HistoryWrapper = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: ${widths.md}) {
    display: flex;
  }

  p {
    margin: 0 0 0.5rem;
    padding-right: 0.5rem;

    @media (min-width: ${widths.md}) {
      margin: 0;
    }
  }
`

function HeadingText({current, legacy}) {
  if (legacy !== null) {
    return (
      <><Strike>{current}</Strike> {legacy}</>
    ) 
  }
  return (
    <>{current}</>
  )
}

function FranchiseText({history}) {
  const HistoryList = styled.ul`
    list-style: none;
    margin: 0 0 1rem;
    padding: 0;

    li + li {
      margin-top: 0.5rem;
    }
  `
  return(
    <HistoryList>
      {Array.from(history).reverse().map(item => 
        <li>{item.start}-{item.end} {item.location} {item.name}</li>
      )}
    </HistoryList>
  )
}

function TeamName({season, team}) {
  return (
    <>
      <h1>The {season} <HeadingText current={team.currentLocation} legacy={team.legacyLocation} /> <HeadingText current={team.currentName} legacy={team.legacyName} /></h1>
      {team.franchiseHistory && 
        <HistoryWrapper>
          <p><strong>Franchise History:</strong></p>
          <FranchiseText history={team.franchiseHistory} />
        </HistoryWrapper>
      }
    </>
  );
}

export default TeamName;
