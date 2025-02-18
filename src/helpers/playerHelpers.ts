import { RefObject } from "react";
import { PlayerData, PlayerImage } from "../models/player";

export const createPlayerFigures = async (player: PlayerImage) => {
  const playerRunFrame1 = new Image();
  playerRunFrame1.src = player.runFrame1;

  const playerRunFrame2 = new Image();
  playerRunFrame2.src = player.runFrame2;


  return { playerRunFrame1, playerRunFrame2 };
};

export const handleRun = (
  imageRef: RefObject<HTMLImageElement | null>,
  playerData: PlayerData
) => {
  if (imageRef.current && playerData) {
    const playerFigure = imageRef.current as HTMLImageElement;

    playerFigure.src = playerFigure.src.includes(
      playerData.playerSettings.runFrame1
    )
      ? playerData.playerRunFrame2.src
      : playerData.playerRunFrame1.src;
  }
};
