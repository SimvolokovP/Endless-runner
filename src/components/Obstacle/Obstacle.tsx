import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import "./Obstacle.scss";
import { gamePositions } from "../../models/player";

interface ObstacleProps {
  isStart: boolean;
  setObstacleRect: Dispatch<SetStateAction<DOMRect | null>>;
}

const horizontalPositions = [
  gamePositions[0].left,
  gamePositions[1].left,
  gamePositions[2].left,
];

const Obstacle: FC<ObstacleProps> = ({ isStart, setObstacleRect }) => {
  const speed = 10;
  const [position, setPosition] = useState(-50);
  const obstacleRef = useRef<HTMLDivElement>(null);
  const [horizontalPosition, setHorizontalPosition] = useState<number>(
    horizontalPositions[0]
  );
  const animationFrameRef = useRef(0);

  const updatePosition = () => {
    if (obstacleRef.current) {
      setObstacleRect(obstacleRef.current.getBoundingClientRect());
    }

    setPosition((prev) => {
      const newPosition = prev + speed;

      if (newPosition >= window.innerHeight) {
        const randomX = Math.floor(Math.random() * 3);
        setHorizontalPosition(horizontalPositions[randomX]);
        return 0;
      } else {
        return newPosition;
      }
    });

    animationFrameRef.current = requestAnimationFrame(updatePosition);
  };

  useEffect(() => {
    const setInitPosition = () => {
      setPosition(-50);
      setObstacleRect(null);
    };

    if (isStart) {
      setInitPosition();
      animationFrameRef.current = requestAnimationFrame(updatePosition);
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isStart, speed, setObstacleRect]);

  return (
    <div
      ref={obstacleRef}
      className="obstacle"
      style={{ bottom: `${position}px`, left: `${horizontalPosition}px` }}
    />
  );
};

export default Obstacle;
