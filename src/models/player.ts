export interface PlayerImage {
  runFrame1: string;
  runFrame2: string;
  loseFrame: string;
}

export interface PlayerData {
  playerSettings: PlayerImage;
  playerRunFrame1: HTMLImageElement;
  playerRunFrame2: HTMLImageElement;
  playerLoseFrame: HTMLImageElement;
}

export const gamePositions = [{ left: 50 }, { left: 150 }, { left: 250 }];