import * as React from 'react';
import { fetchPlayer } from '../utils/mlbEndPoint';

function Player({info, positionFilter, batsFilter, throwsFilter}) {
  const [player, setPlayer] = React.useState(() => ({}));
  const positionClasses = positionFilter === info.position ? 'roster__column roster__column--position active': 'roster__column roster__column--position';
  const batsClasses = batsFilter === info.bats ? 'roster__column roster__column--bats active': 'roster__column roster__column--bats';
  const throwsClasses = throwsFilter === info.throws ? 'roster__column roster__column--throws active': 'roster__column roster__column--throws';

  React.useEffect(() => {
    fetchPlayer(info.id).then(
      data => {
        if (data.player_info.queryResults.totalSize !== '0') {
          const playerInfo = data.player_info.queryResults.row;
          const birthDate = new Date(playerInfo.birth_date);
          console.log(playerInfo);
          setPlayer({
            id: playerInfo.player_id,
            yob: birthDate.getFullYear(),
            cob: playerInfo.birth_country,
          })
        }
      },
    )
    .catch(error => {
      console.warn('There was an retrieving player data:', error);
    });
    return function cleanup() {
      setPlayer({});
    }
  }, [info]);

  return (
    <>
      <div className="roster__column roster__column--name">
        {info.name}
      </div>
      <div className={positionClasses}>
        {info.position}
      </div>
      <div className={batsClasses}>
        {info.bats}
      </div>
      <div className={throwsClasses}>
        {info.throws}
      </div>
      <div className="roster__column roster__column--country">
        {player.cob}
      </div>
      <div className="roster__column roster__column--yob">
        {player.yob}
      </div>
    </>
  )
}

export default Player;
