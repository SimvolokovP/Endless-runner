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
  setObstacleRect: Dispatch<SetStateAction<DOMRect[] | null>>;
}

const horizontalPositions = [
  gamePositions[0].left,
  gamePositions[1].left,
  gamePositions[2].left,
];

const Obstacle: FC<ObstacleProps> = ({ isStart, setObstacleRect }) => {
  const [speed, setSpeed] = useState<number>(6);
  const [positions, setPositions] = useState<number[]>([-50, -50]);
  const obstacleRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [horizontalPositionsState, setHorizontalPositionsState] = useState<
    number[]
  >([horizontalPositions[0], horizontalPositions[1]]);
  const animationFrameRef = useRef(0);

  const updatePosition = () => {
    const newObstacleRects: DOMRect[] = [];

    obstacleRefs.forEach((ref, index) => {
      if (ref.current) {
        newObstacleRects.push(ref.current.getBoundingClientRect());
      }

      setPositions((prev) => {
        const newPosition = [...prev];
        newPosition[index] += speed;

        if (newPosition[index] >= window.innerHeight) {
          const randomX = Math.floor(Math.random() * 3);
          newPosition[index] = 0;

          setHorizontalPositionsState((prevPositions) => {
            const newPositions = [...prevPositions];
            newPositions[index] = horizontalPositions[randomX];
            return newPositions;
          });
        }
        return newPosition;
      });
    });

    setObstacleRect(newObstacleRects);

    animationFrameRef.current = requestAnimationFrame(updatePosition);
  };

  useEffect(() => {
    const setInitPosition = () => {
      setPositions([-50, -50]);
      setObstacleRect(null);
    };

    if (isStart) {
      setInitPosition();
      animationFrameRef.current = requestAnimationFrame(updatePosition);
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isStart, setObstacleRect]);

  return (
    <>
      {positions.map((position, index) => (
        <div
          key={index}
          ref={obstacleRefs[index]}
          className="obstacle"
          style={{
            bottom: `${position}px`,
            left: `${horizontalPositionsState[index]}px`,
          }}
        >
          <img src="./obstacle.png" alt="" />
        </div>
      ))}
    </>
  );
};

export default Obstacle;
