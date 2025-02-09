import { FC, useEffect, useRef, useState } from "react";
import { gamePositions, PlayerData, PlayerImage } from "../../models/player";
import { createPlayerFigures, handleRun } from "../../helpers/playerHelpers";

import "./Player.scss";

interface PlayerProps {
  position: number;
  skin: string;
}

const Player: FC<PlayerProps> = ({ position, skin }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  const playerImages: PlayerImage = {
    runFrame1: `/players/${skin}/runFrame1.png`,
    runFrame2: `/players/${skin}/runFrame2.png`,
    loseFrame: `/players/${skin}/loseFrame.png`,
  };

  useEffect(() => {
    const initializePlayerFigures = async () => {
      if (playerImages) {
        const figures = await createPlayerFigures(playerImages);
        setPlayerData({ playerSettings: playerImages, ...figures });
      }
    };

    initializePlayerFigures();
  }, []);

  useEffect(() => {
    if (playerData && imageRef) {
      const runAnimation = setInterval(() => {
        handleRun(imageRef, playerData);
      }, 200);

      return () => clearInterval(runAnimation);
    }
  }, [playerData]);

  //   const setPlayerLose = () => {
  //     if (playerData) {
  //       playerRef.current?.querySelector('[data-js="player-image"]')?.remove();
  //       playerRef.current?.appendChild(playerData.playerLoseFrame);
  //     }
  //   };

  return (
    <div
      style={{ left: `${gamePositions[position].left}px` }}
      ref={playerRef}
      className="player"
    >
      <img ref={imageRef} src={playerData?.playerRunFrame1.src} alt="avatar" />
    </div>
  );
};

export default Player;
