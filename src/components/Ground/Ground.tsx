import { FC, useEffect, useState, useRef } from "react";
import "./Ground.scss";

interface GroundProps {
  speed: number;
  isStart: boolean;
}

const Ground: FC<GroundProps> = ({ speed, isStart }) => {
  const groundHeight = 645;
  const initialGrounds = [0, groundHeight];
  const [grounds, setGrounds] = useState(initialGrounds);
  const animationFrameRef = useRef(0);

  const updateGrounds = () => {
    setGrounds((prevGrounds) => {
      return prevGrounds.map((ground) => {
        let newPosition = ground + speed * 10;
        if (newPosition >= groundHeight) {
          newPosition = -groundHeight;
        }
        return newPosition;
      });
    });

    animationFrameRef.current = requestAnimationFrame(updateGrounds);
  };

  useEffect(() => {
    if (isStart) {
      animationFrameRef.current = requestAnimationFrame(updateGrounds);
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isStart, speed]);

  return (
    <>
      {grounds.map((position, index) => (
        <div
          className="ground"
          key={index}
          style={{
            bottom: `${position}px`,
          }}
        />
      ))}
    </>
  );
};

export default Ground;
