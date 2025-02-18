export interface PlayerImage {
  runFrame1: string;
  runFrame2: string;
  
}

export interface PlayerData {
  playerSettings: PlayerImage;
  playerRunFrame1: HTMLImageElement;
  playerRunFrame2: HTMLImageElement;

}

export const gamePositions = [{ left: 35 }, { left: 140 }, { left: 245 }];