import { RefObject } from "react";
import { PlayerData, PlayerImage } from "../models/player";

export const createPlayerFigures = async (player: PlayerImage) => {
  const playerRunFrame1 = new Image();
  playerRunFrame1.src = player.runFrame1;

  const playerRunFrame2 = new Image();
  playerRunFrame2.src = player.runFrame2;

  const playerLoseFrame = new Image();
  playerLoseFrame.src = player.loseFrame;

  return { playerRunFrame1, playerRunFrame2, playerLoseFrame };
};

export const handleRun = (
  imageRef: RefObject<HTMLImageElement | null>,
  playerData: PlayerData
) => {
  if (imageRef.current && playerData) {
    const playerFigure = imageRef.current as HTMLImageElement;
    if (playerFigure.src.includes(playerData.playerSettings.loseFrame)) return;

    playerFigure.src = playerFigure.src.includes(
      playerData.playerSettings.runFrame1
    )
      ? playerData.playerRunFrame2.src
      : playerData.playerRunFrame1.src;
  }
};
