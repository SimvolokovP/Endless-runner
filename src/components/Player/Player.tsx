import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { gamePositions, PlayerData, PlayerImage } from "../../models/player";
import { createPlayerFigures, handleRun } from "../../helpers/playerHelpers";

import "./Player.scss";

interface PlayerProps {
  position: number;
  skin: string;
  isStart: boolean;
  setPlayerRect: Dispatch<SetStateAction<DOMRect | null>>;
}

const Player: FC<PlayerProps> = ({
  position,
  skin,
  isStart,
  setPlayerRect,
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  const playerImages: PlayerImage = {
    runFrame1: `https://${
      import.meta.env.VITE_SUPABASE_ID
    }.supabase.co/storage/v1/object/public/skins/${skin.toLowerCase()}/runFrame1.png`,
    runFrame2: `https://${
      import.meta.env.VITE_SUPABASE_ID
    }.supabase.co/storage/v1/object/public/skins/${skin.toLowerCase()}/runFrame2.png`,
  };

  useEffect(() => {
    const initializePlayerFigures = async () => {
      if (playerImages) {
        const figures = await createPlayerFigures(playerImages);
        setPlayerData({ playerSettings: playerImages, ...figures });
      }
    };

    initializePlayerFigures();
  }, [isStart]);

  useEffect(() => {
    if (playerRef.current) {
      setPlayerRect(playerRef.current?.getBoundingClientRect());
    }
  }, [position, isStart]);

  useEffect(() => {
    if (playerData && imageRef && isStart) {
      const runAnimation = setInterval(() => {
        handleRun(imageRef, playerData);
      }, 200);

      return () => clearInterval(runAnimation);
    }
  }, [playerData, isStart]);

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
