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

  useEffect(() => {
    if (isStart) {
      setInitPosition();
      const interval = setInterval(() => {
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
      }, 1000 / 30);

      return () => clearInterval(interval);
    }
  }, [speed, isStart]);

  const setInitPosition = () => {
    setPosition(-50);
    setObstacleRect(null);
  };

  return (
    <div
      ref={obstacleRef}
      className="obstacle"
      style={{ bottom: `${position}px`, left: `${horizontalPosition}px` }}
    />
  );
};

export default Obstacle;
