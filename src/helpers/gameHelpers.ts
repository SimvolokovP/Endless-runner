let lastTime: number | null = null;

export function resetLastTime() {
  lastTime = null;
}

export function updateGame(
  time: number,
  playerRect: DOMRect | null,
  obstacleRects: DOMRect | null,
  currentPosition: number,
  checkCollision: () => boolean
) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame((t) =>
      updateGame(t, playerRect, obstacleRects, currentPosition, checkCollision)
    );
    return;
  }

  const delta = time - lastTime;

  if (checkCollision()) {
    // handleLose();
    console.log("lose");
  }

  lastTime = time;

  window.requestAnimationFrame((t) =>
    updateGame(t, playerRect, obstacleRects, currentPosition, checkCollision)
  );
}
